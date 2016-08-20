var React = require('react');
var ChatExampleData = require('./ChatExampleData');
var ChatWebAPIUtils = require('./utils/ChatWebAPIUtils');
var ChatApp = require('./components/ChatApp.react');
Window.React = React;

ChatExampleData.init();
ChatWebAPIUtils.getAllMessage();

