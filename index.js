const express = require("express")
const db = require("./db/index.js")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", (req,res)=>{
    res.json({info:"initial routes"})
})

app.get("/students",db.students.getAll)
app.delete("/students",db.students.delByName)
app.post("/students",db.students.create)
app.put("/students",db.students.update)
app.put("/student",db.students.updateOne)

app.get("/classes",db.classes.getAll)
app.post("/classes",db.classes.create)
app.get("/class",db.classes.getByName)
app.put("/classes",db.classes.updateOne)
app.delete("/classes", db.classes.delByName)

app.listen(8080,err=>{
    if(err){
        console.log(err)
    }else{
        console.log("8080 port listen ...")
    }
})