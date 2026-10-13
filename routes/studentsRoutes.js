const express=require("express")
const { getStudents, getStudentByID,createStudent, updateStudent, deleteStudent} = require("../controllers/studentController")

//router obeject
const router=express.Router()
//routes

//GET ALL STUDENTS LIST || GET
router.get('/getall',getStudents)

//GET STUDENT By ID
router.get('/get/:id',getStudentByID)

//Create STUDENT || POST
router.post('/create',createStudent)

//UPDATE STUDENT
router.put('/update/:id',updateStudent)

//DELETE STUDENT
router.delete('/delete/:id',deleteStudent)


module.exports=router