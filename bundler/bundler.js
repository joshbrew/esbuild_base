//Most basic JS esbuild settings
require('esbuild').build({
    entryPoints: ['src/app.js'],
    bundle: true,
    outfile: 'dist/app.js'
  }).catch(() => process.exit(1))


//ESBuild instructions:
//https://esbuild.github.io/getting-started/#your-first-bundle
//Natively builds react, ts, etc. with added specification.

/**
  For React builds:

  npm i react react-dom

  Create app.jsx in src/ and add:
```js
  import * as React from 'react'
  import * as Server from 'react-dom/server'

  let Greet = () => <h1>Hello, world!</h1>
  console.log(Server.renderToString(<Greet />))
```
 
  Then here do:
```js
  require('esbuild').build({
    entryPoints: ['src/app.jsx'],
    bundle: true,
    outfile: 'dist/app.js',
  }).catch(() => process.exit(1))
```

 */


/**
  For TypeScript builds:

  npm i typescript --save-dev

  Create a tsconfig.json with ts build settings. These overrule anything in esbuild fyi

  e.g.
  ```json
  {
    "compilerOptions": {
      "module": "commonjs",
      "noImplicitAny": true,
      "removeComments": true,
      "preserveConstEnums": true,
      "sourceMap": true
    },
    "include": ["src/** /*"], //remove the space after ** (that's for here in comments)
    "exclude": ["node_modules"]
  }
  ```

const { dependencies, peerDependencies } = require('./package.json');

```js
require('esbuild').build({
  entryPoints: ['src/index.ts'],
  outdir: 'dist',
  bundle: true,
  external: Object.keys(dependencies).concat(Object.keys(peerDependencies)),
});
```


 */