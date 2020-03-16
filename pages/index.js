import "isomorphic-fetch";

const renderChannel = channel => (
  <a className="channel" key={channel.id}>
    <h2>{channel.title}</h2>
  </a>
);

const renderChannels = ({ channels }) => (
  <div className="channels">
    {channels.map(channel => renderChannel(channel))}
  </div>
);

const Page = props => (
  <div>
    <header>Podcasts</header>
    {renderChannels(props)}
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
      h2 {
        padding: 5px;
        font-size: 0.9em;
        font-weight: 600;
        margin: 0;
        text-align: center;
      }
    `}</style>

    <style jsx global>
      {`
        body {
          background: white;
          font-family: system-ui;
          margin: 0;
        }
      `}
    </style>
  </div>
);

const renameBodytoChannels = body => ({ channels: body });

Page.getInitialProps = () =>
  fetch("https://api.audioboom.com/channels/recommended")
    .then(response => response.json())
    .then(response => renameBodytoChannels(response.body));

export default Page;
