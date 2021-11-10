const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql");

const app = express();
const PORT = process.env.PORT || 4000;



const pool = mysql.createPool({
    connectionLimit :10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'dog_breeds'
})


app.get('/',(req,res)=>{
    res.send("Connected");
})

app.get('/breeds',(req,res)=>{
    pool.getConnection((err,conection)=>{
        if(err) throw err;
        console.log("conected");

        conection.query('SELECT * from breeds',(err,rows)=>{
            conection.release();

            if(!err)
                res.send(rows);
            else
                console.log(err);

        })
    })

})


app.get('/breeds/:id',(req,res)=>{

    pool.getConnection((err,conection)=>{
        if(err) throw err;
        console.log("conected");

        conection.query('SELECT * from breeds WHERE id = ?',[req.params.id],(err,rows)=>{
            conection.release();

            if(!err)
                res.send(rows);
            else
                console.log(err);

        })
    })
})

app.get('/random',(req,res)=>{

    pool.getConnection((err,conection)=>{
        if(err) throw err;
        
        let random_id = Math.floor(Math.random()*3+1);
        console.log("conected");

        conection.query('SELECT * from breeds WHERE id = ?',[random_id],(err,rows)=>{
            conection.release();

            if(!err)
                res.send(rows);
            else
                console.log(err);

        })
    })

})


app.listen(PORT);