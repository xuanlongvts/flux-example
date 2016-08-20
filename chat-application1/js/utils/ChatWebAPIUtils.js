var ChatServerActionCreators = require('../actions/ChatServerActionCreators');

module.exports = {
    getAllMessage: function () {
        var rawMessages = localStorage.getItem('messages');
        ChatServerActionCreators.receiveAll(rawMessages);
    },

    createMessage: function (message, threadName) {
        var rawMessage = localStorage.getItem('messages');
        var timestamp = Date.now();
        var id = 'm_' + timestamp;
        var threadID = message.threadID || ('t_' + Date.now());

        var createdMessage = {
            id: id,
            threadID: threadID,
            threadName: threadName,
            authorName: message.authorName,
            text: message.text,
            timestamp: timestamp
        };

        rawMessage.push(rawMessage);
        localStorage.setItem('messages', rawMessage);

        setTimeout(function () {
            ChatServerActionCreators.receiveCreatedMessage(createdMessage);
        }, 0);
    }
};