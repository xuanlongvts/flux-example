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
    };
}

var VoteStore = assign(
    {}, EventEmitter.prototype, {
        getVotes: function () {
            var up_rate = (_votes.up || _votes.down)? _votes.up / (_votes.up + _votes.down) * 100: 50;
            var down_rate = 100 - up_rate;
            _votes.up_rate = up_rate.toFixed(2);
            _votes.down_rate = down_rate.toFixed(2);
            return _votes;
        },

        emitChange: function () {
            this.emit(CHANGE_EVENT);
        },

        addChangeListener: function (callback) {
            this.on(CHANGE_EVENT, callback);
        }
    }
);