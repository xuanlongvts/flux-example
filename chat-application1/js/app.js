var React = require('react');
var ChatExampleData = require('./ChatExampleData');
var ChatWebAPIUtils = require('./utils/ChatWebAPIUtils');

Window.React = React;

ChatExampleData.init();
ChatWebAPIUtils.getAllMessage();




