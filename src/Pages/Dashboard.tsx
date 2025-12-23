import axios from "axios";
import { useEffect } from "react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router";



export default function Dashboard() {
    const navigate = useNavigate()

    // get membership id
    const user = JSON.parse(localStorage.getItem("user") as string);


    // generate link to create qr code 
    const link = user ? `${import.meta.env.VITE_APP_URL}/#/verify/${user?.membershipId as string}` : ""


    // check if membership id is valid if not redirect to register after 3 seconds
    useEffect(() => {
        const interval = setInterval(async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/users/status/${user.membershipId}`
            );

            if (res.data.isUsed) {
                localStorage.removeItem("user");
                navigate("/register");
            }
        }, 3000);

        // clear interval
        return () => clearInterval(interval);
    }, [navigate, user.membershipId]);


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8 text-center flex flex-col items-center">

                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Membership QR Code
                </h2>

                <p className="text-gray-500 text-sm mb-6">
                    Present this code to be scanned
                </p>

                {/* QR */}
                <div className="bg-gray-50 p-6 rounded-2xl shadow-inner mb-2">
                    <QRCode value={link} size={180} />
                </div>

                {/* User Info */}
                <div className="w-full bg-gray-50 rounded-xl p-4 text-left space-y-2">
                    <p className="text-xl text-center font-semibold text-gray-800">
                        {user.name}
                    </p>

                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Created</span>
                        <span>{new Date(user.createdAt).toLocaleString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                        })}</span>
                    </div>

                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Expires</span>
                        <span>{new Date(user.expiryDate).toLocaleString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                        })}</span>
                    </div>
                </div>

                <p className="text-xs text-gray-400 mt-4">
                    Valid for one-time use only
                </p>

            </div>
        </div>


    )
}
