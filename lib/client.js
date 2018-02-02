// client.js - node-zendesk client initialization
'use strict';

const clientModule = require('./client/index')
exports.createClient = function (options) {
  const client = {}
  for (const key of Object.keys(clientModule)) {
    if (key === 'helpcenter' || key === 'voice') {
      if (options.helpcenter) {
        // todo, enumerate keys and instantiate
      }
      if (options.voice) {
        // todo, enumerate keys and instantiate
      }
      continue
    }
    const Class = clientModule[key]
    client[key] = new Class(options)
  }
  return client;
}
