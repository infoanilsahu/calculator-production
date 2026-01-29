import app from './app.js'
import dotenv from 'dotenv'
import connectDB from './db/db.js'
import { error } from 'node:console'



dotenv.config({
    path: "./.env"
})

const port = process.env.PORT! || 8000




connectDB()
    .then( () => {
        app.listen(port, () => {
            console.log(`server is listening on ${process.env.SERVER_URL}`);
        })
    })
    .catch( (err) => {
        console.log("Error in connection of database : ",err);
        process.exit(1);
    })
