const express=require('express')
const router=express.Router()

router.get('/',(req,res)=>{
    res.render('login')
})
router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/login',(req,res)=>{
    res.render('home',{name:req.body.name});
})




module.exports=router