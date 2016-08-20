var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants.jsx');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _votes = {
    up: 0,
    down: 0
};

function _voteUp() {
    _votes.up++;
}

function _voteDown() {
    _votes.down++;
}

function _voteReset() {
    _votes = {
        up: 0,
        down: 0
    }
}

var VoteStore = assign(
    {}, EventEmitter.prototype, {
        getVotes: function () {
            var up_rate = (_votes.up || _votes.down)? _votes.up/(_votes.up + _votes.down) * 100: 50;
            var down_rate = 100 - up_rate;
            _votes.up_rate = up_rate.toFixed(2);
            _votes.down_rate = down_rate.toFixed(2);
            console.log('getVotes');
            return _votes;
        },

        emitChange: function () {
            console.log('emitChange');
            this.emit(CHANGE_EVENT);
        },

        addChangeListener: function (callback) {
            console.log('callback addChangeListener');
            this.on(CHANGE_EVENT, callback);
        }
    }
);

AppDispatcher.register(function (action) {
    switch (action.actionType){
        case Constants.ACTION_VOTE_UP:
            console.log('AppDispatcher  Up');
            _voteUp();
            VoteStore.emitChange();
            break;
        case Constants.ACTION_VOTE_DOWN:
            console.log('AppDispatcher  Down');
            _voteDown();
            VoteStore.emitChange();
            break;
        case Constants.ACTION_VOTE_RESET:
            console.log('AppDispatcher  Reset');
            _voteReset();
            VoteStore.emitChange();
            break;
        default:
    }
});

module.exports = VoteStore;
