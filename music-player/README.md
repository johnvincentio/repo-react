
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

