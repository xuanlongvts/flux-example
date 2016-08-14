var React = require('React');
var ChatApp = require('./components/chatApp.react');

Window.React = React;

React.render(
    <ChatApp/>,
    document.getElementById('react')
);