import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";

const center_div = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
}

const formStyle = {
    minWidth : '300px'
}

const Show = () => {
    const [addressLineOne,setaddressLineOne] = useState("");
    const [addressLineTwo,setAddressLineTwo] = useState("");
    const [city,setcity] = useState("");
    const [zip,setzip] = useState("");
    const url = window.location.href;
    const splitUrl = url.split("/")
    const id = splitUrl[splitUrl.length-1];
    const { user } = useAuth0();

    const handleSubmit = () => {
        axios.post('http://localhost:4000/edit',{
            vendorid : id,
            userEmail : user.email,
            addressLineOne : addressLineOne,
            addressLineTwo : addressLineTwo,
            city : city,
            zip : zip
        }).then(response=>{
            alert("Edited");
        }).catch(err=>{
            alert("Error in editing");
            console.log(err);
        });
    }

    return (
        <div style={center_div} >
            <h3 style={{marginLeft : "22%"}}>Add a Vendor</h3>
            <form onSubmit={handleSubmit}>
                <input placeholder="addressLineOne" style={formStyle} onChange={(e)=>{setaddressLineOne(e.target.value)}}></input><br/><br/>
                <input placeholder="addressLineTwo" style={formStyle} onChange={(e)=>{setAddressLineTwo(e.target.value)}}></input><br/><br/>
                <input placeholder="City" style={formStyle} onChange={(e)=>{setcity(e.target.value)}}></input><br/><br/>
                <input placeholder="Zip Code" style={formStyle} onChange={(e)=>{setzip(e.target.value)}}></input><br/><br/>
                <button style={{minWidth : "90px",marginLeft : "33%"}}>Submit</button>
            </form>
        </div>
    )
}

function Edit() {
    const { isAuthenticated } = useAuth0();
    return (
        <>
            <Navbar/>
            {
                isAuthenticated ? <Show/> : <p>Please lgoin in firs</p>
            }
        </>
    )
}

export default Edit;