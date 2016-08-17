var React = require('react');
var ThreadListItem = require('../components/ThreadListItem.react');

function getStateFromStores(){
    return{

    }
}

var ThreadSection = React.createClass({

    render: function () {
        var threadListItem = this.state.threads.map(function (thread) {
            return(
                <ThreadListItem
                    key={thread.id}
                    thread={thread}
                    currentThreadID={this.state.currentThreadID}
                />
            )
        })
    }
});