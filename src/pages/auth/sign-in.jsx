import { useContext, useState } from "react";
import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { AppContent } from "@/context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

import "./sign-in.css";

export function SignIn() {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/login",
        { email, password }
      );

      if (data.success) {
        setIsLoggedin(true);
        getUserData();
        navigate("/dashboard/home");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="login-page">

      {/* === BACKGROUND IMAGE === */}
      <div className="login-bg" />

      {/* === DARK OVERLAY === */}
      <div className="login-overlay" />

      {/* === PESAWAT ANIMASI === */}
      <div className="airplane airplane-1">
        <img src="/img/airplane.png" alt="airplane" className="w-full h-full object-contain" />
      </div>

      {/* === CONTENT === */}
      <div className="login-content">

        <div className="login-grid">

          {/* === FORM === */}
          <div className="login-form-wrapper">
            <div className="login-glass">

              <Typography variant="h2" className="font-bold text-center mb-2">
                Sign In
              </Typography>
              <Typography className="text-center text-white-gray-600 mb-6">
                Enter your email and password
              </Typography>

              <form onSubmit={onSubmitHandler} className="flex flex-col gap-6">

                <div>
                  <Typography variant="small" className="font-medium mb-1">
                    Your email
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="name@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>

                <div>
                  <Typography variant="small" className="font-medium mb-1">
                    Password
                  </Typography>

                  {/* Wrapper untuk input + icon */}
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      size="lg"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="login-input pr-10"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />

                    {/* Icon di luar Input component */}
                    <span
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-600 hover:text-gray-800 transition-colors" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-600 hover:text-gray-800 transition-colors" />
                      )}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <Link to="/auth/reset-password" className="ml-1 font-medium text-gray-900 ">
                    <Typography variant="small" className="text-white-gray-700 ">
                      Forgot Password?
                    </Typography>
                  </Link>

                </div>

                <Button type="submit" fullWidth className="bg-blue-600 hover:bg-blue-700 shadow-md">
                  Sign In
                </Button>

                <Typography className="text-center text-white-gray-600">
                  Not registered?
                  <Link to="/auth/sign-up" className="ml-1 font-medium text-gray-900">
                    Create account
                  </Link>
                </Typography>

              </form>
            </div>
          </div>

          {/* === SPACER KANAN (BIAR TOWER KELIATAN) === */}
          <div className="login-spacer" />


        </div>
      </div>
    </section>
  );
}

export default SignIn;