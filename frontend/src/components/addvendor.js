import { useState } from "react";
import Navbar from "./Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

const center_div = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
}

const formStyle = {
    minWidth : '300px'
}

const ShowForm = () => {
    const [vendorName,setVendorName] = useState("");
    const [bankAcntNo,setbankAcntNo] = useState("");
    const [bankname,setbankname] = useState("");
    const [addressLineOne,setaddressLineOne] = useState("");
    const [addressLineTwo,setAddressLineTwo] = useState("");
    const [city,setcity] = useState("");
    const [country,setcountry] = useState("");
    const [zip,setzip] = useState("");
    
    const { user } = useAuth0();
    const handleSubmit = (e) => {
        let values = {
            userFirstName : user.given_name,
            userLastName : user.family_name,
            userEmail : user.email,
            vendorName : vendorName,
            bankAcntNo : bankAcntNo,
            bankname : bankname,
            addressLineOne : addressLineOne,
            addressLineTwo : addressLineTwo,
            city : city,
            country : country,
            zip : zip
        }
        axios.post("http://localhost:4000/addvendor",values).then(res=>{
            if(res['data']=='OK'){
                alert("Vendor Added...");
            }else{
                alert("Sorry Try Again...")
            }
        }).catch(err=>{
            alert("Server Error Try again Later");
        })
        e.preventDefault();
    }
    return (
        <div style={center_div} >
            <h3 style={{marginLeft : "22%"}}>Add a Vendor</h3>
            <form onSubmit={handleSubmit}>
                <input placeholder="Vendor Name" type="text"style={formStyle} onChange={(e)=>{setVendorName(e.target.value)}}></input><br/><br/>
                <input placeholder="Bank Account No." style={formStyle} onChange={(e)=>{setbankAcntNo(e.target.value)}}></input><br/><br/>
                <input placeholder="Bank Name" style={formStyle} onChange={(e)=>{setbankname(e.target.value)}}></input><br/><br/>
                <input placeholder="addressLineOne" style={formStyle} onChange={(e)=>{setaddressLineOne(e.target.value)}}></input><br/><br/>
                <input placeholder="addressLineTwo" style={formStyle} onChange={(e)=>{setAddressLineTwo(e.target.value)}}></input><br/><br/>
                <input placeholder="City" style={formStyle} onChange={(e)=>{setcity(e.target.value)}}></input><br/><br/>
                <input placeholder="Country" style={formStyle} onChange={(e)=>{setcountry(e.target.value)}}></input><br/><br/>
                <input placeholder="Zip Code" style={formStyle} onChange={(e)=>{setzip(e.target.value)}}></input><br/><br/>
                <button style={{minWidth : "90px",marginLeft : "33%"}}>Submit</button>
            </form>
        </div>
    );
}

function AddVendor() {
    const { isAuthenticated } = useAuth0();
    return (
        <div>
            <Navbar />
            {
                !isAuthenticated ? <h2 style={center_div}>Please Login First</h2> : <ShowForm/>
            }
        </div>
    );
}

export default AddVendor;