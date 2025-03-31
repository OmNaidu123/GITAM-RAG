import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Toaster, toast } from "sonner";

const Register = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(formData);

        try {
            const response = await axios.post("http://localhost:8080/register", formData);

            if (response.status === 200) {
                toast.success("Registration successful!", { description: "Success! You can now Login", duration: 3000 });
                navigate("/login");
            }
        } catch (error) {
            if (error.response?.status === 409) {
                toast.error("Registration failed", { description: "Username already exists", duration: 3000 });
            } else if (error.response?.status === 500) {
                toast.error("Internal Server Error", { description: "Something went wrong, please try again.", duration: 3000 });
            } else {
                toast.error("Registration failed", { description: "An unknown error occurred", duration: 3000 });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#005AA7] to-[#FFFDE4] text-white">
            <Toaster richColors position="top-center" toastOptions={{ className: 'bg-gray-800 border-gray-700 shadow-lg text-white' }} />
            <Card className="w-full max-w-xl bg-gradient-to-br from-[#141E30]/50 to-[#243B55]/50 border border-gray-500 shadow-2xl rounded-xl p-8 backdrop-blur-md">
                <CardHeader className="flex flex-col space-y-5 text-center">
                    <CardTitle className="text-3xl font-extrabold tracking-tight text-center text-white">
                        Register for RAG
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-md font-semibold text-gray-300">
                                Username
                            </Label>
                            <Input
                                id="username"
                                type="text"
                                name="username"
                                placeholder="Enter Your Username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-100 rounded-md focus:ring-2 focus:ring-gray-100 focus:ring-offset-1"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-md font-medium text-gray-300">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter Your Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-md focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={loading || !formData.username || !formData.password}
                            className="w-full bg-white text-black font-bold py-5 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {loading ? "Registering..." : "Register"}
                        </Button>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;
