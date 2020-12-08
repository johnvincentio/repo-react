`webpack-dev-server` causes

```
npm WARN deprecated chokidar@2.1.8: Chokidar 2 will break on node v14+. Upgrade to chokidar 3 with 15x less dependencies.
npm WARN deprecated fsevents@1.2.13: fsevents 1 will break on node v14+ and could be using insecure binaries. Upgrade to fsevents 2.
npm WARN deprecated resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
npm WARN deprecated urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
```

fails

```
npm i webpack@4.44.2 webpack-cli@3.3.12 --save-dev
npm i webpack@4.44.2 webpack-cli webpack-dev-server --save-dev
```

did not use

```
"devDependencies": {
	"acorn": "^8.0.4",
	"enzyme-adapter-react-16": "^1.15.5",
	"react-test-renderer": "^16.14.0",
}

```

npm info "eslint-config-airbnb@latest" peerDependencies

```

```

npm info "react-dom@latest" peerDependencies

```

```

npm info "eslint-config-airbnb@latest" devDependencies

npm info "eslint-config-airbnb@latest" dependencies

npm info "eslint-config-airbnb@latest" peerDependencies

```

```

{
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
"source.fixAll.eslint": true
}
}

    "editor.tabSize": 2,
    "editor.insertSpaces": false,

```




```
