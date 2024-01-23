import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Navbar from './Navbar';
import '../App.css'
import axios from 'axios';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";

const center_div = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
}

function Items({ currentItems,setitems }) {
    const navigate = useNavigate();
    const handleDelete = (vendorId) => {
        axios.post('http://localhost:4000/delete', {
          vendorid: vendorId
        })
        .then(response => {
          setitems(prevItems => prevItems.filter(item => item.vendorid !== vendorId));
        })
        .catch(err => {

        });
      };
      
    return (
        <>
            {currentItems &&
                currentItems.map((item,key) => (
                        <Paper elevation={3} sx={{ margin: "2vh 2vw", padding: "2vh 2vw" }}>
                            <table >
                                <tr style={{ border: "1px solid black" }}>
                                    <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>Vendor Name</th>
                                    <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>Bank Account No.</th>
                                    <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>Bank Name</th>
                                    <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>Address Line One</th>
                                    <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>Address Line Two</th>
                                    <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>Country</th>
                                    <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>City</th>
                                    <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>Zip</th>
                                    <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>Edit</th>
                                    <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>Delete</th>
                                </tr>
                                <tr style={{ border: "1px solid black" }}>
                                    <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>{item.vendorName}</td>
                                    <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>{item.bankAcntNo}</td>
                                    <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>{item.bankName}</td>
                                    <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>{item.addressLineOne}</td>
                                    <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>{item.addressLineTwo}</td>
                                    <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>{item.city}</td>
                                    <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>{item.country}</td>
                                    <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>{item.zipCode}</td>
                                    <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>
                                        <button className='btn btn-outline-primary' onClick={() => {
                                            navigate(`/vendors/${item.vendorid}`);
                                        }}>Edit</button>
                                    </td>
                                    <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>
                                        <button className='btn btn-outline-danger' onClick={() => {
                                            handleDelete(item.vendorid)
                                        }}>Delete</button>
                                    </td>
                                </tr>
                            </table>
                            
                        </Paper>
                ))}
        </>
    );
}

function PaginatedItems({ itemsPerPage }) {
    
    const [itemOffset, setItemOffset] = useState(0);

    const [items,setitems] = useState([]);
    const {isAuthenticated,user} = useAuth0();
    
    useEffect(()=>{
        isAuthenticated && axios.post('http://localhost:4000/getvendors',{
            email : user.email,
            userName : user.given_name,
            userLastName : user.family_name
        }).then(response=>{
            setitems(response['data']);
        }).catch(err=>{
            alert("got error");
        })
    // eslint-disable-next-line
    },[isAuthenticated,items]);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    if(items.length==0) {
        return (
            <div style={center_div}>
                No records found
            </div>
        )
    }

    return (
        <>
            <Items currentItems={currentItems} setItems={setitems}/>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName='pagination'
                pageLinkClassName='page-num'
                previousLinkClassName='page-num'
                nextLinkClassName='page-num'
                activeLinkClassName='active'
            />
        </>
    );
}

const Show = () => {
    return (
        <div id='container' className="App">
            <PaginatedItems itemsPerPage={2} containerClassName={"pagination-container"} activeClassName={"active-page"} />
        </div>
    );
}

function Vendors() {
    const { isAuthenticated } = useAuth0();

    return (
        <div>
            <Navbar />
            {
                isAuthenticated ? <Show /> : <h2 style={center_div}>Please Login First</h2>
            }
        </div>
    )
}
export default Vendors;