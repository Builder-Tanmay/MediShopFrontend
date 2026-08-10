import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../CSS/Register.css";

const Register = () => {

    const [fullName, setfullName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [contact, setcontact] = useState("");
    const [gender, setgender] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        const user = {
            fullName: fullName,
            email: email,
            password: password,
            contact: contact,
            gender: gender,
            role: "USER",
            active: true
        };

        try {

            const response = await axios.post(
                "http://localhost:8080/user/add",
                user
            );

            alert('Registered Successfully!!');

            setfullName("");
            setemail("");
            setpassword("");
            setcontact("");
            setgender("");

        } catch (error) {

            console.log(error);

            if (error.response) {
                alert(error.response.data);
            }

        }

    };

    return (

        <div className="register-page">

            <div className="container">

                <div className="row justify-content-center align-items-center min-vh-100">

                    <div className="col-lg-6 col-md-8 col-sm-10">

                        <div className="register-card">

                            <div className="text-center mb-4">

                                <h2 className="logo">
                                    <span className="medi">Medi</span>
                                    <span className="shop">Shop</span>
                                </h2>

                                <h3>Create Account</h3>

                                <p className="subtitle">
                                    Join MediShop and start shopping with confidence.
                                </p>

                            </div>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your full name"
                                        value={fullName}
                                        onChange={(e) => setfullName(e.target.value)}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                        required
                                    />

                                </div>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Password
                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setpassword(e.target.value)}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Contact
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Mobile Number"
                                            value={contact}
                                            onChange={(e) => setcontact(e.target.value)}
                                            required
                                        />

                                    </div>

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">
                                        Gender
                                    </label>

                                    <select
                                        className="form-select"
                                        value={gender}
                                        onChange={(e) => setgender(e.target.value)}
                                        required
                                    >
                                        <option value="">
                                            Select Gender
                                        </option>

                                        <option value="Male">
                                            Male
                                        </option>

                                        <option value="Female">
                                            Female
                                        </option>

                                        <option value="Other">
                                            Other
                                        </option>

                                    </select>

                                </div>

                                <button
                                    type="submit"
                                    className="btn register-btn"
                                >
                                    Create Account
                                </button>

                            </form>

                            <div className="login-link">

                                Already have an account?

                                <Link to="/login">
                                    Login
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Register;