var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var EventEmitter = require('events').EventEmitter;
var MessageStore = require('../stores/MessageStore');
var ThreadStore = require('../stores/ThreadStore');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var UnreadThreadStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getCount: function () {
        var threads = ThreadStore.getAll();
        var unreadCount = 0;
        for(var id in threads){
            if(!threads[id].lastMessage.isRead){
                unreadCount++;
            }
        }

        return unreadCount;
    }

});

UnreadThreadStore.dispatchToken = ChatAppDispatcher.register(function (action) {
    ChatAppDispatcher.waitFor([
        ThreadStore.dispatchToken,
        MessageStore.dispatchToken
    ]);

    switch (action.type){
        case ChatConstants.CLICK_THREAD:
            console.log(111);
            UnreadThreadStore.emitChange();
            break;
        case ChatConstants.RECEIVE_RAW_MESSAGES:
            UnreadThreadStore.emitChange();
            break;
        default:
    }
});

module.exports = UnreadThreadStore;