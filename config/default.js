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
  },
  baseURI: '//localhost:9000/api',
  proxy: {
    target: 'https://api.soundcloud.com',
    headers: [
      {name: 'host', value: 'api.soundcloud.com'}
    ]
  },
  soundCloud: {
    clientID: '1862b9bf02ed7c80d0f545f835ad8773'
  },
  reduxLogger: false
}
