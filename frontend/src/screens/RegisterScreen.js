import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
const RegisterScreen = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        <div className="">
          <Link
            to="/"
            className=" text-sm sm:text-4xl font-bold dark:text-white"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Bloggers's
            </span>
            Bounty
          </Link>
          <p className="text-sm mt-5">
            This is a demo project .You can register with your email and
            password or with Google
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4 ">
            <div className="">
              <Label value="Your Username" className="font-bold"></Label>
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                className="w-80"
              ></TextInput>
            </div>
            <div>
              <Label value="Your Email" className="font-bold"></Label>
              <TextInput
                type="text"
                placeholder="Email"
                id="email"
                className="w-80"
              ></TextInput>
            </div>
            <div>
              <Label value="Your Password" className="font-bold"></Label>
              <TextInput
                type="text"
                placeholder="Password"
                id="password"
                className="w-80"
              ></TextInput>
            </div>
            <Button gradientDuoTone="purpleToPink" className="w-32">
              Register
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span className="text-blue">Already, Have an account?</span>
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
