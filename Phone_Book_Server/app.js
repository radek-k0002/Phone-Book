const express = require('express')
const cors = require("cors")
const session = require("express-session");
const path = require('path');
const passport = require("passport")
const favicon = require("serve-favicon")

const app = express();

require("./config/passport")(passport)

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "pug");

app.use(express.static("public"), express.static(path.join(__dirname, "public", "build")), express.static("favicon"));

app.use(favicon(path.join(__dirname, "public", "favicon", "favicon.ico")))

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))


app.use(cors())

const port = process.env.PORT || 4000

app.use(session({
    secret: 'super secret boy',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        httpOnly: false,
        expires: 1000 * 90 //1.5min
    }
}))
app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes/users"))


app.use((req, res, next) => {
    res.status(404).render("404");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})