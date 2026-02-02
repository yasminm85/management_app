import { useContext, useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { AppContent } from "@/context/AppContext";
import { toast } from "react-toastify";

import axios from "axios";

export function SignIn() {

  const navigate = useNavigate();
  
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmitHandler = async (e) => {

    try {
      e.preventDefault();

      axios.defaults.withCredentials = true

      const {data}  = await axios.post(backendUrl + '/api/auth/login', { email, password })
      console.log(data);
      if (data.success) {
        setIsLoggedin(true)
        getUserData()
        navigate('/home')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  }

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form onSubmit={onSubmitHandler} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type={showPassword ? "text" : "password"}
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={e => setPassword(e.target.value)}
              value={password}
              icon={
                <span onClick={togglePasswordVisibility} className="cursor-pointer">
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </span>
              }
            />
          </div>

          <div className="flex items-center justify-between gap-2 mt-6">
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">
                Forgot Password?
              </a>
            </Typography>
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Sign In
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Create account</Link>
          </Typography>
        </form>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;
