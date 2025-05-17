import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Toaster, toast } from "sonner";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const username = formData.username;
        localStorage.setItem("username", username);  
        console.log( formData);
        try {
            const response = await axios.post("http://localhost:8080/login", formData);
            const token = response.data;
    
            if (response.status === 200) {
                localStorage.setItem("authToken", token);  

                toast.success("Login successful!", { description: "Welcome back!", duration: 3000 });
                console.log("Token stored:", token);
                setTimeout(() => navigate("/dashboard"), 2000);

            } else {
                throw new Error("Token not received");
            }
        } catch (error) {
            toast.error("Login failed", { description: "Invalid credentials, Due to wrong password or Invalid user", duration: 3000 });
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
                        Welcome Back To RAG
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
                            disabled={loading}
                            className="w-full bg-white text-black font-bold py-5 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
                        >

                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;