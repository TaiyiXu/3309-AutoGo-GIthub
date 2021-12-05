import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

export default function StaffHome() {

    const a_style ={
        backgroundColor: "black",
        color:"white",
        textDecoration: "none",
        padding: "10px",
        borderRadius: "10px",
    }

    const a_div_style={
        margin:"20px",
    }
    
    return (
        <div>StaffHome page<br/>
            <div style={a_div_style}>
                <a href='/staff-view-appointment' style={a_style}>view my appointments</a>
            </div>
            <div style={a_div_style}>
                <a href='' style={a_style}>my profile</a>
            </div>
            <div style={a_div_style}>
                <a href='/staff-view-BRevenue' style={a_style}>View Branch Reveneue</a>
            </div>
        </div>
    )

}