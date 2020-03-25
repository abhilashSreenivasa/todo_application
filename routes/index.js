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
router.get('/index',async(req,res)=>{
    try{
        const allTasks=await Task.find({})
        res.render('index',{tasks:allTasks})
    }
    catch{
        res.redirect('/')
    }
})

router.delete('/:id', async (req, res) => {
    let task
    try {
      task = await Task.findById(req.params.id)
   
      await task.remove()
      const allTasks=await Task.find({})
      res.render('index',{tasks:allTasks})
     

    } catch {
       
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
       
        res.render('index',{
            errorMessage:"Something went wrong,try again!"
        })
    }


})
router.put('/index/edit/:id',async(req,res)=>{
    try{ 
        const editedTask=await Task.findById(req.params.id)
        editedTask.header=req.body.header
        editedTask.description=req.body.description
       
        await editedTask.save()
        const allTasks=await Task.find({})
        res.render('index',{tasks:allTasks})
    
   }
   catch{
    res.render('edit',{
        errorMessage:"Something went wrong,try again!"
    })

   }
 })

router.get('/index/edit/:id',async(req,res)=>{
    try{
        const editTask=await Task.findById(req.params.id)
        res.render('edit',{task:editTask})
        
    }
    catch{
        res.redirect('/')
    }
})



module.exports=router