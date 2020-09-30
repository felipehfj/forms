import React, { Fragment, FC } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Home: FC = () => {
    return (<Fragment>
        <Link to="/formlist">Forms</Link>
        <Link to="/forms">Form</Link>
        <Link to="/Home">Home</Link>
    </Fragment>);
}

export default Home;