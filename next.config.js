/* eslint-disable */
const withPlugins = require('next-compose-plugins');
const less = require('@zeit/next-less');
const bundleAnalyzer = require('@next/bundle-analyzer');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
);

//const withBundleAnalyzer = require('@next/bundle-analyzer')({
//  enabled: process.env.ANALYZE === 'true',
//});
//module.exports = withBundleAnalyzer({});

module.exports = withPlugins([
  [
    less,
    {
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables, // make your antd custom effective
      },
      webpack: (config, { isServer }) => {
        if (isServer) {
          const antStyles = /antd\/.*?\/style.*?/;
          const origExternals = [...config.externals];
          config.externals = [
            (context, request, callback) => {
              if (request.match(antStyles)) return callback();
              if (typeof origExternals[0] === 'function') {
                origExternals[0](context, request, callback);
              } else {
                callback();
              }
            },
            ...(typeof origExternals[0] === 'function' ? [] : origExternals),
          ];

          config.module.rules.unshift({
            test: antStyles,
            use: 'null-loader',
          });
        }
        return config;
      },
    },
  ],
  [bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' }), {}],
]);
