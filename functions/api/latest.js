const CHANNEL='https://www.youtube.com/@CertifiedBadExample_Podcast';
function durationSeconds(iso){const m=iso?.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);return m?Number(m[1]||0)*3600+Number(m[2]||0)*60+Number(m[3]||0):0}
export async function onRequestGet({env}){try{
 const page=await fetch(CHANNEL,{headers:{'User-Agent':'Mozilla/5.0'}});if(!page.ok)throw Error('Channel unavailable');const html=await page.text();const id=html.match(/"channelId":"(UC[\w-]{22})"/)?.[1]||html.match(/channel_id=(UC[\w-]{22})/)?.[1]||html.match(/"externalId":"(UC[\w-]{22})"/)?.[1];if(!id)throw Error('Channel ID unavailable');
 if(!env.YOUTUBE_API_KEY)throw Error('YouTube API key needed to distinguish long-form from Shorts');
 const list=await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${id}&type=video&order=date&maxResults=25&key=${encodeURIComponent(env.YOUTUBE_API_KEY)}`);if(!list.ok)throw Error('YouTube search unavailable');const results=await list.json();const ids=(results.items||[]).map(x=>x.id?.videoId).filter(Boolean);if(!ids.length)throw Error('No videos');
 const details=await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${ids.join(',')}&key=${encodeURIComponent(env.YOUTUBE_API_KEY)}`);if(!details.ok)throw Error('Video details unavailable');const data=await details.json();const byId=new Map((data.items||[]).map(x=>[x.id,x]));
 const item=ids.map(x=>byId.get(x)).find(x=>x&&durationSeconds(x.contentDetails?.duration)>=600&&x.snippet?.liveBroadcastContent!=='live');if(!item)throw Error('No recent long-form video');
 return Response.json({videoId:item.id,title:item.snippet.title},{headers:{'Cache-Control':'public,max-age=1800'}})
 }catch(e){return Response.json({error:'Long-form video unavailable',detail:e.message},{status:503,headers:{'Cache-Control':'public,max-age=180'}})}}
