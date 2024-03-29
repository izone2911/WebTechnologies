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

const Register = () => {

    const [inputs, setInputs] = useState({
		email: "",
		password: ""
	});

	const [reInputs,setReInputs] = useState({
		email: "",
		repassword: ""
	})

	const [checkConfirmPassword,setCheckConfirmPassword] = useState(true)

	const [error, setError] = useState(null);
	const navigate = useNavigate();

    const handleChange = (e) => {
		if(e.target.name !== "repassword")
        	setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() }));
		if(e.target.name !== "password")
			setReInputs((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
			setCheckConfirmPassword(inputs.password===reInputs.repassword)
            if(inputs.password===reInputs.repassword){
				console.log(inputs)
				// Cần thêm check trùng tài khoản
				await axios.post("http://localhost:4000/api/auth/register", inputs);
				console.log("Resgister success")
				navigate("/login");
			}
        } catch (err) {
			console.error("Error to register",err)
        }
    };

    return(
        <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<form class="login100-form validate-form">
					<span class="login100-form-title p-b-43">
						Sign up
					</span>
					

					<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input class="input100" type="text" name="email" placeholder="Email" onChange={handleChange}/>
						<span class="focus-input100"></span>
						<span class="label-input100"></span>
					</div>
					
					<div class="wrap-input100 validate-input" data-validate="Password is required">
						<input class="input100" type="password" name="password" placeholder="Password" onChange={handleChange}/>
						<span class="focus-input100"></span>
						<span class="label-input100"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input class="input100" type="password" name="repassword" placeholder="Confirm Password" onChange={handleChange}/>
						<span class="focus-input100"></span>
						<span class="label-input100"></span>
					</div>
					{checkConfirmPassword===true ? 
					<div class="flex-sb-m w-full p-t-3 p-b-32">
						<div class="contact100-form-checkbox">
						</div>
					</div>: 
					<div class="flex-sb-m w-full p-t-3 p-b-32">
						<div class="contact100-form-checkbox">
							Confirmation password does not match
						</div>
					</div>
					}

					<div class="container-login100-form-btn">
						<button class="login100-form-btn" onClick={handleSubmit}>
							Sign up
						</button>
					</div>
					
					<div class="text-center p-t-46 p-b-20">
						<span class="txt2">
							Really have account.
						</span>
						<Link to="/login">
							<span>
								Sign in here
							</span>
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

export default Register