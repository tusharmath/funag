module.exports = {
  env: 'production',
  port: 8081,
  sw: {
    debug: false,
    preCache: true,
    appCache: {
      policy: 'fastest'
    },
    externalCache: {
      policy: 'fastest'
    }
  },
  express: {
    useGzipped: true
  },
  webpack: {
    devtool: false,
    middleware: false,
    optimizeJS: true,
    compression: true
  },
  baseURI: 'https://api.soundcloud.com',
  proxy: false
}
