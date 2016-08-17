var React = require('react');
//var MessageSection = require('./MessageSection.react');
var ThreadSection = require('./ThreadSection.react');

var ChatApp = React.createClass({
    render: function () {
        return(
            <div className="chatapp">
                <ThreadSection/>
            </div>
        );
    }
});

module.exports = ChatApp;