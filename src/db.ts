import {MongoClient} from "mongodb"
import mongoose from "mongoose"

async function init(){
    const connection = mongoose.connection
    
    connection.on("error", (error) => {
        console.log("Error from the database: ", error)
    })
    await mongoose.connect("mongodb+srv://DbUserArtem:pineapple@cluster0.sgjna.mongodb.net/?retryWrites=true&w=majority", {
        dbName: "quiz"
    })

    console.log("Successfully connected to the db")
}

init()
// db.on("", (e) => {
//     console.log("Successfully connected to the db")
// })