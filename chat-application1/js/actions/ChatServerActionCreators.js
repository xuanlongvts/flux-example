var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');

module.exports = {
    receiveAll: function (rawMessage) {
        ChatAppDispatcher.dispatch({
            type: ChatConstants.RECEIVE_RAW_MESSAGES,
            rawMessage: rawMessage
        });
    },

    receiveCreatedMessage: function (createdMessage) {
        ChatAppDispatcher.dispatch({
            type: ChatConstants.RECEIVE_RAW_CREATED_MESSAGE,
            rawMessage: createdMessage
        });
    }
};