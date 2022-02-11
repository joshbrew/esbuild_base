## Minimal [esbuild](https://esbuild.github.io/getting-started/#your-first-bundle) and [node server test environment](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework).

To run: `npm build` to bundle, then `npm start` to run the node server.

OR `npm test` to run both commands in sequence

You can specify https and add an ssl certificate if you follow the instructions.

Exactly 1 dependency: esbuild



### PWA build:

To test:

`npm run pwa` 

This installs workbox-cli, generates the service worker, and then starts the application. Run once if you don't need to modify the service-worker further.