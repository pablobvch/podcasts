import "isomorphic-fetch";
import Error from "next/error";

import ChannelGrid from "../components/ChannelGrid";
import Layout from "../components/Layout";

const renderErrorMessage = (statusCode) => <Error statusCode={503} />;

const renderPage = (channels) => (
  <Layout title="Podcasts">
    <ChannelGrid channels={channels} />
  </Layout>
);

const shouldRenderPage = (statusCode) => statusCode === 200;

const Page = ({ channels, statusCode }) =>
  shouldRenderPage(statusCode)
    ? renderPage(channels)
    : renderErrorMessage(statusCode);

const getResponseWithError = () => ({
  channels: null,
  statusCode: 503,
});

const renameBodytoChannels = (body) => ({ channels: body, statusCode: 200 });

Page.getInitialProps = () =>
  fetch("https://api.audioboom.com/channels/recommended")
    .then((response) => response.json())
    .then((response) => renameBodytoChannels(response.body))
    .catch((e) => getResponseWithError());

export default Page;
