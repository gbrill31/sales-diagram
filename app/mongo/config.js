const dbName = 'sales';

module.exports = {
  development: {
    url: `mongodb://127.0.0.1/${dbName}`,
  },

  production: {
    //  'url' : 'mongodb://admin:admin@ds141950.mlab.com:41950/' + dbName // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
    url: '', // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
  },

  options: {
    keepAlive: 300000,
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },

  // pubsubChannel: 'pubsub',
  // pubsubCollectionSize: 30000000
};
