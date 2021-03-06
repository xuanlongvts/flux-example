var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ChatMessageUtils = require('../utils/ChatMessageUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _currentID = null;
var _threads = {};

var ThreadStore = assign({}, EventEmitter.prototype, {
    init: function (rawMessages) {
        rawMessages.forEach(function (message) {
            var threadID = message.threadID;
            var thread = _threads[threadID];
            if(thread && thread.lastMessage.timestamp > message.timestamp){
                return;
            }
            _threads[threadID] = {
                id: threadID,
                name: message.threadName,
                lastMessage: ChatMessageUtils.convertRawMessage(message, _currentID)
            }
        });

        if(!_currentID){
            var allChrono = this.getAllChrono();
            _currentID = allChrono[allChrono.length - 1].id;
        }
    },

    emitChagne: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    get: function (id) {
        return _threads[id];
    },

    getAll: function () {
        return _threads;
    },

    getCurrentID: function () {
        return _currentID;
    },

    getCurrent: function () {
        return this.get(this.getCurrentID());
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
    }
});

ThreadStore.dispatchToken = ChatAppDispatcher.register(function (action) {
    switch (action.type){

        case ChatConstants.CLICK_THREAD:
            _currentID = action.threadID;
            _threads[_currentID].lastMessage.isRead = true;
            ThreadStore.emitChagne();
            break;

        case ChatConstants.RECEIVE_RAW_MESSAGES:
            //console.log(action.rawMessage);
            ThreadStore.init(action.rawMessage);
            ThreadStore.emitChagne();
            break;

        default:
    }
});

module.exports = ThreadStore;