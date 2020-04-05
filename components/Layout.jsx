import Link from "next/link";
import Head from "next/head";

const renderA = (title) => (
  <a>
    {title}
    <style jsx>{`
      a {
        color: #fff;
        text-decoration: none;
      }
    `}</style>
  </a>
);

const renderHeaderContent = (title) => <Link href="/">{renderA(title)}</Link>;

const renderHeader = (title) => (
  <header>
    {renderHeaderContent(title)}{" "}
    <style jsx>{`
      header {
        color: #fff;
        background: #8756ca;
        padding: 15px;
        text-align: center;
      }
    `}</style>
  </header>
);

const renderHead = (title) => (
  <Head>
    <title>{title}</title>
    <meta name="viewport" content="width=device-width" />
  </Head>
);

const Layout = ({ children, title }) => (
  <div>
    {renderHead(title)}
    {renderHeader(title)}
    {children}
    <style jsx global>{`
      body {
        margin: 0;
        font-family: system-ui;
        background: white;
      }
    `}</style>
  </div>
);

export default Layout;
