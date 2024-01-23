import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import '../formstyle.css';

const center_div = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
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
    const [_addressLineOne,_setaddressLineOne] = useState("");
    const [_addressLineTwo,_setaddressLineTwo] = useState("");
    const [_city,_setcity] = useState("");
    const [_zipCode,_setzipcode] = useState("");
    const [_vendorName,_setvendorName] = useState("");

    const handleSubmit = () => {
        axios.post('http://localhost:4000/edit',{
            vendorid : id,
            userEmail : user.email,
            addressLineOne : addressLineOne,
            addressLineTwo : addressLineTwo,
            city : city,
            zip : zip,
        }).then(response=>{
            alert("Edited");
        }).catch(err=>{
            alert("Error in editing");
            console.log(err);
        });
    }

    useEffect(()=>{
        axios.post('http://localhost:4000/vendorDetail',{
            id : id
        }).then(response=>{
            response = response['data'] 
            // console.log(_addressLineOne);
            console.log(response);
            _setaddressLineOne(response['addressLineOne']);
            _setaddressLineTwo(response['addressLineTwo']);
            _setcity(response['city']);
            _setzipcode(response['zipCode']);
            _setvendorName(response['vendorName'])
        }).catch(err=>{
            console.log(err);
        })
    })

    return (
        <div style={center_div} >
            <h3 style={{textAlign : "center"}}>Edit Vendor {_vendorName}</h3>
            <form onSubmit={handleSubmit} >
                <label>Address Line One <input defaultValue={_addressLineOne} onChange={(e)=>{setaddressLineOne(e.target.value)}}></input><br/><br/></label>
                <label>Address Line Two <input defaultValue={_addressLineTwo}   onChange={(e)=>{setAddressLineTwo(e.target.value)}}></input><br/><br/></label>
                <label>City <input defaultValue={_city} style={{marginRight : "0px"}}  onChange={(e)=>{setcity(e.target.value)}}></input><br/><br/></label>
                <label>Zip Code <input defaultValue={_zipCode}   onChange={(e)=>{setzip(e.target.value)}}></input><br/><br/></label>
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