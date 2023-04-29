const express = require("express");
const mysql = require("mysql");
const cors = require('cors');



const app = express();

app.use(cors());

// Create Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'nodemysql'
});

// Connect
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("mysql conected...")
});



// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

// create table 
app.get('/Task1', (req, res)=>{
    let sql = 'CREATE TABLE Task1(id int AUTO_INCREMENT, make VARCHAR(255), model VARCHAR(255), year VARCHAR(255), trim VARCHAR(255), engine VARCHAR(400), status int, PRIMARY KEY (id))'; 
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Post Table Created...")
    })
});

// Insert post 1
app.get("/addpost1", (req, res)=>{
    let post = {title: "Post One", body:"This is post number one"}
    let sql =  'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Post 1 added...")
    });

})

// Get Task
app.get("/gettask", (req, res)=>{

    let sql =  'SELECT * FROM Task1';
    let query = db.query(sql, (err, results)=>{
        if(err) throw err;
        console.log(results);
        res.send(results);
    });

})


app.listen('3000', ()=>{
    console.log("server started on port 3000")
});