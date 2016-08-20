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

        }, this);
    }
});