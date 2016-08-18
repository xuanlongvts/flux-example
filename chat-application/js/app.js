var React = require('react');
var ChatApp = require('./components/ChatApp.react');
var ChatExampleData = require('./ChatExampleData');
var ChatWebAPIUtils = require('./utils/ChatWebAPIUtils');
Window.React = React;

ChatExampleData.init();
ChatWebAPIUtils.getAllMessage();


React.render(
    <ChatApp/>,
    document.getElementById('react')
);