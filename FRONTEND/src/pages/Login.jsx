import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useOutletContext } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const { setUserdata } = useOutletContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = e.target;
        const user = { email: email.value, password: password.value };

        try {
            const res = await axios.post(`http://localhost:3000/login`, user);
            if (res.status === 200 && res.data) {
                // console.log("User ID:", res.data._id);
                localStorage.setItem("user", JSON.stringify(res.data));
                setUserdata(res.data); // Set the userdata state in the parent component
                toast.success('Logged in successfully');
                navigate('/');
            } else {
                toast.error('User does not exist');
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 400) {
                toast.error('Invalid credentials');
            } else {
                console.log(error);
                toast.error('Something went wrong, please try again!');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <Toaster />
            <div className="w-full max-w-md">
                <div className="text-center">
                    <h3 className="text-3xl font-bold text-white">Login</h3>
                </div>
                <form onSubmit={handleSubmit} className="mt-8">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-white">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="border border-gray-200 mt-2 w-full h-10 px-3 rounded outline-none shadow-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-white">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="border border-gray-200 mt-2 w-full h-10 px-3 rounded outline-none shadow-sm"
                        />
                    </div>

                    <div className="mb-6">
                        <button

                            type="submit"
                            className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded"
                        >
                            Login
                        </button>
                    </div>
                    <p className="text-sm text-white text-center">
                        Don't have an account? <a href="/register" className="text-blue-500 hover:text-blue-700">Register</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;

