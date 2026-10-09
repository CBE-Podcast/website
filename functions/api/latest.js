const CHANNEL='https://www.youtube.com/@CertifiedBadExample_Podcast';
function seconds(iso){const m=String(iso||'').match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);return m?Number(m[1]||0)*3600+Number(m[2]||0)*60+Number(m[3]||0):0}
export async function onRequestGet({env}){
 const cache=await caches.default.match('https://cbe-v08.internal/latest-longform');
 try{
  if(!env.YOUTUBE_API_KEY)throw Error('Missing API key');
  let channelId=env.YOUTUBE_CHANNEL_ID;
  if(!channelId){const page=await fetch(CHANNEL,{headers:{'User-Agent':'Mozilla/5.0'}});if(!page.ok)throw Error('Channel unavailable');const html=await page.text();channelId=html.match(/"channelId":"(UC[\w-]{22})"/)?.[1]||html.match(/"externalId":"(UC[\w-]{22})"/)?.[1];}
  if(!/^UC[\w-]{22}$/.test(channelId||''))throw Error('Channel ID unavailable');
  const key=encodeURIComponent(env.YOUTUBE_API_KEY);
  const c=await fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${key}`);if(!c.ok)throw Error('Channel API unavailable');const upload=(await c.json()).items?.[0]?.contentDetails?.relatedPlaylists?.uploads;if(!upload)throw Error('Uploads playlist unavailable');
  const list=await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${upload}&maxResults=50&key=${key}`);if(!list.ok)throw Error('Playlist API unavailable');const ids=(await list.json()).items?.map(x=>x.contentDetails?.videoId).filter(Boolean)||[];if(!ids.length)throw Error('No uploads');
  const r=await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet,status,liveStreamingDetails&id=${ids.join(',')}&key=${key}`);if(!r.ok)throw Error('Video details unavailable');const vids=(await r.json()).items||[];
  const now=Date.now();const found=vids.filter(v=>v.status?.privacyStatus==='public'&&v.status?.embeddable!==false&&v.snippet?.liveBroadcastContent==='none'&&!v.liveStreamingDetails&&seconds(v.contentDetails?.duration)>=600&&Date.parse(v.snippet?.publishedAt||'')<=now).sort((a,b)=>Date.parse(b.snippet.publishedAt)-Date.parse(a.snippet.publishedAt))[0];if(!found)throw Error('No eligible published video');
  const result=Response.json({videoId:found.id,title:found.snippet.title},{headers:{'Cache-Control':'public,max-age=1800'}});
  await caches.default.put('https://cbe-v08.internal/latest-longform',result.clone());return result;
 }catch(e){if(cache)return new Response(cache.body,{headers:{'Content-Type':'application/json','Cache-Control':'public,max-age=300','X-CBE-Fallback':'cached'}});return Response.json({error:'No verified published long-form episode available'},{status:503,headers:{'Cache-Control':'public,max-age=180'}})}
}
