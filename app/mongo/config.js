module.exports = {
  url: `mongodb+srv://Guy:${process.env.MONGO_PASS}@cluster0.jxfgv.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,

  options: {
    keepAlive: 300000,
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },

  // pubsubChannel: 'pubsub',
  // pubsubCollectionSize: 30000000
};
