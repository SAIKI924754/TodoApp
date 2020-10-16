const express= require("express");
const router= express.Router();
//const fun ="amazing"

router.get('/register',(req,res,next)=>{
    res.send("REGISTER");
});

router.get('/authenticate',(req,res,next)=>{
    res.send("AUTENTICATE");
});

router.get('/profile',(req,res,next)=>{
    res.send("PROFILE");
});

router.get('/validate',(req,res,next)=>{
    res.send("VALIDATE");
});

//module.exports = { fun: fun, router : router};

module.exports = router;
//export default router;

