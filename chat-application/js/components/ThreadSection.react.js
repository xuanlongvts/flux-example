var React = require('react');
var ThreadListItem = require('../components/ThreadListItem.react');
var ThreadStore = require('../stores/ThreadStore');
var UnreadThreadStore = require('../stores/UnreadThreadStore');

function getStateFromStores() {
    return{
        threads: ThreadStore.getAllChrono(),
        currentThreadID: ThreadStore.getCurrent(),
        unreadCount: UnreadThreadStore.getCount()
    }
}

var ThreadSection = React.createClass({

    getInitialState: function () {
        console.log('getInitialState');
        return getStateFromStores();
    },

    _onChange: function () {
        console.log('_onChange');
        this.setState(getStateFromStores());
    },

    componentDidMount: function(){
        console.log('componentDidMount');
        ThreadStore.addChangeListener(this._onChange);
        UnreadThreadStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        console.log('componentWillUnmount');
        ThreadStore.removeChangeListener(this._onChange());
        UnreadThreadStore.removeChangeListener(this._onChange());
    },

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