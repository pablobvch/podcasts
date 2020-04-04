import "isomorphic-fetch";

const Channel = ({ channel, audioClips, childChannels }) => (
  <div>
    <header>Podcasts</header>
    <h1>{channel.title}</h1>
    <h2>Child Channels</h2>
    {childChannels.map(childChannel => (
      <div key={`childChannel${childChannel.id}`}>{childChannel.title}</div>
    ))}
    <h2>Audio Clips</h2>
    {audioClips.map(audioClip => (
      <div key={audioClip.id}>{audioClip.title}</div>
    ))}
    <style jsx>{`
      header {
        color: #fff;
        background: #8756ca;
        padding: 15px;
        text-align: center;
      }
      .channels {
        display: grid;
        grid-gap: 15px;
        padding: 15px;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      }
      a.channel {
        display: block;
        margin-bottom: 0.5em;
        color: #333;
        text-decoration: none;
      }
      .channel img {
        border-radius: 3px;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
        width: 100%;
      }
      h1 {
        font-weight: 600;
        padding: 15px;
      }
      h2 {
        padding: 5px;
        font-size: 0.9em;
        font-weight: 600;
        margin: 0;
        text-align: center;
      }
    `}</style>

    <style jsx global>{`
      body {
        margin: 0;
        font-family: system-ui;
        background: white;
      }
    `}</style>
  </div>
);

/*Channel.getInitialProps = async ({ query }) => {
  let reqChannel = await fetch(
    `https://api.audioboom.com/channels/${query.id}`
  );
  let dataChannel = await reqChannel.json();
  let channel = dataChannel.body.channel;

  let reqAudio = await fetch(
    `https://api.audioboom.com/channels/${query.id}/audio_clips`
  );
  let dataAudio = await reqAudio.json();
  let audio_clips = dataAudio.body.audio_clips;

  return { channel, audio_clips };
};*/

const renameBodytoChildChannels = body => body.channels;

const renameBodytoAudioClips = body => body.audio_clips;

const renameBodytoChannel = body => body.channel;

Channel.getInitialProps = ({ query }) =>
  Promise.all([
    fetch(`https://api.audioboom.com/channels/${query.id}`)
      .then(response => response.json())
      .then(response => renameBodytoChannel(response.body)),
    fetch(`https://api.audioboom.com/channels/${query.id}/audio_clips`)
      .then(response => response.json())
      .then(response => renameBodytoAudioClips(response.body)),
    fetch(`https://api.audioboom.com/channels/${query.id}/child_channels`)
      .then(response => response.json())
      .then(response => renameBodytoChildChannels(response.body))
  ]).then(([channel, audioClips, childChannels]) => ({
    channel,
    audioClips,
    childChannels
  }));

export default Channel;
