import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

export default function AddAppointment() {

    const a_style = {
        backgroundColor: "black",
        color: "white",
        textDecoration: "none",
        padding: "10px",
        borderRadius: "10px",
    }

    const a_div_style = {
        margin: "20px",
    }

    //React hooks
    const [date, setDate] = useState("");
    const [branchNo, setBranchNo] = useState("1");
    const [clientNo, setClientNo] = useState("");
    const [licensePlate, setLicensePlate] = useState("");
    const API_DOMAIN = process.env.API_DOMAIN || 'localhost';

    //For navigate between pages
    let navigate = useNavigate();

    //Login function
    const submitAppointment = () => {
        console.log(localStorage.clientNo);//testing
        if (date !== '' && branchNo !== '' && licensePlate !== '') {
            // Using Axios to send post request to our backend
            Axios.post(`http://${API_DOMAIN}:8081/api/add_appointment`, {
                date: date,
                branchNo: branchNo,
                clientNo: localStorage.getItem('clientNo'),
                branchNo: branchNo,
                licensePlate: licensePlate
            }).then(response => {
                console.log(response)
                window.location.reload();
            })
        }
    }
    return (
        <div>
            <div>Add Appointment page</div>
            <div style={a_div_style}>
                <a href='/guest-home' style={a_style}>Back to Guest Home Page</a><br />
            </div>
            <br></br>
            <form>
                <div class="mb-3">
                    <label for="date" class="form-label">Date</label>
                    <input onChange={(event) => { setDate(event.target.value) }} class="form-control" id="date" required />
                </div>

                <div class="mb-3">
                    <select name="location" id="location" onChange={(event) => { setBranchNo(event.target.value) }}>
                        <option value="1">wonderland road 101</option>
                        <option value="2">western road 100</option>
                        <option value="3">northwest street 201</option>
                        <option value="4">saniar201</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="licensePlate" class="form-label">License Plate</label>
                    <input onChange={(event) => { setLicensePlate(event.target.value) }} class="form-control" id="licensePlate" required />
                </div>

                <button onClick={submitAppointment} type='button' class="btn btn-primary">Submit</button>
            </form>
        </div>

    )
}