const express = require("express");
const router = require("./routers/index.route");
const webRouter = require("./routers/website.route");
const panelConfig = require("./config/panelConfig");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const flash = require('connect-flash');
const flashMessage = require("./middleware/flashMessage");
const MongoStore = require("connect-mongo");

const port = 8000;
const server = express();

server.set("view engine", "ejs");

server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(cookieParser());
server.use("/uploads", express.static(path.join(__dirname, "uploads")));
server.use(flash());

server.use(session({
    name: "testing",
    secret: "hello",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost:27017/admin_panel",
        collectionName: "sessions"
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

server.use(passport.initialize());
server.use(passport.session());
server.use(flashMessage.setFlashMessage);

server.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

server.use("/", router);
server.use("/VCart", webRouter);

server.listen(port, () => {
    panelConfig();
    console.log(`server is running on http://localhost:${port}`);
});
