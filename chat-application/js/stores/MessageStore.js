var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ChatMessageUtils = require('../utils/ChatMessageUtils');
var EventEmitter = require('events').EventEmitter;
var ThreadStore = require('../stores/ThreadStore');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _message = {};

function _addMessages(rawMessage) {
    rawMessage.forEach(function (message) {
        if(!_message[message.id]){
            _message[message.id] = ChatMessageUtils.convertRawMessage(message, ThreadStore.getCurrentID());
        }
    })
}

function _markAllInThreadRead(threadID) {
    for(var id in _message){
        if(_message[id].threadID === threadID){
            _message[id].isRead = true;
        }
    }
}

var MessageStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback){
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    get: function (id) {
        return _message[id];
    },

    getAll: function () {
        return _message;
    },

    getAllForThread: function (threadID) {
        var threadMessages = [];
        for(var id in _message){
            if(_message[id].threadID === threadID){
                threadMessages.push(_message[id]);
            }
        }

        threadMessages.sort(function (a, b) {
            if(a.date < b.data){
                return -1;
            }
            else if(a.date > b.date){
                return 1;
            }
            return 0;
        });
        return threadMessages;
    },

    getAllForCurrentThead: function () {
        return this.getAllForThread(ThreadStore.getCurrentID());
    }
});

MessageStore.dispatchToken = ChatAppDispatcher.register(function (action) {
    switch (action.type){
        case ChatConstants.ActionType.CLICK_THREAD:
            ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
            _markAllInThreadRead(ThreadStore.getCurrentID());
            MessageStore.emitChange();
            break;
        case ChatConstants.ActionType.CREATE_MESSAGE:
            var message = ChatMessageUtils.getCreatedMessageData(action.text, action.currentThreadID);
            _message[message.id] =  message;
            MessageStore.emitChange();
            break;
        case ChatConstants.ActionType.RECEIVE_RAW_MESSAGES:
            _addMessages(action.rawMessage);
            ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
            _markAllInThreadRead(ThreadStore.getCurrentID());
            MessageStore.emitChange();
            break;
        default:
            // do nothing
    }
});

module.exports = MessageStore;