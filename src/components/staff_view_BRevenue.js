import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';


export default function StaffViewBRevenue() {

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
        Axios.post(`http://${API_DOMAIN}:8081/api/staff_view_BRevenue`, {
            userName: localStorage.currentUser,
            password: localStorage.password,
            
        }).then(response => {
            setResultList(response.data)
        })
    }

    return (
        <div>
            <h1>Staff View Branch Monthly Revenue Page</h1>
            <div style={a_div_style}>
                <a href='/staff-home' style={a_style}>Back to Staff Home Page</a><br />
            </div>
            <label for='dateFrom'>Date From: </label>
            <textarea id='dateFrom' name='dateFrom' rows="1" cols="20"></textarea><br/>

            <label for='dateTo'>Date To: </label>
            <textarea id='dateTo' name='dateTo' rows="1" cols="20"></textarea><br/>

            <button onClick={getResultList}>Show Branch</button>
            <div>Follow this format: 2021-08-20 10:00:00</div>


            {resultList.map((val) => {
                console.log(val)

                return <div>
                    <input Value='Branch Number' readOnly></input>
                    <input value='Location' readOnly></input>
                    <input value='Monthly Revenue' readOnly></input>

                    <input value={val.branchNo} readOnly></input>
                    <input value={val.location} readOnly></input>
                    <input value={val.totalPayment} readOnly></input>

                </div>
            })}
        </div>
    )
}
