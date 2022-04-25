import { Button } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import './SigninScreen.css';

export default function SigninScreen() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  return (
    <div className="login">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div className="login__container">
        <form>
          <h5>E-mail</h5>
          <input
            type="email"
            /*value={email}*/
            required
            /*onChange={(e) => setEmail(e.target.value)}*/
          />

          <h5>Password</h5>
          <input
            type="password"
            /*value={password}*/
            required
            /*onChange={(e) => setPassword(e.target.value)}*/
          />

          <Button
            type="submit"
            /*onClick={signIn}*/
            className="login__signInButton"
            variant="contained"
          >
            Sign In
          </Button>
        </form>

        <Button
          variant="contained"
          /*onClick={register}*/
          className="login__registerButton"
        >
          <Link to={`/signup?redirect=${redirect}`}>Create your Account</Link>
        </Button>
      </div>
    </div>
  );
}
