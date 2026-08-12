import React, { useState } from 'react';
import '../CSS/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8080/user/login",
                null,
                {
                    params: {
                        email: email,
                        password: password
                    }
                }
            );
            
            console.log("Login response:", response.data);
            
            // Save the user data to localStorage
            localStorage.setItem("user", JSON.stringify({
              id: response.data.id,
              role: response.data.role,
              user: response.data
            }));

            // Dispatch custom 'auth-change' event so Header updates instantly without refreshing!
            window.dispatchEvent(new CustomEvent("auth-change"));

            alert("Login Successfully...");

            if (response.data.role === "Admin") {
                navigate("/admindashboard");
            } else {
                navigate("/userdashboard");
            }

        } catch (error) {
            console.error("Login Error:", error);
            if (error.response) {
                alert(error.response.data);
            } else {
                alert("Server Error");
            }
        }
    };

    return (
        <>
            <div className="login-page">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-7 col-sm-10">
                            <div className="login-card">

                                <h2 className="logo">
                                    <span className="medi">Medi</span>
                                    <span className="shop">Shop</span>
                                </h2>

                                <h3>Welcome Back 👋</h3>

                                <p className="subtitle">
                                    Login to continue shopping.
                                </p>

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setemail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setpassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="text-end">
                                        <Link to="/forgot" className="forgot">
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    <button type="submit" className="btn login-btn mt-4">
                                        Login
                                    </button>

                                </form>

                                <div className="register">
                                    Don't have an account?{" "}
                                    <Link to="/register">
                                        Register
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;