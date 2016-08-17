var React = require('react');
var classNames = require('classnames');
var ChatThreadActionCreators = require('../actions/ChatThreadActionCreators');

var ThreadListItem = React.createClass({
    propTypes: {
        thread: React.PropTypes.object,
        currentThreadID: React.PropTypes.string
    },

    _onClick: function () {
        ChatThreadActionCreators.clickThread(this.props.thread.id);
    },

    render: function () {
        var thread = this.props.thread;
        var lastMessage = thread.lastMessage;

        return(
            <li className={classNames({
                'thread-list-item': true,
                'active': thread.id === this.props.currentThreadID
            })}
                onClick={this._onClick}
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