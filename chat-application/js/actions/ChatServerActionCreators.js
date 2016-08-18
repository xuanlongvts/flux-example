var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');

module.exports = {
    receiveAll: function (rawMessages) {
        ChatAppDispatcher.dispatch({
            type: ChatConstants.ActionType.RECEIVE_RAW_MESSAGES,
            rawMessage: rawMessages
        });
    },

    receiveCreatedMessage: function (createMessage) {
        ChatAppDispatcher.dispatch({
            type: ChatConstants.ActionType.RECEIVE_RAW_CREATED_MESSAGE,
            rawMessage: createMessage
        });
    }
};