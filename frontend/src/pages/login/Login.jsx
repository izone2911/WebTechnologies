import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import Tilt from "react-parallax-tilt";
import axios from "axios"
import { AuthContext } from "../../context/authContext";

import './dependencies/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './dependencies/vendor/animate/animate.css';
import './dependencies/vendor/css-hamburgers/hamburgers.min.css';
import './dependencies/vendor/select2/select2.min.css';
import './dependencies/css/util.css';
import './dependencies/css/main.css';
import './styleDiv.css'

const Login = () => {

    const [inputs, setInputs] = useState({
		email: "",
		password: ""
	});
	const [error, setError] = useState(null);
	const [errLogin, setErrLogin] = useState(false)
	const { login } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleChange = (e) => {
		setInputs((prevInputs) => ({
		...prevInputs,
		[e.target.name]: e.target.value,
		}));
	}

    const handleSubmit = async (e) => {
		e.preventDefault();

		if (!inputs.email || !inputs.password) {
			setError("Vui lòng nhập tên người dùng và mật khẩu");
			console.log(error)
			return;
		}
		try {
			console.log(inputs)
			const res = await axios.post("http://localhost:4000/api/auth/login", inputs);
			console.log(res.data)
			if(res.data[0].email!==inputs.email || res.data[0].password!==inputs.password){
				setErrLogin(true)
				return
			} else {
				login(inputs)
				navigate("/courses")
			}
		} catch (err) {
			console.error("Login failed",err)
		}
	}

    return(
        <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<form class="login100-form validate-form">
					<span class="login100-form-title p-b-43">
						Sign in
					</span>
					
					
					<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input class="input100" type="text" name="email" onChange={handleChange} placeholder="Email"/>
						<span class="focus-input100"></span>
						<span class="label-input100"></span>
					</div>
					
					
					<div class="wrap-input100 validate-input" data-validate="Password is required">
						<input class="input100" type="password" name="password" onChange={handleChange} placeholder="Password"/>
						<span class="focus-input100"></span>
						<span class="label-input100"></span>
					</div>

					<div class="flex-sb-m w-full p-t-3 p-b-32">
						{errLogin?
						<div class="contact100-form-checkbox">
							Account or password is incorrect
						</div>:
						<div class="contact100-form-checkbox">
						</div>
						}
						

						<div>
							<a href="#" class="txt1">
								Forgot Password?
							</a>
						</div>
					</div>
			

					<div class="container-login100-form-btn">
						<button class="login100-form-btn" onClick={handleSubmit}>
							Sign in
						</button>
					</div>
					
					<div class="text-center p-t-46 p-b-20">
						<span class="txt2">
							Don't have account?
						</span>
						<Link to="/register">
							<span>Sign up here</span>
						</Link>
						
					</div>

					<div class="login100-form-social flex-c-m">
					</div>
				</form>

				<div class="login100-more"></div>
			</div>
		</div>
	</div>
    )
}

export default Login

