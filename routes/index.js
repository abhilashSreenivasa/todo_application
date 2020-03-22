const express=require('express')
const router=express.Router()
const Task=require('../models/task')

router.get('/',async(req,res)=>{
    try{
        const allTasks=await Task.find({})
        res.render('index',{tasks:allTasks})
    }
    catch{
        res.redirect('/')
    }
})
router.get('/index',(req,res)=>{
    res.render('index')
})

router.delete('/:id', async (req, res) => {
    let task
    try {
      task = await Task.findById(req.params.id)
   
      await task.remove()
      const allTasks=await Task.find({})
      res.render('index',{tasks:allTasks})
     
      
    } catch {
        alert('in delete catch')
        res.redirect('/')
    }
  })


router.post('/index',async(req,res)=>{
    const task=new Task({
        header:req.body.header,
        description:req.body.description
    })
    try{
        const myTask=await task.save()
        const allTasks=await Task.find({})
        res.render('index',{tasks:allTasks})

    }
    catch{
        alert('in catch')
        res.render('index',{
            errorMessage:"Something went wrong,try again!"
        })
    }


})




module.exports=router