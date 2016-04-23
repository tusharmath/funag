module.exports = {
  env: 'development',
  port: 9000,
  sw: {
    preCache: false,
    appCache: false,
    externalCache: {
      policy: 'cacheFirst'
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
