## Minimal [esbuild](https://esbuild.github.io/getting-started/#your-first-bundle) and [node server test environment](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework).

To run: `npm run build` to bundle, then `npm start` to run the node server.

OR `npm test` to run both commands in sequence

You can specify https and add an ssl certificate if you follow the instructions.

1 dependency: `esbuild`

### Backend dev server hot reloading (when editing)

`npm run dev` or `npm i --save-dev nodemon && nodemon node_server/server.js`

then `npm run startdev` to use nodemon 

And in `package.json` change the `node node_server/server.js` to `nodemon node_server/server.js`

The nodemon dev server also adds basic hot reloading via websocket and clientside code injection (see [nodeserver/server.js](nodeserver/server.js) for method).

2 dev dependencies: `nodemon` and `ws`

### PWA build:

To test:

`npm run pwa` 

This installs workbox-cli, generates the service worker, bundles and then starts the application. Run once if you don't need to modify the service-worker further.

1 additional dependency: `workbox-cli`

### Other notes:

See README.md files in each folder for more explanation on how to work with these types of applications.
