const getPageStart = ({ linkTags = '', loadableStyles = '' }) =>
  `<!doctype html>
    <html>
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width" initial-scale=1 />
        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        ${linkTags}
        ${loadableStyles}
        </head>
        <body>`;

const getAppStart = () => '<div id="root">';

const getAppEnd = () => '</div>';

const getPageEnd = ({ js, state, loadableStyles = '' }) => `
    ${js}
    ${loadableStyles}
    <script>
      window.__PRELOADED_STATE__ = ${state}
    </script>
    </body>
    </html>
`;

export const startDocument = ({
  loadableStyles,
  styles,
  helmet,
  linkTags,
}) => ({
  pageStart: getPageStart({ loadableStyles, styles, helmet, linkTags }),
  appStart: getAppStart(),
});

export const endDocument = ({ js, loadableStyles, state }) => ({
  appEnd: getAppEnd(),
  pageEnd: getPageEnd({ state, js, loadableStyles }),
});
