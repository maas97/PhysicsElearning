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
const adminRoute = require("./Route/adminRoute");
const studentRoute = require("./Route/studentRoute");
const dayOfCourseRoute = require("./Route/courseDetailsRoute");
const contentOfCourseRoute = require("./Route/contentOfCourseRoute");
const productRoute = require("./Route/productRoute");
const quizRoute = require("./Route/quizRoute");
const authRoute = require("./Route/authRoute");
const auth = require("./Middleware/authenticationMW");
const {checkStudent} = require("./Middleware/authenticationMW");

process.on('uncaughtException', function (error) {
    console.log(error.stack);
 });

let str1 = "mongodb+srv://javaheros43:53Kady8wLo9WyP4C@physics.khdpimd.mongodb.net/?retryWrites=true&w=majority";

    // 53Kady8wLo9WyP4C
mongoose
    .connect(str1)
    .then(() => {
        console.log("database connected");
        app.listen(port, () => {
            console.log("server connected....");
        });
    })
    .catch((error) => console.log(`DB connection error ${error}`));

app.use(
    cors({
        origin: "*",
    })
);
app.use(express.static('public'));
app.use(morgan("combined"));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("*", checkStudent);
app.use(authRoute);
app.use(adminRoute);
app.use(studentRoute);
app.use(dayOfCourseRoute);
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