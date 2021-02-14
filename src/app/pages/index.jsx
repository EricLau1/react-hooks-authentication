import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions';

import Home from './Home';
import SignUp from './SignUp';
import Login from './Login';
import Dashboard from './Dashboard';
import api from '../api';

function PrivateRoute({ component, ...attributes }) {
    const dispatch = useDispatch();
    const [authenticated, setAuthenticated] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("auth-token");
        if(token) {
            api.defaults.headers.Authorization = token;
            setAuthenticated(true);
            setLoading(false);
        } else {
            dispatch(logout(() => {
                setAuthenticated(false);
                setLoading(false);
            }));
        }
    }, [])

    if(loading) {
        return <div>loading...</div>;
    }

    if(authenticated) {
        return <Route {...attributes} component={component} />;
    }
    
    return <Redirect to="/" />;
}

function Pages() {
    return (
        <Container>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
            </Router>
        </Container>
    )
}

export default Pages;