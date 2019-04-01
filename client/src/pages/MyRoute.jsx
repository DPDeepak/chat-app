/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Start from './Start/Start';
import ChatBox from './ChatBox';

const propTypes = {
    match: PropTypes.object.isRequired,
};

class MyRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { match } = this.props;
        return (
            <>
                <Switch>
                    <Route exact path={`${match.path}`} component={Start} />
                    <Route exact path={`${match.path}/:from/:to`} component={ChatBox} />
                </Switch>
            </>
        );
    }
}
MyRoute.propTypes = propTypes;

export default MyRoute;
