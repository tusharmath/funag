module.exports = {
  env: 'development',
  port: 9000,
  sw: {
    debug: false,
    preCache: false,
    appCache: {
      policy: 'networkOnly'
    },
    externalCache: {
      policy: 'fastest'
    }
  },
  express: {
    useGzipped: false
  },
  webpack: {
    devtool: '#inline-source-map',
    middleware: true,
    optimizeJS: false,
    compression: false
  }
}
