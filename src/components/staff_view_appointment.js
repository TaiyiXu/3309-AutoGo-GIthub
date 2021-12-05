import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

export default function StaffViewAppointment() {

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

    const API_DOMAIN = process.env.API_DOMAIN || 'localhost';
    const [resultList, setResultList] = useState([]);

    const getResultList = () => {
        console.log(localStorage.currentUser);
        Axios.post(`http://${API_DOMAIN}:8081/api/staff_view_appointment`, {
            userName: localStorage.currentUser,
            password: localStorage.password
        }).then(response => {
            setResultList(response.data)
        })
    }

    return (
        <div>
            <h1>Staff View Appointment Page</h1>
            <div style={a_div_style}>
                <a href='/staff-home' style={a_style}>Back to Staff Home Page</a><br />
            </div>
            <button onClick={getResultList}>Show Appointments</button>
            <br></br>
            <input value='AppointmentNo' readOnly></input>
            <input value='Service Type'readOnly></input>
            <input value='Service Description' readOnly></input>
            <input value='Date' readOnly></input>
            <input value='License Plate'readOnly></input>
            <br></br>
            {resultList.map((val) => {
                return <div>
                        <input value={val.appointmentNo} readOnly></input>
                        <input value={val.serviceType} readOnly></input>
                        <input value={val.serviceDescription} readOnly></input>
                        <input value={val.date} readOnly></input>
                        <input value={val.licensePlate} readOnly></input>
                </div>
            })}
        </div>
    )
}