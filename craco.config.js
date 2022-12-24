module.exports = {
    // ...
    webpack: {
      alias: { /* ... */ },
      plugins: {
        add: [ /* ... */ ],
        remove: [ /* ... */ ],
      },
      output: {    
        publicPath: "..",
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