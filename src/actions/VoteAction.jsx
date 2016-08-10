var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var Constants = require('../constants/Constants.jsx');

var VoteActions = {
    voteUp: function () {
        AppDispatcher.dispatch({
            actionType: Constants.ACTION_VOTE_UP
        });
    },
    voteDown: function () {
        AppDispatcher.dispatch({
            actionType: Constants.ACTION_VOTE_DOWN
        });
    },
    voteReset: function () {
        AppDispatcher.dispatch({
            actionType: Constants.ACTION_VOTE_RESET
        })
    }
};
module.exports = VoteActions;