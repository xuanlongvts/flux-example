var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ChatMessageUtils = require('../utils/ChatMessageUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _currentID = null;
var _threads = {};

var ThreadStore = assign({}, EventEmitter.prototype, {
    init: function(rawMessages){
        rawMessages.forEach(function (message) {
            var threadID = message.threadID;
            var thread = _threads[threadID];
            if(thread && thread.lastMessage.timestamp > message.timestamp){
                return;
            }
            _threads[threadID] = {
                id: threadID,
                name: message.threadName,
                lastMessage: ChatMessageUtils.convertRawMessage(message,_currentID)
            }
        }, this);

        if(!_currentID){
            var allChrono = this.getAllChrono();
            _currentID = allChrono[allChrono.length - 1].id;
        }

        _threads[_currentID].lastMessage.isRead = true;
    },

    emitChange: function () {
        console.log('emitChange');
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        console.log('addChangeListener');
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        console.log('removeChangeListener');
        this.removeListener(CHANGE_EVENT, callback);
    },

    get: function (id) {
        return _threads[id];
    },

    getAll: function () {
        return _threads;
    },

    getAllChrono: function () {
        var orderedThreads = [];
        for(var id in _threads){
            var thread = _threads[id];
            orderedThreads.push(thread);
        }

        orderedThreads.sort(function (a, b) {
            if(a.lastMessage.date < b.lastMessage.date){
                return -1;
            }
            else if(a.lastMessage.date > b.lastMessage.date){
                return 1;
            }
            return 0;
        });
        return orderedThreads;
    },

    getCurrentID: function () {
        return _currentID;
    },

    getCurrent: function () {
        return this.get(this.getCurrentID());
    }
});

ThreadStore.dispatchToken = ChatAppDispatcher.register(function (action) {
    switch (action.type){
        case ChatConstants.ActionType.CLICK_THREAD:
            _currentID = action.threadID;
            _threads[_currentID].lastMessage.isRead = true;
            console.log('action click');
            ThreadStore.emitChange();
            break;
        case ChatConstants.ActionType.RECEIVE_RAW_MESSAGES:
            console.log('action receive data');
            ThreadStore.init(action.rawMessage);
            ThreadStore.emitChange();
            break;
        default:
    }
});

module.exports = ThreadStore;