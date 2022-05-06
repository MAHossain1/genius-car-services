import { Toast } from "bootstrap";
import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";
import SocialLogin from "../SocialLogin/SocialLogin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import useToken from "../../../hooks/useToken";

const Login = () => {
  const emailRef = useRef("");
  const passRef = useRef("");
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";
  let errorElement;

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

  const [token] = useToken(user);

  if (error) {
    errorElement = <p>Error: {error?.message}</p>;
  }

  if (token) {
    navigate(from, { replace: true });
  }

  if (loading || sending) {
    return <Loading></Loading>;
  }

  const handleLogin = async event => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passRef.current.value;

    await signInWithEmailAndPassword(email, password);
  };

  const navigateRegister = event => {
    navigate("/register");
  };

  const resetPassword = async () => {
    const email = emailRef.current.value;
    if (email) {
      await sendPasswordResetEmail(email);
      toast("Sent email");
    } else {
      toast("please enter your email address");
    }
  };

  return (
    <div className="container w-50 mx-auto">
      <h2 className="text-center text-primary mt-2">Please Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            ref={emailRef}
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>
        {errorElement}

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            ref={passRef}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>

        <Button variant="primary w-50 d-block mx-auto mb-2" type="submit">
          Login
        </Button>
      </Form>
      <p className="mt-2 ">
        New to Genius Car?{" "}
        <Link
          to="/register"
          className="text-primary text-decoration-none"
          onClick={navigateRegister}
        >
          Please Register
        </Link>
      </p>
      <p className="mt-2 ">
        Forget Password?{" "}
        <button
          className="btn btn-link text-primary text-decoration-none"
          onClick={resetPassword}
        >
          Reset Password
        </button>
      </p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
