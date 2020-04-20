import "isomorphic-fetch";
import ChannelView from "../components/ChannelView";

const Channel = ({ channel, audioClips, childChannels, statusCode }) => (
  <ChannelView
    channel={channel}
    audioClips={audioClips}
    childChannels={childChannels}
    statusCode={statusCode}
  />
);

const renameBodytoChildChannels = (body) => body.channels;

const renameBodytoAudioClips = (body) => body.audio_clips;

const renameBodytoChannel = (body) => body.channel;

Channel.getInitialProps = async ({ query, res }) => {
  let idChannel = query.id;

  try {
    let [reqChannel, reqChildChannels, reqAudioClips] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${idChannel}`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
    ]);

    if (reqChannel.status >= 400) {
      res.statusCode = reqChannel.status;
      return {
        channel: null,
        audioClips: null,
        childChannels: null,
        statusCode: reqChannel.status
      };
    }

    let dataChannel = await reqChannel.json();
    let channel = dataChannel.body.channel;

    let dataAudioClips = await reqAudioClips.json();
    let audioClips = dataAudioClips.body.audio_clips;

    let dataChildChannels = await reqChildChannels.json();
    let childChannels = dataChildChannels.body.channels;

    return { channel, audioClips, childChannels, statusCode: 200 };
  } catch (e) {
    return {
      channel: null,
      audioClips: null,
      childChannels: null,
      statusCode: 503
    };
  }
};

export default Channel;
