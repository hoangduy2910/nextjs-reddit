import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

import { UserService } from "~/services/user-service";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const registerHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const [err, data] = await UserService.Register(form);
    if (!err && data) {
      console.log(data);
    } else {
      console.log(err)
    }
  };

  return (
    <div className="flex">
      <Head>
        <title>Register</title>
      </Head>
      <div
        className="w-36 h-screen bg-cover bg-center"
        style={{ backgroundImage: `url("/images/bg-register.png")` }}
      />
      <div className="flex flex-col justify-center pl-6">
        <div className="w-72">
          <h1 className="text-lg mb-2">Sign up</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our
            <Link href="/">
              <a className="ml-1 text-blue-500">
                User Agreement and Privacy Policy.
              </a>
            </Link>
          </p>
          <form>
            <div className="mb-2">
              <input
                type="text"
                className="p-2 w-full bg-gray-50 border bordere-gray-300 rounded outline-none focus:bg-white hover:bg-white cursor-pointer transition duration-400"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="p-2 w-full bg-gray-50 border bordere-gray-300 rounded outline-none focus:bg-white hover:bg-white cursor-pointer transition duration-400"
                placeholder="Username"
                value={form.userName}
                onChange={(e) => setForm({ ...form, userName: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <input
                type="password"
                className="p-2 w-full bg-gray-50 border bordere-gray-300 rounded outline-none focus:bg-white hover:bg-white cursor-pointer transition duration-400"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <input
                type="password"
                className="p-2 w-full bg-gray-50 border bordere-gray-300 rounded outline-none focus:bg-white hover:bg-white cursor-pointer transition duration-400"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />
            </div>
            <button
              className="w-full py-3 mb-4 text-xs font-bold text-white uppercase bg-blue-500 boder border-blue-500 rounded"
              onClick={registerHandler}
            >
              Sign Up
            </button>
          </form>
          <small>
            Already a redditor?
            <Link href="/login">
              <a className="ml-1 text-blue-500 uppercase">Log in</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
