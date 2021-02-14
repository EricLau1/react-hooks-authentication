import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import MainMenu from '../../components/MainMenu';
import { useDispatch } from 'react-redux';
import { postSignUp, clearGlobalError } from '../../store/actions';
import { toast } from 'react-toastify';

const defaultForm = { email: '', password: '' };

function SignUp() {

    const [form, setForm] = useState(defaultForm);
    const dispatch = useDispatch();

    function handleForm(field, inputEvent) {
        let newForm = { ...form };
        newForm[field] = inputEvent.target.value;
        setForm(newForm);
    }

    function onSubmit() {
        dispatch(postSignUp(form, onSuccess, onError));
    }

    function onSuccess(response) {
        setForm(defaultForm);
        toast.success('new use created', { position: toast.POSITION.TOP_RIGHT });
    }

    function onError(error) {
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
                    <h2 className="text-center">Create your account</h2>
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
                            <Button type="button" variant="primary" onClick={() => onSubmit()}> Register </Button>
                        </Col>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default SignUp;