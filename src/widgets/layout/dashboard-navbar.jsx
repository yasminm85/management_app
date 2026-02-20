import { useLocation, Link, useNavigate } from "react-router-dom";
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Breadcrumbs,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import {
    KeyIcon,
    UserCircleIcon,
    Bars3Icon,
} from "@heroicons/react/24/solid";
import {
    useMaterialTailwindController,
    setOpenSidenav,
} from "@/context";
import { AppContent } from "@/context/AppContext";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export function DashboardNavbar() {
    const [controller, dispatch] = useMaterialTailwindController();
    const { fixedNavbar, openSidenav } = controller;
    const { pathname } = useLocation();
    const [layout, page] = pathname.split("/").filter(Boolean);

    const { backendUrl, setIsLoggedin, setUserData, userData } =
        useContext(AppContent);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(
                backendUrl + "/api/auth/logout"
            );

            if (data.success) {
                setIsLoggedin(false);
                setUserData(false);
                navigate("/auth/sign-in");
                toast.success("Logout berhasil");
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    const sendResetOtp = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(
                backendUrl + "/api/auth/send-verify-otp");
            navigate("/auth/verify-otp");
            toast.success("Kode OTP telah dikirim ke email Anda");
        } catch (err) {
            toast.error("Gagal mengirim ulang kode OTP");
        }
    };

    return (
        <Navbar
            color={fixedNavbar ? "white" : "transparent"}
            className={`rounded-xl transition-all ${fixedNavbar
                    ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
                    : "px-0 py-1"
                }`}
            fullWidth
            blurred={fixedNavbar}
        >
            <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
                {/* Breadcrumb */}
                <div className="capitalize">
                    <Breadcrumbs
                        className={`bg-transparent p-0 ${fixedNavbar ? "mt-1" : ""
                            }`}
                    >
                        <Link to={`/dashboard/home`}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-50 hover:text-blue-500"
                            >
                                {layout}
                            </Typography>
                        </Link>
                        <Typography variant="small" color="blue-gray">
                            {page}
                        </Typography>
                    </Breadcrumbs>

                    <Typography variant="h6" color="blue-gray">
                        {page}
                    </Typography>
                </div>

                {/* Right section */}
                <div className="flex items-center gap-3">
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        className="grid xl:hidden"
                        onClick={() => setOpenSidenav(dispatch, !openSidenav)}
                    >
                        <Bars3Icon className="h-6 w-6 text-blue-gray-500" />
                    </IconButton>

                    {userData ? (
                        <Menu placement="bottom-end">
                            <MenuHandler>
                                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-gray-900 text-white cursor-pointer">
                                    {userData.name?.[0]?.toUpperCase()}
                                </div>
                            </MenuHandler>
                             
                            <MenuList className="w-48">
                                {!userData.isAccountVerified && 
                                <MenuItem
                                    onClick={sendResetOtp
                                    }
                                    className="flex items-center gap-2"
                                >
                                    <UserCircleIcon className="h-4 w-4" />
                                    Verifikasi Akun
                                </MenuItem>
                            }
                            {userData.isAccountVerified &&
                                <MenuItem
                                    onClick={() =>
                                        navigate("/auth/reset-password")
                                    }
                                    className="flex items-center gap-2"
                                >
                                    <KeyIcon className="h-4 w-4" />
                                    Reset Password
                                </MenuItem>
        }

                                <hr className="my-1" />

                                <MenuItem
                                    onClick={handleLogout}
                                    className="text-red-500"
                                >
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <Link to="/auth/sign-in">
                            <Button
                                variant="text"
                                color="blue-gray"
                                className="hidden xl:flex items-center gap-1 normal-case"
                            >
                                <UserCircleIcon className="h-5 w-5" />
                                Sign In
                            </Button>

                            <IconButton
                                variant="text"
                                color="blue-gray"
                                className="grid xl:hidden"
                            >
                                <UserCircleIcon className="h-5 w-5" />
                            </IconButton>
                        </Link>
                    )}
                </div>
            </div>
        </Navbar>
    );
}

DashboardNavbar.displayName =
    "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
