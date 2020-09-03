import React, { FC, } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './views/Home';
import Forms from './views/Forms';

const Routes: FC = () => {
    return (
        <Router>
            <Switch>
                <Route path={'/forms'} exact component={Forms} />
                <Route path={'*'} component={Home} />
            </Switch>
        </Router>
    );
}

export default Routes;