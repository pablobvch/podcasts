import Link from "next/link";
import Error from "../pages/_Error";
import Layout from "./Layout";

const renderErrorMessage = (statusCode) => <Error statusCode={statusCode} />;

const renderChannelView = (channel, audioClips, childChannels) => (
  <Layout title={channel.title}>
    <h1>{channel.title}</h1>
    <h2>Child Channels</h2>
    {childChannels.map((childChannel) => (
      <Link href={`/channel?id=${childChannel.id}`}>
        <a className="channel">
          <img src={childChannel.urls.logo_image.original} alt="" />
          <h2>{childChannel.title}</h2>
        </a>
      </Link>
    ))}
    <h2>Audio Clips</h2>
    {audioClips.map((audioClip) => (
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
  </Layout>
);

const shouldRenderPage = (statusCode) => statusCode == 200;

const ChannelView = ({ channel, audioClips, childChannels, statusCode }) =>
  shouldRenderPage(statusCode)
    ? renderChannelView(channel, audioClips, childChannels)
    : renderErrorMessage(statusCode);

export default ChannelView;
