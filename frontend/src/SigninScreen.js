import Axios from 'axios';
import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './SigninScreen.css';
import { Store } from './Store';
import { toast } from 'react-toastify';
import { getError } from './utils';

export default function SigninScreen() {
  const history = useNavigate();
  const { search } = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/signin', {
        email,
        password,
      });
      dispatch({ type: 'USER_SIGIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      history(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      history(redirect);
    }
  }, [history, redirect, userInfo]);

  return (
    <div className="login">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div className="login__container">
        <form onSubmit={submit}>
          <h5>E-mail</h5>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            className="login__signInButton"
            variant="contained"
          >
            Sign In
          </Button>
        </form>
        <p></p>
        <Button
          variant="outlined"
          /*onClick={register}*/
          className="login__registerButton"
        >
          <Link to={`/signup?redirect=${redirect}`}>Create your Account</Link>
        </Button>
      </div>
    </div>
  );
}
