var React = require('react');
var Main = require('./components/Main.jsx');

var App = React.createClass({
    render: function () {
        return (
            <Main />
        )
    }
});

React.render(
    <App />,
    document.getElementById('app')
)