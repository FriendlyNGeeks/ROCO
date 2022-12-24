module.exports = {
    // ...
    webpack: {
      alias: { /* ... */ },
      plugins: {
        add: [ /* ... */ ],
        remove: [ /* ... */ ],
      },
      configure: {
       /* ... */
       experiments: {
        topLevelAwait: true
       }
      },
    //   configure: (webpackConfig, { env, paths }) => {
    //     /* ... */
    //     return webpackConfig;
    //   },
    },
  };