import axios from "axios";
import upload from "../utils/upload";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
    const [profileImage, setProfileImage] = useState(
        "https://t4.ftcdn.net/jpg/00/84/67/19/360_F_84671939_jxymoYZO8Oeacc3JRBDE8bSXBWj0ZfA9.jpg"
    );
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPassword_confirmation] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== password_confirmation) {
            toast.error("Password and Confirm Password do not match");
            return;
        }

        const user = {
            name,
            email,
            password,
            profileImage,
        };

        try {
            const res = await axios.post(`https://node-backend-zun3.onrender.com/register`, user);
            if (res.status === 201) {
                toast.success("User created successfully");
                setTimeout(() => {
                    navigate("/login", { replace: true });
                }, 1500);
            } else if (res.status === 400) {
                console.log("daskjb")
                toast.error("Something went wrong");
            } else {
                toast.error("User already exists");
            }
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong, error!");
        }
    };

    const handleFile1 = async (e) => {
        e.preventDefault();

        const files = e.target?.files;
        if (files?.length > 0) {
            const data = new FormData();
            for (const file of files) {
                data.append("file", file);
            }
            data.append("upload_preset", "fiverr");
            const url = await upload(data);
            setProfileImage(url);
        }
        toast.success("File Uploaded");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <Toaster />
            <div className="w-full max-w-md">
                <div className="text-center">
                    <h3 className="text-3xl font-bold mt-20 mb-2 text-white">Register</h3>
                </div>
                <form>
                    <label className="mx-auto flex flex-col items-center justify-center w-32 h-32 rounded-full border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <img className="rounded-full" src={profileImage} alt="" />
                        <input onChange={handleFile1} id="dropzone-file" type="file" className="hidden" />
                    </label>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-white">
                            Name
                        </label>
                        <input onChange={(e) => setName(e.target.value)} type="text" name="name" className="border border-gray-200 mt-2 w-full h-10 px-3 rounded outline-none shadow-sm" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-white">
                            Email
                        </label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" className="border border-gray-200 mt-2 w-full h-10 px-3 rounded outline-none shadow-sm" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-white">
                            Password
                        </label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" className="border border-gray-200 mt-2 w-full h-10 px-3 rounded outline-none shadow-sm" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password_confirmation" className="block text-white">
                            Confirm Password
                        </label>
                        <input onChange={(e) => setPassword_confirmation(e.target.value)} type="password" name="password_confirmation" className="border border-gray-200 mt-2 w-full h-10 px-3 rounded outline-none shadow-sm" />
                    </div>
                    <div className="mb-6">
                        <button onClick={handleSubmit} className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded">
                            Register
                        </button>
                    </div>
                    <p className="text-sm text-white text-center">
                        Already have an account?{" "}
                        <span onClick={() => navigate("/login")} className="text-blue-500 hover:text-blue-700 cursor-pointer">
                            Login
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
