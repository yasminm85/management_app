import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, CardBody, Typography, Spinner, Button } from "@material-tailwind/react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { AppContent } from "@/context/AppContext";
import { useContext } from "react";

export function VerifyToken() {
    const navigate = useNavigate();
    const { backendUrl } = useContext(AppContent);
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [verificationStatus, setVerificationStatus] = useState("idle"); // idle, loading, success, error
    const [message, setMessage] = useState("");
    const inputRefs = useRef([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.value !== "" && index < 5) {
            inputRefs.current[index + 1].focus();
        }

        if (newOtp.every(digit => digit !== "") && index === 5) {
            verifyOtp(newOtp.join(""));
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (otp[index] === "" && index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handlePaste = (e) => {
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

        if (pastedData.length === 6) {
            verifyOtp(pastedData);
        }
    };

    const verifyOtp = async (otpCode) => {
        setVerificationStatus("loading");
        console.log("Verifying OTP:", otpCode);
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(
                `${backendUrl}/api/auth/verify-account`,
                { otp: otpCode }
            );

            if (data.success) {
                setVerificationStatus("success");
                setMessage(data.message || "Email berhasil diverifikasi!");
                toast.success("Verifikasi berhasil!");

                setTimeout(() => {
                    navigate("/auth/sign-in");
                }, 2000);
            } else {
                setVerificationStatus("error");
                setMessage(data.message || "Verifikasi gagal");
                toast.error(data.message);
                // Reset OTP
                setOtp(new Array(6).fill(""));
                inputRefs.current[0].focus();
            }
        } catch (err) {
            setVerificationStatus("error");
            setMessage(err.response?.data?.message || "Kode OTP tidak valid");
            toast.error(err.response?.data?.message || "Verifikasi gagal");
            // Reset OTP
            setOtp(new Array(6).fill(""));
            inputRefs.current[0].focus();
        }
    };

    const handleSubmit = () => {
        const otpCode = otp.join("");
        if (otpCode.length === 6) {
            verifyOtp(otpCode);
        } else {
            toast.error("Masukkan kode OTP 6 digit");
        }
    };

    const handleResendOtp = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(
                backendUrl + "/api/auth/send-verify-otp");
            toast.info("Kode OTP baru telah dikirim ke email Anda");
        } catch (err) {
            toast.error("Gagal mengirim ulang kode OTP");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardBody className="flex flex-col items-center p-8">
                    {verificationStatus === "success" ? (
                        <>
                            <CheckCircleIcon className="h-16 w-16 text-green-500" />
                            <Typography variant="h5" color="green" className="mt-6 text-center">
                                Verifikasi Berhasil!
                            </Typography>
                            <Typography variant="small" color="gray" className="mt-2 text-center">
                                {message}
                            </Typography>
                            <Typography variant="small" color="gray" className="mt-4 text-center">
                                Anda akan diarahkan ke halaman login...
                            </Typography>
                        </>
                    ) : verificationStatus === "error" ? (
                        <>
                            <XCircleIcon className="h-16 w-16 text-red-500 mb-4" />
                            <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
                                Verifikasi Email
                            </Typography>
                            <Typography variant="small" color="red" className="mb-6 text-center">
                                {message}
                            </Typography>

                            {/* OTP Input Boxes */}
                            <div className="flex gap-2 mb-6">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleChange(e.target, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onPaste={handlePaste}
                                        ref={(ref) => (inputRefs.current[index] = ref)}
                                        className="w-12 h-12 text-center text-xl font-semibold border-2 border-red-300 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                                    />
                                ))}
                            </div>

                            <Button
                                onClick={handleSubmit}
                                disabled={verificationStatus === "loading"}
                                className="w-full mb-3"
                                color="blue"
                            >
                                {verificationStatus === "loading" ? (
                                    <Spinner className="h-4 w-4 mx-auto" />
                                ) : (
                                    "Verifikasi"
                                )}
                            </Button>

                            <Typography variant="small" color="gray" className="text-center">
                                Tidak menerima kode?{" "}
                                <span
                                    onClick={handleResendOtp}
                                    className="text-blue-500 cursor-pointer hover:underline"
                                >
                                    Kirim Ulang
                                </span>
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
                                Verifikasi Email
                            </Typography>
                            <Typography variant="small" color="gray" className="mb-6 text-center">
                                Masukkan kode 6 digit yang dikirim ke email Anda
                            </Typography>

                            {/* OTP Input Boxes */}
                            <div className="flex gap-2 mb-6">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleChange(e.target, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onPaste={handlePaste}
                                        ref={(ref) => (inputRefs.current[index] = ref)}
                                        className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                                        disabled={verificationStatus === "loading"}
                                    />
                                ))}
                            </div>

                            <Button
                                onClick={handleSubmit}
                                disabled={verificationStatus === "loading"}
                                className="w-full mb-3"
                                color="blue"
                            >
                                {verificationStatus === "loading" ? (
                                    <Spinner className="h-4 w-4 mx-auto" />
                                ) : (
                                    "Verifikasi"
                                )}
                            </Button>

                            <Typography variant="small" color="gray" className="text-center">
                                Tidak menerima kode?{" "}
                                <span
                                    onClick={handleResendOtp}
                                    className="text-blue-500 cursor-pointer hover:underline"
                                >
                                    Kirim Ulang
                                </span>
                            </Typography>
                        </>
                    )}
                </CardBody>
            </Card>
        </div>
    );
}

export default VerifyToken;