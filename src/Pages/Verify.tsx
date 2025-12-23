import axios, { AxiosError } from "axios";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";

export default function Verify() {
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    // get membership id
    const { id } = useParams();


    // verify membership id
    useEffect(() => {
        if (!id) return;

        const verifyMid = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/users/verify/${id}`
                );

                setStatus(data.valid ? "success" : "error");
                localStorage.removeItem("mid");
            } catch (error) {
                setStatus("error");
                const err = error as AxiosError<{ message: string }>;
                toast.error(err.response?.data.message as string);
            }
        };

        verifyMid();
    }, [id]);

    return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-sm w-full text-center">

    {status === "loading" && (
      <p className="text-gray-500 text-lg font-medium animate-pulse">
        Verifying...
      </p>
    )}

    {status === "success" && (
      <>
        <CheckCircleIcon className="text-green-600 w-20 h-20 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          Verified Successfully
        </h2>
        <p className="text-gray-500 text-sm">
          This QR code is valid and active.
        </p>
      </>
    )}

    {status === "error" && (
      <>
        <XCircleIcon className="text-red-600 w-20 h-20 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Invalid QR Code
        </h2>
        <p className="text-gray-500 text-sm">
          This QR code is not valid or has already been used.
        </p>
      </>
    )}

  </div>
</div>

    );
}
