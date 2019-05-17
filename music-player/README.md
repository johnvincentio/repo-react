
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