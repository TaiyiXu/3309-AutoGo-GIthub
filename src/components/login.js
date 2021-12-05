import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

export default function Login() {
    //React hooks
    const [currentUser, setCurrentUser] = useState("");
    const [password, setPassword] = useState("");
    const [authKey, setAuthKey] = useState("Not authorized");//what's this for?
    const API_DOMAIN = process.env.API_DOMAIN || 'localhost';

    //For navigate between pages
    let navigate = useNavigate();

    //Login function
    const staffLogin = () => {
        if (currentUser !== "" && password !== '') {
            // Using Axios to send post request to our backend
            Axios.post(`http://${API_DOMAIN}:8081/api/staff_login`, {
                loginType: 'staff',
                usr: currentUser,
                pwd: password
            }).then(response => {
                setAuthKey(response.data)
                if (currentUser !== "" && response.data !== "") {
                    localStorage.setItem("currentUser", currentUser)
                    localStorage.setItem("password", password)
                    navigate('/staff-home')
                    window.location.reload();
                } else {
                    alert(authKey);
                }
            })
        }
    }

    const guestLogin = () => {

        if (currentUser !== "" && password !== '') {
            // Using Axios to send post request to our backend
            Axios.post(`http://${API_DOMAIN}:8081/api/guest_login`, {
                loginType: 'guest',
                usr: currentUser,
                pwd: password
            }).then(response => {
                setAuthKey(response.data)
                if (currentUser !== "" && response.data !== '') {
                    localStorage.setItem("currentUser", currentUser)
                    localStorage.setItem("password", password)
                    localStorage.setItem('clientNo', response.data[0].clientNo)
                    navigate('/guest-home')
                    window.location.reload();
                } else {
                    alert(authKey);
                }
            })
        }
    }

    return (

        <div class="row align-items-center">

            <div class="col">
                <form class="form-horizontal" >
                    <div class="form-floating mb-3">
                        <input onChange={(event) => { setCurrentUser(event.target.value) }} name="inputUserName" type="text" class="form-control" id="inputUserNameStaff"
                            placeholder="User name" required />
                        <label for="inputUserName" class="form-label">User Name</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input onChange={(event) => { setPassword(event.target.value) }} name="inputPassword" type="password" class="form-control" id="inputPasswordStaff"
                            placeholder="Password" required />
                        <label for="inputPassword" class="form-label">Password</label>
                    </div>
                    <div class="position-relative">
                        <div class="position-absolute top-0 end-0">
                            <button onClick={staffLogin} id='staff-login-btn' class="btn btn-dark" type="button">Log In As Staff</button>
                        </div>
                    </div>
                </form>
            </div>

            <div class="col">
                <form class="form-horizontal" >
                    <div class="form-floating mb-3">
                        <input onChange={(event) => { setCurrentUser(event.target.value) }} name="inputUserName" type="text" class="form-control" id="inputUserNameGuest"
                            placeholder="User name" required />
                        <label for="inputUserName" class="form-label">User Name</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input onChange={(event) => { setPassword(event.target.value) }} name="inputPassword" type="password" class="form-control" id="inputPasswordGuest"
                            placeholder="Password" required />
                        <label for="inputPassword" class="form-label">Password</label>
                    </div>
                    <div class="position-relative">
                        <div class="position-absolute top-0 end-0">
                            <button onClick={guestLogin} id='guest-login-btn' class="btn btn-dark" type="button">Log In As Guest</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}