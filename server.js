const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const result = dotenv.config();
if (result.error) {
    console.error(result.error);
    process.exit(1);
}
const { PORT,DB_URI } = process.env

const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, err => {
    if(err) {
        console.error(err);
        process.exit(2);
    }
    console.log(`Authorization Server Started in PORT ${PORT}`);
    mongoose.connect(DB_URI, {
        useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false 
    });
})

const db = mongoose.connection;
db.once("open", () => {
    console.log(`MongoDB Connection Established`);
    // DO INDEX ROUTING
})
db.once("error", err => console.error(err));