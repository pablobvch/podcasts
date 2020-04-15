import React from "react";
import { Link } from "../routes";

import Layout from "../components/Layout";

const renderTryAgainMessage = () => (
  <div>
    <div className="message">
      <h1>It w as a problem :(</h1>
      <p>Try againt in a few seconds</p>
    </div>
    <style jsx>{`
      .message {
        padding: 100px 30px;
        text-align: center;
      }
      h1 {
        margin-bottom: 2em;
      }
      a {
        color: #8756ca;
      }
    `}</style>
  </div>
);

const renderPageNotFoundMessage = () => (
  <div>
    <div className="message">
      <h1>Page not found :(</h1>
      <p>
        <Link route="home">
          <a>back to home</a>
        </Link>
      </p>
    </div>
    <style jsx>{`
      .message {
        padding: 100px 30px;
        text-align: center;
      }
      h1 {
        margin-bottom: 2em;
      }
      a {
        color: #8756ca;
      }
    `}</style>
  </div>
);

const shouldRenderPageNotFound = (statusCode) => statusCode === 404;

const Error = ({ statusCode }) => (
  <Layout title="Oh no :(">
    {shouldRenderPageNotFound(statusCode)
      ? renderPageNotFoundMessage()
      : renderTryAgainMessage()}
  </Layout>
);

/*<Layout title="Oh no :(">
    {statusCode === 404 ? (
      <div className="message">
        <h1>Page not found :(</h1>
        <p>
          <Link route="home">
            <a>back to home</a>
          </Link>
        </p>
      </div>
    ) : (
      <div className="message">
        <h1>It w as a problem :(</h1>
        <p>Try againt in a few seconds</p>
      </div>
    )}
    
  </Layout> */

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

export default Error;
