import React, { useState } from "react";
import Axios from 'axios';

export default function GuestViewAppointment() {

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

    const [appointmentNo, setAppointmentNo] = useState("");
    const [resultList, setResultList] = useState([]);
    const [receiptList, setReceiptList] = useState([]);

    const API_DOMAIN = process.env.API_DOMAIN || 'localhost';

    const getResultList = () => {
        console.log(localStorage.currentUser);
        console.log(localStorage.password);
        Axios.post(`http://${API_DOMAIN}:8081/api/guest_view_appointment`, {
            userName: localStorage.currentUser,
            password: localStorage.password
        }).then(response => {
            console.log(response.data);
            setResultList(response.data)
        })
    }

    const viewReceipt = () => {
            // Using Axios to send post request to our backend
            Axios.post(`http://${API_DOMAIN}:8081/api/guest_view_receipt`, {
                appointmentNo: appointmentNo
            }).then(response => {
                console.log(response.data);
                setReceiptList(response.data);
            })
    }

    return (
        <div>
            <h1>Guest View Appointment Page</h1>
            <div style={a_div_style}>
                <a href='/guest-home' style={a_style}>Back to Guest Home Page</a><br />
            </div>
            <br></br>
            <button onClick={getResultList}>Show Appointments</button>
            <br></br>
            <input value='AppointmentNo' readOnly></input>
            <input value='Service Type' readOnly></input>
            <input value='Service Description' readOnly></input>
            <input value='Date' readOnly></input>
            <input value='Location' readOnly></input>
            <br></br>
            {resultList.map((val) => {
                return <div>
                    <input value={val.appointmentNo} readOnly></input>
                    <input value={val.serviceType} readOnly></input>
                    <input value={val.serviceDescription} readOnly></input>
                    <input value={val.date} readOnly></input>
                    <input value={val.location} readOnly></input>
                </div>
            })}
            <br></br>
            <input onChange={(event) => { setAppointmentNo(event.target.value) }} name='appointmentNoInput' placeholder="Type in the appointment number to view the payment"></input>
            <button onClick={viewReceipt}>View Receipt</button>
            <br></br>
            <input value='AppointmentNo' readOnly></input>
            <input value='Client' readOnly></input>
            <input value='Date' readOnly></input>
            <input value='Location' readOnly></input>
            <input value='Price' readOnly></input>
            <br></br>
            {receiptList.map((val) => {
                console.log(val)

                return <div>
                    <input value={val.appointmentNo} readOnly></input>
                    <input value={val.clientName} readOnly></input>
                    <input value={val.date} readOnly></input>
                    <input value={val.location} readOnly></input>
                    <input value={val.totalPayment} readOnly></input>
                </div>
            })}


        </div>
    )
}