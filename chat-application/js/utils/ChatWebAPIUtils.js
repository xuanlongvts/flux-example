var ChatServerActionCreators = require('../actions/ChatServerActionCreators');

module.exports = {
    getAllMessage: function () {
        var rawMessages = JSON.parse(localStorage.getItem('message'));
        ChatServerActionCreators.receiveAll(rawMessages);
    },

    createMessage: function (message, threadName) {
        var rawMessage = JSON.parse(localStorage.getItem('message'));
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
        rawMessage.push(createdMessage);
        localStorage.setItem('message', JSON.stringify(rawMessage));

        setTimeout(function () {
            ChatServerActionCreators.receiveCreatedMessage(createdMessage);
        }, 0);
    }
};