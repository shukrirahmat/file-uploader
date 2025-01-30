const express = require("express")
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const signUpRouter = require("./routes/signUpRouter");
const logInRouter = require("./routes/logInRouter");
const logOutRouter = require("./routes/logOutRouter");
const uploadRouter = require("./routes/uploadRouter");
const folderRouter = require("./routes/folderRouter");
const sessionConfig = require("./auth/sessionConfig");
const passport = require("passport");



//Middleware

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(sessionConfig);

require("./auth/passportConfig");
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});


// Routes
app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);
app.use("/log-in", logInRouter);
app.use("/log-out", logOutRouter);
app.use("/upload", uploadRouter);
app.use("/folder", folderRouter);


// Connecting to server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}...`)
})

