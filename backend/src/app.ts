import express,{Request,Response} from "express"
import cors from 'cors'
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express()
const __dirname = path.resolve()

// cookie-parser
app.use(cookieParser());

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true, limit: "16kb"}))
app.use(express.static("public"))


//cors
app.use(cors({
    origin: process.env.CORS_ORIGINE || "http://localhost:5173",
    credentials: true,
    methods: ["GET","POST","PUT","DELETE"],
    allowedHeaders: ["content-type","Authorization"]
}))


import register from "./router/auth.route.js"
import history from "./router/history.route.js"
import userdata from "./router/userData.route.js"
import path from "node:path";

app.use("/api/v1/auth",register)
app.use("/api/v1/upload",history)
app.use("/api/v1/data",userdata)

app.use(express.static(path.join(__dirname,'frontend/dist')))

app.use((req: Request, res:Response) => {
    return res.sendFile(path.join(__dirname,'frontend','dist','index.html'))
})

app.use(errorHandler);

export default app;