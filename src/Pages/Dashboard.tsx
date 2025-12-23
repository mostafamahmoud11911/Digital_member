import axios from "axios";
import { useEffect } from "react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router";



export default function Dashboard() {
    const navigate = useNavigate()

    // get membership id
    const mid = localStorage.getItem("mid");


    // generate link to create qr code 
    const link = mid ? `${import.meta.env.VITE_APP_URL}/#/verify/${mid}` : ""


    // check if membership id is valid if not redirect to register after 3 seconds
    useEffect(() => {
        const interval = setInterval(async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/users/status/${mid}`
            );

            if (res.data.isUsed) {
                localStorage.removeItem("mid");
                navigate("/register");
            }
        }, 3000);

        // clear interval
        return () => clearInterval(interval);
    }, [mid, navigate]);


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8 text-center flex flex-col items-center">

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Membership QR Code
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                    Present this code to be scanned
                </p>


                <div className="bg-gray-50 p-6 rounded-2xl shadow-inner mb-4">
                    <QRCode value={link} size={180} />
                </div>

                <p className="text-xs text-gray-400 mt-2">
                    Valid for one-time use only
                </p>

            </div>
        </div>


    )
}
