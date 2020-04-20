const About = () => (
  <div>
    <h1>About Me!</h1>

    <p>This is another page using NextJS and Style JSX</p>

    <img src="/pablo.jpg" alt="pablo's photo"></img>

    <style jsx>{`
      h1 {
        color: black;
      }

      :global(div p) {
        color: black;
      }

      img {
        display: block;
        margin: 0 auto;
        max-width: 50%;
      }
    `}</style>

    <style jsx global>
      {`
        body {
          background: gray;
        }
      `}
    </style>
  </div>
);

export default About;
