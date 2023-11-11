// const { duration } = require('moment/moment');
const NodeCache = require("node-cache");

const cache = new NodeCache();

module.exports = (duration) => (req, res, next) => {
  if (req.method !== "GET") {
    console.log("cannot cache non-GET requests");
    return next();
  }

  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    console.log(`Cached hit for ${key}`);
    return res.json(JSON.parse(cachedResponse));
  }

  res.sendResponse = res.send;

  res.send = (body) => {
    res.sendResponse(body);
    cache.set(key, body, duration);
  };

  next();
};
