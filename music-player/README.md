
Uncaught ReferenceError: regeneratorRuntime is not defined

# Async/await problem

[Babel](https://babeljs.io/docs/en/babel-plugin-transform-runtime/)

```
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
```

`.babelrc`

Changed 

```
{
  "presets": ["@babel/env", "@babel/react", "@babel/typescript"],
  "plugins": [
    "@babel/proposal-object-rest-spread",
    "@babel/proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import"
  ]
}
```

to

```
{
  "presets": ["@babel/env", "@babel/react"],
  "plugins": [
    "@babel/proposal-object-rest-spread",
    "@babel/proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```


## Responsive meta tag

```
<meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
/>
```

## Symbolic Link

This works.

```
ln -s file link

cd /Users/jv/Desktop/MyDevelopment/github/repo-react/music-player/src/music
ln -s /Users/jv/tmp/jv.mp3 music.mp3
```

## Use Serve

```
npm init
npm i serve --save

 "serve": "serve -l 9002 Yoga",

npm run serve
```

Access-Control-Allow-Origin: *

self.send_header('Access-Control-Allow-Origin', '*')

https://github.com/zeit/serve-handler#options

{
  "headers": [
    {
      "source": "**/*.@(jpg|jpeg|gif|png)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "max-age=7200"
        }
      ]
    },
    {
      "source": "404.html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "max-age=300"
        }
      ]
    }
  ]
}

## Memory

node --max-old-space-size=1024 index.js #increase to 1gb
node --max-old-space-size=2048 index.js #increase to 2gb
node --max-old-space-size=3072 index.js #increase to 3gb
node --max-old-space-size=4096 index.js #increase to 4gb
node --max-old-space-size=5120 index.js #increase to 5gb
node --max-old-space-size=6144 index.js #increase to 6gb
node --max-old-space-size=7168 index.js #increase to 7gb
node --max-old-space-size=8192 index.js #increase to 8gb

NODE_OPTIONS="--max-old-space-size=4096"

launch.json

{
"version": "0.2.0",
"configurations": [{
        "type": "node",
        "request": "launch",
        "name": "Launch Program",
        "program": "${workspaceRoot}\\server.js"
    },
    {
        "type": "node",
        "request": "launch",
        "name": "Launch Training Script",
        "program": "${workspaceRoot}\\training-script.js",
        "runtimeArgs": [
            "--max-old-space-size=4096"
        ]
    }
]}


## React players

https://dev.to/ma5ly/lets-make-a-little-audio-player-in-react-p4p

react-sound
https://github.com/leoasis/react-sound
https://codesandbox.io/s/4jn966p950

https://www.fullstackreact.com/react-daily-ui/009-music-player/

https://github.com/lijinke666/react-music-player

See react-electron/music-players

players:

https://reactjsexample.com/maybe-the-best-beautiful-html5-responsive-player-component-for-react/


