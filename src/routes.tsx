import React, { FC, } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './views/Home';
import Forms from './views/Forms';
import FormList from './views/FormList';

const Routes: FC = () => {
    return (
        <Router>
            <Switch>
                <Route path={'/formList'} exact component={FormList} />
                <Route path={'/forms/:id'} exact component={Forms} />
                <Route path={'*'} component={Home} />
            </Switch>
        </Router>
    );
}

export default Routes;