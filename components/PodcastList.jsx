import Link from "next/link";

const renderMinutes = (duration) => Math.ceil(duration / 60);

const renderDurationContainer = ({ duration }) => (
  <div className="meta">
    {renderMinutes(duration)} minutes
    <style jsx>{`
      .meta {
        color: #666;
        margin-top: 0.5em;
        font-size: 0.8em;
      }
    `}</style>
  </div>
);

const renderTitle = ({ title }) => (
  <div>
    <h3>{title}</h3>
    <style jsx>{`
      h3 {
        margin: 0;
      }
    `}</style>
  </div>
);

const renderA = (podcast) => (
  <a className="podcast">
    {renderTitle(podcast)}
    {renderDurationContainer(podcast)}
    <style jsx>{`
      .podcast {
        display: block;
        text-decoration: none;
        color: #333;
        padding: 15px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        cursor: pointer;
      }
      .podcast:hover {
        color: #000;
      }
    `}</style>
  </a>
);

const renderPodcast = (podcast) => (
  <Link href={`/podcast?id=${podcast.id}`} prefetch key={podcast.id}>
    {renderA(podcast)}
  </Link>
);

const renderPodcast = (podcasts) =>
  podcasts.map((podcast) => {
    renderPodcast(podcast);
  });

const PodcastList = ({ podcasts }) => <div>{renderPodcasts(podcasts)}</div>;

export default PodcastList;
