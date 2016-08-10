var React = require('react');
var VoteActions = require('../actions/VoteAction.jsx');

var Main = React.createClass({
    render: function () {
        return(
            <div className="container">
                <h1 className="center light-blue-text lighten-3">Simple Flux Example</h1>
                <div className="col s12 z-depth-4 card-panel teal lighten-3">
                    <div className="row center">
                        <h3 className="deep-orange-text lighten-1"></h3>
                    </div>
                    <div className="progress">
                        <div className="determinate"></div>
                    </div>
                    <div className="row">
                        <a href="#" className="left waves-effect waves-circle waves-light btn-floating secondary-content blue act-btn" >
                            <i className="mdi-action-thumb-up"></i>
                        </a>

                        <a href="#" className="right waves-effect waves-circle waves-light btn-floating secondary-content blue act-btn" >
                            <i className="mdi-action-thumb-down"></i>
                        </a>
                    </div>
                    <div className="row center">
                        <button className="waves-effect waves-light btn red" ><i className="mdi-content-undo left" />Reset</button>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Main;