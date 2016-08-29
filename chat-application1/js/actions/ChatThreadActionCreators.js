var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');

module.exports = {

    clickThread: function(threadID) {
        ChatAppDispatcher.dispatch({
            type: ChatConstants.CLICK_THREAD,
            threadID: threadID
        });
    }

};