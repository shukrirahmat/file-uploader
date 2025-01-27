const express = require("express")
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");


//Middleware

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));





// Routes
app.get("/", indexRouter);



// Connecting to server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}...`)
})

