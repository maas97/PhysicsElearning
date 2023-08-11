const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 8080;
mongoose.set("strictQuery", false);
// const signRoute = require("./Routes/sign");
// const login = require("./Routes/loginRoute");
const adminRoute = require("./Route/adminRoutes");
const studentRoute = require("./Route/studentRoutes");
const courseDetailsInfoRoute = require("./Route/courseDetailsInfoRoutes");
const contentOfCourseRoute = require("./Route/contentOfCourseRoutes");
const productRoute = require("./Route/productRoutes");
const quizRoute = require("./Route/quizRoutes");
const authRoute = require("./Route/authRoutes");
const viewRoute = require("./Route/viewRoutes");
const auth = require("./Middleware/authenticationMW");
const {checkStudent} = require("./Middleware/authenticationMW");

process.on('uncaughtException', function (error) {
    console.log(error.stack);
 });

 const dev_db_url = "mongodb+srv://javaheros43:53Kady8wLo9WyP4C@physics.khdpimd.mongodb.net/?retryWrites=true&w=majority";

 const DATABASE_URL = process.env.DATABASE_URL
 const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  const mongoDB = DATABASE_URL || dev_db_url;

// let str1 = "mongodb+srv://javaheros43:53Kady8wLo9WyP4C@physics.khdpimd.mongodb.net/?retryWrites=true&w=majority";

mongoose
    .connect(mongoDB , CONFIG)
    .then(() => {
        console.log("database connected");
        app.listen(port, () => {
            console.log(`server connected... http://localhost:${port}`);
        });
    })
    .catch((error) => console.log(`DB connection error ${error} ${process.env}`));

app.use(
    cors({
        origin: "*",
    })
);
app.use(morgan("combined"));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));
app.use(express.static(path.join(__dirname + '/public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("*", checkStudent);
app.use(authRoute);
app.use(viewRoute);
app.use(adminRoute);
app.use(studentRoute);
app.use(courseDetailsInfoRoute);
app.use(contentOfCourseRoute);
app.use(productRoute);
app.use(quizRoute);

// app.use(login); // Auth After Log in
// app.use(auth);


app.use((request, response) => {
    response.status(404).json({ message: "Not Found" });
});

//Middlewre 3--- Error ----
app.use((error, request, response, next) => {
    response.status(500).json({ message: error + "" });
    if (request.file && request.file.path) fs.unlinkSync(request.file.path);
});

app.use((error, request, response, next) => {
    response.status(500).json({ message: error + "" });
    if (request.file && request.file.path) fs.unlinkSync(request.file.path);
});