/* Certified Bad Example official destinations. */
window.CBE = {
  youtube: 'https://www.youtube.com/@CertifiedBadExamplePodcast',
  apple: 'https://podcasts.apple.com/us/podcast/certified-bad-example-podcast/id1891465123',
  spotify: 'https://open.spotify.com/show/1NpJSMO56lSqh73CsW2lV0',
  instagram: 'https://www.instagram.com/certifiedbadexample/',
  latestYouTubeVideoId: '', // Add the 11-character ID of the latest episode to embed it here.
  captivateDonation: 'https://certified-bad-example.captivate.fm/support',
  captivate: 'https://certified-bad-example.captivate.fm',
  submissionEmail: 'cbe_podcast@yahoo.com',
  episodes: Array.from({length:19},(_,i)=>({season:1,number:i+1,title:`Episode ${String(i+1).padStart(2,'0')}`,url:''}))
};
