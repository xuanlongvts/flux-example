var React = require('react');
var ThreadListItem = require('../components/ThreadListItem.react');
var ThreadSotre = require('../stores/ThreadStore');

function getStateFromStores() {
    return {
        threads: ThreadSotre.getAllChrono(),
        currentThreadID: ThreadSotre.getCurrentID(),

    }
}

var ThreadSection = React.createClass({
    getInitialState: function () {
        return getStateFromStores();
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

        return(
            <div className="thread-section">
                <div className="thread-count">
                </div>
                <ul className="thread-list">
                    {threadListItems}
                </ul>
            </div>
        )
    }
});

module.exports = ThreadSection;