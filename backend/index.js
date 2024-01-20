const express = require('express'); 
const mysql = require('mysql');
const app = express(); 
require('dotenv').config()
const PORT = process.env.PORT;
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin : "*"
}));

const connection = mysql.createPool({
	connectionLimit: 10,
	host: process.env.MYSQL_HOST || 'localhost',
	user: process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
});

app.get('/',(req,res)=>{
    connection.query('SHOW TABLES;',(err,response)=>{
        if(err) throw err;
        res.json(response);
    });
});

app.post('/addvendor',(req,res)=>{
    let data = req.body;
    const userFirstName = data.userFirstName;
    const userLastName = data.userLastName;
    const userEmail = data.userEmail;
    const vendorName = data.vendorName;
    const bankAcntNo = data.bankAcntNo;
    const bankname = data.bankname;
    const addressLineOne = data.addressLineOne;
    const addressLineTwo = data.addressLineTwo;
    const city = data.city;
    const country = data.country;
    const zip = data.zip;

    connection.query(`SELECT * FROM user WHERE userEmail="${userEmail}";`,(err,result)=>{
        if(err) throw err;
        if(result.length==0) {
            connection.query(`INSERT INTO user(userName,userLastName,userEmail) VALUES("${userFirstName}","${userLastName}","${userEmail}")`,(error,resultResponse)=>{
                if(error) throw error;
                // console.log(resultResponse);
            })
        }
        connection.query(`SELECT userid FROM user WHERE userEmail="${userEmail}"`,(errId,responseId)=>{
            if(errId) throw errId;
            let id = responseId[0]['userid'];
            connection.query(`INSERT INTO vendors(userid,vendorName,bankAcntNo,bankName,addressLineOne,addressLineTwo,city,country,zipCode) VALUES("${id}","${vendorName}","${bankAcntNo}","${bankname}","${addressLineOne}","${addressLineTwo}","${city}","${country}","${zip}");`,(errInsertion,responseInsertion)=>{
                if(errInsertion) res.status(500).send("NOTOK");
                res.status(200).send('OK');
            });
        });
    })
    // res.status(200).send('OK');
});

app.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`);
})