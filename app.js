const express = require("express");
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const signUpRouter = require("./routes/signUpRouter");
const logInRouter = require("./routes/logInRouter");
const logOutRouter = require("./routes/logOutRouter");
const fileRouter = require("./routes/fileRouter");
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
app.use("/file", fileRouter);
app.use("/folder", folderRouter);

//Error
const PageNotFoundError = require("./errors/PageNotFoundError");
app.use((req, res, next) => {
  throw new PageNotFoundError("The requested page could not be found");
});
app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .render("errorPage", {
      title: "Error",
      error: err.message,
      code: err.statusCode || 500,
    });
});

// Connecting to server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`);
});
