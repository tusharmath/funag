module.exports = {
  env: 'production',
  port: 8081,
  sw: {
    debug: false
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
  proxy: false,
  reduxLogger: false
}
