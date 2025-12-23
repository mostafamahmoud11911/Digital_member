import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "../validation/validation";
import type z from "zod";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";


type RegisterType = z.infer<typeof registerSchema>

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(registerSchema) });
    const [loading, setLoading] = useState(false);

    const router = useNavigate();


    // submit handler to register user
    const onSubmit: SubmitHandler<RegisterType> = async (user) => {
        setLoading(true);
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/register`, user);
            localStorage.setItem("mid", data.user.membershipId);
            router("/");
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            toast.error(err.response?.data.message as string);
        } finally {
            setLoading(false);
        }
    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">


                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Create your membership
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm">
                        Generate your QR code in seconds
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your full name"
                            {...register("name")}
                            className={`w-full px-4 py-3 rounded-md border text-sm
            transition-all duration-200
            focus:outline-none focus:ring-2
            ${errors.name
                                    ? "border-red-500 focus:ring-red-500/40"
                                    : "border-gray-300 focus:ring-blue-500/40"
                                }
          `}
                        />

                        {errors.name && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone number
                        </label>

                        <input
                            type="tel"
                            placeholder="0542345678"
                            {...register("phone")}
                            className={`w-full px-4 py-3 rounded-md border text-sm
            transition-all duration-200
            focus:outline-none focus:ring-2
            ${errors.phone
                                    ? "border-red-500 focus:ring-red-500/40"
                                    : "border-gray-300 focus:ring-blue-500/40"
                                }
          `}
                        />

                        {errors.phone && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    <button
                        disabled={loading}
                        className={`w-full py-3 rounded-md font-medium
    bg-red-500 text-white
    flex items-center justify-center
    hover:bg-red-600
    cursor-pointer
    transition
    disabled:opacity-50 disabled:cursor-not-allowed
  `}
                    >
                        {loading ? <Loader className="animate-spin" /> : "Register"}
                    </button>
                </form>
            </div>
        </div>
    )
}
