var React = require('react');
var MessageComposer = require('./MessageComposer.react');
var MessageListItem = require('./MessageListItem.react');
var MessageStore = require('../stores/MessageStore');
var ThreadStore = require('../stores/ThreadStore');

function getStateFromStore() {
    return {
        message: MessageStore.getAllForCurrentThead(),
        thread: ThreadStore.getCurrent()
    }
}

function getMessageListItem(message) {
    return(
        <MessageListItem key={message.id} message={message} />
    )
}

var MessageSection = React.createClass({
    getInitialState: function () {
        return getStateFromStore();
    },

    componentDidMount: function () {
        this._scrollToBottom();
        MessageStore.addChangeListener(this._onChange);
        ThreadStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        MessageStore.removeChangeListener(this._onChange);
        ThreadStore.removeChangeListener(this._onChange);
    },

    render: function () {
        var messageListItems = this.state.message.map(getMessageListItem);

        return (
            <div className="message-section">
                <h3 className="message-thread-heading">{this.state.thread.name}</h3>
                <ul className="message-list" ref="messageList">
                    {messageListItems}
                </ul>
                <MessageComposer threadID={this.state.thread.id}/>
            </div>
        )
    },

    componentDidUpdate: function () {
        this._scrollToBottom();
    },

    _scrollToBottom: function () {
        var ul = this.refs.messageList.getDOMNode();
        ul.scrollTop = ul.scrollHeight;
    },

    _onChange: function () {
        this.setState(getStateFromStore());
    }
});

module.exports = MessageSection;