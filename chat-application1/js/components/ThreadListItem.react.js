var React = require('react');
var className = require('classnames');

var ReactPropTypes = React.PropTypes;

var ThreadListItem = React.createClass({
    propTypes: {
        thread: ReactPropTypes.object,
        currentThreadID: ReactPropTypes.string
    },

    render: function () {
        var thread = this.props.thread;
        var lastMessage = thread.lastMessage;

        return(
            <li
                className={className({
                    'thread-list-item': true,
                    'active': thread.id === this.props.currentThreadID
                })}
            >
                <h5 className="thread-name">{thread.name}</h5>
                <div className="thread-time">
                    {lastMessage.date.toLocaleTimeString()}
                </div>
                <div className="thread-last-message">
                    {lastMessage.text}
                </div>
            </li>
        );
    }
});

module.exports = ThreadListItem;