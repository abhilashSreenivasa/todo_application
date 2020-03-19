const express=require('express')
const router=express.Router()
const User=require('../models/register')

router.get('/',(req,res)=>{
    res.render('register')
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/',async (req,res)=>{
    
   const p1=req.body.password
   const p2=req.body.confirm_password
    if(p1!=p2){
        res.render('register',{
            name:req.body.name,
            email:req.body.email,
            errorMessage:"Passwords not matching"
        })
        
    }
    else{
     const user=new User({
         name:req.body.name,
         email:req.body.email,
         password:req.body.password
     })
     try{
         const newUser=await user.save()
         res.redirect('/login')
     }
     catch{
         res.render('register',{
             user:user,
             errorMessage:"Name should be unique"
         })
     }
    }
})


module.exports=router