const express=require("express")
const { getDashboard } = require("../controllers/dashboardController")
const router=express.Router()


router.get("/getAllDashbord",getDashboard)






module.exports=router