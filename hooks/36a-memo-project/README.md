
deprecated eslint-loader@4.0.2: This loader has been deprecated. Please use eslint-webpack-plugin

deprecated sw-precache@5.2.1: Please migrate to Workbox: https://developers.google.com/web/tools/workbox/guides/migrations/migrate-from-sw

deprecated sw-toolbox@3.6.0: Please migrate to Workbox: https://developers.google.com/web/tools/workbox/guides/migrations/migrate-from-sw

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

