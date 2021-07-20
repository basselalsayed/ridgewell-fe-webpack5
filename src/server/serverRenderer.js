import { renderToNodeStream, renderToString } from 'react-dom/server';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import { ChunkExtractor } from '@loadable/server';

import { Provider } from 'react-redux';

import { StaticRouter } from 'react-router-dom';

import path from 'path';
import paths from '../../webpack/paths';
import { startDocument, endDocument } from './document';
import getRoutes from '../Routes';

export default async (req, res) => {
  const {
    locals: {
      history: { location },
      store,
    },
  } = res;

  const routes = getRoutes(store);

  loadOnServer({ store, location, routes })
    .then(() => {
      const context = {};

      const app = (
        <Provider store={store} key="provider">
          <StaticRouter location={location} context={context}>
            <ReduxAsyncConnect routes={routes} />
          </StaticRouter>
        </Provider>
      );

      // handle redirects
      if (context.url) {
        res.writeHead(301, {
          Location: context.url,
        });
        res.end();
      }

      const clientStatsFile = path.join(
        paths.buildClient,
        paths.public,
        'client-stats.json'
      );

      const extractor = new ChunkExtractor({
        entrypoints: ['bundle'],
        statsFile: clientStatsFile,
      });

      const jsx = extractor.collectChunks(app);

      const html = renderToString(jsx);

      const scriptTags = extractor.getScriptTags({ crossOrigin: '' }); // or extractor.getScriptElements();

      // You can also collect your "preload/prefetch" links
      // And you can even collect your style tags (if you use "mini-css-extract-plugin")
      const linkTags = extractor.getLinkTags({ crossOrigin: '' });

      const loadableStyles = extractor.getStyleTags({ crossOrigin: '' }); // or extractor.getStyleElements();

      const { pageStart, appStart } = startDocument({
        linkTags,
        loadableStyles,
      });

      if (__NO_STREAM__) {
        // alternative to streaming. with code splitting
        const reduxState = JSON.stringify(store.getState());
        const { appEnd, pageEnd } = endDocument({
          js: scriptTags,
          state: reduxState,
          // loadableStyles,
        });
        const htmlResponse = `${pageStart}${appStart}${html}${appEnd}${pageEnd}`;

        res.set('Content-Type', 'text/html').end(htmlResponse);
        // res.send(`${pageStart}${appStart}${html}${appEnd}${pageEnd}`);
      } else {
        // stream
        res.setHeader('Content-Type', 'text/html');
        res.contentType('text/html');
        res.write(`${pageStart}${appStart}`);

        const stream = renderToNodeStream(jsx);

        stream.pipe(res, { end: false });
        const reduxState = JSON.stringify(store.getState());

        const { appEnd, pageEnd } = endDocument({
          js: scriptTags,
          state: reduxState,
          // loadableStyles,
        });

        // finalize the response with closing HTML
        stream.on('end', () => res.end(`${appEnd}${pageEnd}`));
      }
    })
    .catch((error) => {
      console.info('server.js error: ');
      console.error(error);
      console.trace(error);
      res.json(error);
    });
};
