import React, { useEffect, useState } from 'react';
import { Col, Row, Breadcrumb, Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteUser, getUser, logout } from '../../store/actions';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useInterval } from '../../hooks';

function Dashboard() {
    const auth = useSelector(store => store.auth);
    const users = useSelector(store => store.users);
    const dispatch = useDispatch();
    const history = useHistory();

    const [delay, setDelay] = useState(5000);
    const [isRunning, setIsRunning] = useState(true);
  
    useInterval(() => {
        dispatch(
            getUser(
            auth.user.id, 
            (response) => console.log('GET_USER', response),
            (error) => console.log(error))
        );
    }, isRunning ? delay : null);

    useEffect(() => {
        dispatch(getUsers(handleGetUsersSuccess, handleGetUsersError))
    }, [])

    function handleGetUsersSuccess(response) {
        console.log('handleGetUsersSuccess',  response);
    }

    function handleGetUsersError(response) {
        console.log('handleGetUsersError',  response);
    }

    function handleLogout() {
        dispatch(logout(() => {
            setIsRunning(false);
            history.push('/');
        }));
    }

    function handleDelete(id) {
        dispatch(deleteUser(id, 
        (success) => {
            console.log(success);
            toast.info(`${auth.user.email} deleted`, { position: toast.POSITION.TOP_RIGHT });
            handleLogout();
        },
        error => {
            toast.info(error.data.error, { position: toast.POSITION.TOP_RIGHT });
        }));
    }

    return (
        <>
            <Row>
                <Col md={12}>
                    <Breadcrumb>
                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item active>{auth.user.email}</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => handleLogout()}>
                            Logout 
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <h3>Users: {users.list.length}</h3>
                </Col>
            </Row>
            {
                users.list.length > 0 && (
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.list.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.created_at}</td>
                                        <td>{user.updated_at}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => handleDelete(user.id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                )
            }
        </>
    );
}

export default Dashboard;