var React = require('react');
var ThreadListItem = require('../components/ThreadListItem.react');

var ThreadSection = React.createClass({

    render: function () {
        var threadListItems = this.state.threads.map(function (thread) {
            return(
                <ThreadListItem
                    key={thread.id}
                    thread={thread}
                    currentThreadID={this.state.currentThreadID}
                />
            );
        }, this);

        var unread = this.state.unreadCount === 0? null: <span>Unread threads: {this.state.unreadCount}</span>;

        return(
            <div className="thread-section">
                <div className="thread-count">
                    {unread}
                </div>
                <ul className="thread-list">
                    {threadListItems}
                </ul>
            </div>
        );
    }
});

module.exports = ThreadSection;