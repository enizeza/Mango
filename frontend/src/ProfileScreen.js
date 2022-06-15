import React, { useContext, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from './Store';
import { toast } from 'react-toastify';
import { getError } from './utils';
import axios from 'axios';
import { Button } from '@mui/material';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

export default function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        '/api/users/profile',
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('User updated successfully');
    } catch (err) {
      dispatch({
        type: 'FETCH_FAIL',
      });
      toast.error(getError(err));
    }
  };

  return (
    <div className="login">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1>User Profile</h1>
      <div className="login__container">
        <form onSubmit={submitHandler}>
          <h5>Name</h5>
          <input
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <h5>Email</h5>
          <input
            value={email}
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            value={password}
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <h5>Confirm Password</h5>
          <input
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            className="login__signInButton"
            variant="contained"
            disabled={
              password !== confirmPassword ||
              password === '' ||
              confirmPassword === ''
            }
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}
