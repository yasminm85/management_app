import React, { useState, useRef, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  Spinner,
} from "@material-tailwind/react";
import {
  EnvelopeIcon,
  LockClosedIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { AppContent } from "@/context/AppContext";

export function ResetPassword() {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContent);
  
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const inputRefs = useRef([]);

  // ============ STEP 1: Submit Email ============
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Masukkan email Anda");
      return;
    }

    setLoading(true);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-reset-otp`,
        { email }
      );

      if (data.success) {
        toast.success("Kode OTP telah dikirim ke email Anda");
        setStep(2);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal mengirim kode OTP");
    } finally {
      setLoading(false);
    }
  };

  // ============ STEP 2: OTP Functions ============
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto focus ke input selanjutnya
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);

    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastFilledIndex].focus();
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Masukkan kode OTP 6 digit");
      return;
    }

    setLoading(true);
    try {
      if (otpCode) {
        toast.success("Kode OTP berhasil diverifikasi");
        setStep(3);
      } else {
        toast.error(data.message);
        setOtp(new Array(6).fill(""));
        inputRefs.current[0].focus();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Kode OTP tidak valid");
      setOtp(new Array(6).fill(""));
      inputRefs.current[0].focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        `${backendUrl}/api/auth/resend-otp`,
        { email }
      );

      if (data.success) {
        toast.success("Kode OTP baru telah dikirim");
        setOtp(new Array(6).fill(""));
        inputRefs.current[0].focus();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Gagal mengirim ulang kode OTP");
    } finally {
      setLoading(false);
    }
  };

  // ============ STEP 3: Reset Password ============
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Masukkan password baru");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password tidak sama");
      return;
    }

    if (password.length < 6) {
      toast.error("Password minimal 6 karakter");
      return;
    }

    setLoading(true);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        `${backendUrl}/api/auth/reset-password`,
        { 
          email, 
          otp: otp.join(""), 
          newPassword: password 
        }
      );

      if (data.success) {
        toast.success("Password berhasil diubah!");
        setTimeout(() => {
          navigate("/auth/sign-in");
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal mengubah password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardBody className="p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Reset Password
            </Typography>
            <Typography variant="small" color="gray">
              {step === 1 && "Masukkan email Anda untuk menerima kode OTP"}
              {step === 2 && "Masukkan kode OTP yang dikirim ke email Anda"}
              {step === 3 && "Buat password baru untuk akun Anda"}
            </Typography>
          </div>

          {/* STEP 1: Email Form */}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-6">
                <Input
                  type="email"
                  size="lg"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<EnvelopeIcon className="h-5 w-5" />}
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <Spinner className="h-4 w-4 mx-auto" />
                ) : (
                  "Kirim Kode OTP"
                )}
              </Button>

              <Typography
                variant="small"
                className="mt-6 flex justify-center text-center"
              >
                Sudah ingat password?{" "}
                <Link to="/auth/sign-in">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold cursor-pointer"
                  >
                    Sign In
                  </Typography>
                </Link>
              </Typography>
            </form>
          )}

          {/* STEP 2: OTP Form */}
          {step === 2 && (
            <form onSubmit={handleOtpSubmit}>
              <div className="flex justify-center gap-2 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    onPaste={handleOtpPaste}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    disabled={loading}
                  />
                ))}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full mb-4"
                disabled={loading}
              >
                {loading ? (
                  <Spinner className="h-4 w-4 mx-auto" />
                ) : (
                  "Verifikasi OTP"
                )}
              </Button>

              <Typography variant="small" color="gray" className="text-center mb-4">
                Tidak menerima kode?{" "}
                <span
                  onClick={handleResendOtp}
                  className="text-blue-500 cursor-pointer hover:underline font-medium"
                >
                  Kirim Ulang
                </span>
              </Typography>

              <Button
                variant="outlined"
                size="sm"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => {
                  setStep(1);
                  setOtp(new Array(6).fill(""));
                }}
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Kembali
              </Button>
            </form>
          )}

          {/* STEP 3: New Password Form */}
          {step === 3 && (
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <Input
                  type="password"
                  size="lg"
                  label="Password Baru"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<LockClosedIcon className="h-5 w-5" />}
                  disabled={loading}
                />
              </div>

              <div className="mb-6">
                <Input
                  type="password"
                  size="lg"
                  label="Konfirmasi Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  icon={<LockClosedIcon className="h-5 w-5" />}
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <Spinner className="h-4 w-4 mx-auto" />
                ) : (
                  "Reset Password"
                )}
              </Button>

              <Button
                variant="outlined"
                size="sm"
                className="w-full flex items-center justify-center gap-2 mt-4"
                onClick={() => {
                  setStep(2);
                  setPassword("");
                  setConfirmPassword("");
                }}
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Kembali
              </Button>
            </form>
          )}

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 w-8 rounded-full transition-colors ${
                  s === step
                    ? "bg-blue-500"
                    : s < step
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default ResetPassword;