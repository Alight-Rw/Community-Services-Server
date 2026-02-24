import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import StatusCodes from 'http-status-codes'

import "./database/configs/config.js";
import { handleSuccess } from "./utils/responseUtils.js"


dotenv.config()
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req, res) => {
 return handleSuccess(res, StatusCodes.OK,'WELCOME TO OUR COMMUNITY SERVICE',{})   
});



app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})