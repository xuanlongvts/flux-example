var keyMirror = require('keymirror');

module.exports = {
    ActionType: keyMirror({
        CLICK_THREAD: null,
        CREATE_MESSAGE: null,
        RECEIVE_RAW_CREATED_MESSAGE: null,
        RECEIVE_RAW_MESSAGES: null
    })
};