import express from 'express';
//const express=require('express');

const app=express();

app.listen(2000,()=>{
    console.log("lavada denginaav le");
});

app.get('/',(req,res)=>{
    res.send("I am ready ..Lets rock");
})

