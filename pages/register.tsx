import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

import { UserService } from "~/services/user-service";
import TextBox from "~/components/inputs/text-box";
import Spinner from "~/components/spinner";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const registerHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(async () => {
      const [err, data] = await UserService.Register(form);
      if (!err && data) {
        setIsLoading(false);
      } else {
        setErrors({ ...err });
        setIsLoading(false);
      }
    }, 1000);
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
          <p className="mb-4 text-xs">
            By continuing, you agree to our
            <Link href="/">
              <a className="ml-1 text-blue-500">
                User Agreement and Privacy Policy.
              </a>
            </Link>
          </p>
          <form>
            <TextBox
              className="mb-2"
              type="text"
              placeholder="Email"
              value={form.email}
              error={errors.email}
              onChange={(value) => setForm({ ...form, email: value })}
            />
            <TextBox
              className="mb-2"
              type="text"
              placeholder="Username"
              value={form.userName}
              error={errors.userName}
              onChange={(value) => setForm({ ...form, userName: value })}
            />
            <TextBox
              className="mb-2"
              type="password"
              placeholder="Password"
              value={form.password}
              error={errors.password}
              onChange={(value) => setForm({ ...form, password: value })}
            />
            <TextBox
              className="mb-4"
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              error={errors.confirmPassword}
              onChange={(value) => setForm({ ...form, confirmPassword: value })}
            />
            <button
              disabled={isLoading}
              className="w-full py-3 mb-4 text-xs font-bold text-white uppercase bg-blue-500 boder border-blue-500 rounded focus:outline-none hover:bg-blue-600 transition duration-300"
              onClick={registerHandler}
            >
              <div className="flex items-center justify-center">
                <Spinner isShow={isLoading} />
                Sign Up
              </div>
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
