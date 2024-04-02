import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
const LoginScreen = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      // successMessage();
      console.log(email + password);

      try {
        // setLoading(true);
        // setErrorMessage(null);
        dispatch(signInStart());
        const res = await axios.post(
          "http://localhost:8080/api/auth/login",
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // setLoading(false);
        dispatch(signInSuccess(res.data));
        toast.success("Welcome!");
        navigate("/home");
      } catch (error) {
        // setLoading(false);
        toast.error("Something went wrong");
        dispatch(signInFailure("Wrong Credentials"));
        // return setErrorMessage("Wrong Credentials");
      }
    } else {
      // return setErrorMessage("Please fill out all fields");
      return dispatch(signInFailure("Please fill out all the fields"));
      // console.log("Please fill all the details");
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        <div className="">
          <Link
            to="/"
            className="text-sm sm:text-4xl font-bold dark:text-white"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Bloggers's
            </span>
            Bounty
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can login with your email and password
            or with Google.
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Email" className="font-bold"></Label>
              <TextInput
                type="email"
                placeholder="Email"
                name="email" // Use name attribute for input fields
                className="w-80"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
              ></TextInput>
            </div>
            <div>
              <Label value="Your Password" className="font-bold"></Label>
              <TextInput
                type="password"
                placeholder="Password"
                name="password" // Use name attribute for input fields
                className="w-80"
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
              ></TextInput>
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              className="w-32"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Login"
              )}
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span className="text-blue">New User? Create an account</span>
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
