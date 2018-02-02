// client.js - node-zendesk client initialization
'use strict';

var parts = [
      'Users', 'Tickets', 'TicketAudits', 'TicketFields', 'TicketForms', 'TicketMetrics', 'TicketImport', 'TicketExport',
      'Views', 'Requests', 'UserIdentities', 'Groups', 'GroupMemberships',
      'CustomAgentRoles', 'Organizations', 'Search', 'Tags', 'Forums',
      'ForumSubscriptions', 'Categories', 'Topics', 'TopicComments',
      'TopicSubscriptions', 'TopicVotes', 'AccountSettings',
      'ActivityStream', 'Attachments', 'JobStatuses', 'Locales',
      'Macros', 'SatisfactionRatings', 'SuspendedTickets', 'UserFields',
      'OrganizationFields', 'OauthTokens', 'Triggers', 'SharingAgreement',
      'Brand', 'OrganizationMemberships', 'DynamicContent', 'TicketEvents',
      'Imports', 'Targets', 'Sessions', 'Installations', 'Policies'
    ],
    helpcenterParts = [
      'Articles', 'Sections', 'Categories', 'Translations',
      'ArticleComments', 'ArticleLabels', 'ArticleAttachments',
      'Votes', 'Search', 'AccessPolicies', 'Subscriptions'
    ],
    voiceParts = [
      'PhoneNumbers', 'GreetingCategories', 'Greetings', 'CurrentQueueActivity',
      'HistoricalQueueActivity', 'AgentActivity', 'Availabilities'
    ];

exports.createClient = function (options) {
  var client = {}, partsToAdd, clientPath;

  if (options.helpcenter) {
    partsToAdd = helpcenterParts;
    clientPath = './client/helpcenter/';
  } else if (options.voice) {
    partsToAdd = voiceParts;
    clientPath = './client/voice/';
  } else {
    partsToAdd = parts;
    clientPath = './client/';
  }


  partsToAdd.forEach(function (k) {
    exports[k] = require(clientPath + k.toLowerCase())[k];
  });

  partsToAdd.forEach(function (k) {
    client[k.toLowerCase()] = new exports[k](options);
    client[k.toLowerCase()].on('debug::request',  debug);
    client[k.toLowerCase()].on('debug::response', debug);
  });

  function debug(args) {
    if (options.get('debug')) {
      console.log(args);
    }
  }

  return client;
};
