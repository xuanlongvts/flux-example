var React = require('react');
var MessageSection = require('./MessageSection.react');

var ChatApp = React.createClass({
    render: function () {
        return(
            <div className="chatapp">
                <MessageSection/>
            </div>
        );
    }
});

module.exports = ChatApp;