import React from 'react';
import { useDispatch } from 'react-redux';
import useRouter from '../utils/useRouter';
import { setRedirectUrl } from '../utils/authSlice';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
    const domain =
      //   import.meta.env.VITE_NODE_ENV === 'production'
      process.env.VITE_NODE_ENV === 'production'
        ? window.location.origin
        : process.env.VITE_SERVER_DOMAIN;
    // : import.meta.env.VITE_SERVER_DOMAIN;
    dispatch(setRedirectUrl(router.location.state?.prevPath));
    window.location.replace(`${domain}/api/public/auth/google`);
  };

  handleGoogleLogin();

  return <p>redirecting to login ...</p>;
};

export default Login;
