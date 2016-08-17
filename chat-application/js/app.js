var React = require('React');
var ChatApp = require('./components/ChatApp.react');

Window.React = React;

React.render(
    <ChatApp/>,
    document.getElementById('react')
);