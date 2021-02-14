import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import MainMenu from '../../components/MainMenu';
import { useDispatch } from 'react-redux';
import { postSignIn } from '../../store/actions';
import { toast } from 'react-toastify';
import api from '../../api';
import { useHistory } from 'react-router-dom';

const defaultForm = { email: '', password: '' };

function Login() {

    const [form, setForm] = useState(defaultForm);
    const dispatch = useDispatch();
    const history = useHistory();

    function handleForm(field, inputEvent) {
        let newForm = { ...form };
        newForm[field] = inputEvent.target.value;
        setForm(newForm);
    }

    function onSubmit() {
        dispatch(postSignIn(form, onSuccess, onError));
    }

    function onSuccess(response) {
        const { data: { token } } = response;
        api.defaults.headers.Authorization = token;
        localStorage.setItem('auth-token', token);
        setForm(defaultForm);
        toast.success(`Welcome, ${response.data.user.email}!`, { position: toast.POSITION.TOP_RIGHT });
        history.push('/dashboard');
    }

    function onError(error) {
        console.log('ERROR', error);
        toast.error(error.data.error, { position: toast.POSITION.TOP_RIGHT });
    }

    return (
        <>
            <Row>
                <Col md={12}>
                    <MainMenu />
                </Col>
            </Row>
            <hr />
            <Row>
                <Col md={12}>
                    <h2 className="text-center">Access your dashboard</h2>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <div className="form-row">
                        <Col md={12}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    className="form-control" 
                                    name="email" 
                                    id="email" 
                                    onChange={e => handleForm('email', e)}
                                    value={form.email}
                                />
                            </div>
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col md={12}>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input 
                                    className="form-control" 
                                    name="password" 
                                    id="password" 
                                    onChange={e => handleForm('password', e)}
                                    value={form.password}
                                />
                            </div>
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col md={12}>
                            <Button type="button" variant="primary" onClick={() => onSubmit()}> Login </Button>
                        </Col>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default Login;