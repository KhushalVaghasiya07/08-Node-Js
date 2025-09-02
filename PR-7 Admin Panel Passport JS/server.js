const express = require("express");
const router = require("./routers/index.route");
const webRouter = require("./routers/website.route");
const panelConfig = require("./config/panelConfig");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const passport = require("passport");

const port = 8000;
const server = express();

server.set("view engine", "ejs");

server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(cookieParser());
server.use("/uploads", express.static(path.join(__dirname, "uploads")));

server.use(session({
    name: "testing",    
    secret: "hello",
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

server.use("/", router);
server.use("/Blogzyyy", webRouter);

server.listen(port, () => {
    panelConfig();
    console.log(`server is running on http://localhost:${port}`);
});