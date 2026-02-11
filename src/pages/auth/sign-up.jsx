import { useContext, useState } from "react";
import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { AppContent } from "@/context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

import "./sign-up.css";

export function SignUp() {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin } = useContext(AppContent);

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + '/api/auth/register',
        { name, email, password }
      );

      if (data.success) {
        setIsLoggedin(true);
        navigate('/auth/sign-in');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="signup-page">

      {/* === BACKGROUND IMAGE === */}
      <div className="signup-bg" />

      {/* === DARK OVERLAY === */}
      <div className="signup-overlay" />

      {/* === CONTENT === */}
      <div className="signup-content">

        <div className="signup-grid">

          {/* === FORM === */}
          <div className="signup-form-wrapper">
            <div className="signup-glass">

              <Typography variant="h2" className="font-bold text-center mb-2">
                Sign Up
              </Typography>
              <Typography className="text-center text-white-gray-600 mb-6">
                Create your account to get started
              </Typography>

              <form onSubmit={onSubmitHandler} className="flex flex-col gap-6">

                <div>
                  <Typography variant="small" className="font-medium mb-1">
                    Full Name
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="signup-input"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>

                <div>
                  <Typography variant="small" className="font-medium mb-1">
                    Your email
                  </Typography>
                  <Input
                    size="lg"
                    type="email"
                    placeholder="name@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="signup-input"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>

                <div>
                  <Typography variant="small" className="font-medium mb-1">
                    Password
                  </Typography>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      size="lg"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="signup-input pr-10"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
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

                <Button type="submit" fullWidth color="blue">
                  Register Now
                </Button>

                <Typography className="text-center text-white-gray-600">
                  Already have an account?
                  <Link to="/auth/sign-in" className="ml-1 font-medium text-gray-900">
                    Sign in
                  </Link>
                </Typography>

              </form>
            </div>
          </div>

          {/* === SPACER KANAN === */}
          <div className="signup-spacer" />

        </div>
      </div>
    </section>
  );
}

export default SignUp;