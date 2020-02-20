module.exports = {
    webpack: function(config) {
      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader',
      })
      return config
    },
    env: {
        SiteTitle: 'Sample Quiz App',
        MaxCount: 10
    },
    exportTrailingSlash: true,
    exportPathMap: function() {
      return {
        '/': { page: '/' }
      };
    }
}