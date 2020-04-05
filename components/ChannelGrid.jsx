import Link from "next/link";

const renderH2 = (channel) => (
  <h2>
    {channel.title}
    <style jsx>{`
      h2 {
        padding: 5px;
        font-size: 0.9em;
        font-weight: 600;
        margin: 0;
        text-align: center;
      }
    `}</style>
  </h2>
);

const renderImg = (channel) => (
  <div>
    <img src={channel.urls.logo_image.original} alt=""></img>
    <style jsx>{`
      img {
        border-radius: 3px;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
        width: 100%;
      }
    `}</style>
  </div>
);

const renderA = (channel) => (
  <a className="channel">
    {renderImg(channel)}
    {renderH2(channel)}
    <style jsx>{`
      .channel {
        display: block;
        margin-bottom: 0.5em;
        color: #333;
        text-decoration: none;
      }
    `}</style>
  </a>
);

const renderLink = (channel) => (
  <Link href={`/channel?id=${channel.id}`} key={channel.id}>
    {renderA(channel)}
  </Link>
);

const renderChannels = (channels) =>
  channels.map((channel) => renderLink(channel));

const ChannelGrid = ({ channels }) => (
  <div className="channels">
    {renderChannels(channels)}
    <style jsx>{`
      .channels {
        display: grid;
        grid-gap: 15px;
        padding: 15px;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      }
    `}</style>
  </div>
);

export default ChannelGrid;
