const express = require("express");
const bp = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://kiran:kiran@cluster0.siuvs9s.mongodb.net/test", { useNewUrlParser: true });
const vacancyschema = new mongoose.Schema({
    key: String,
    title: String,
    role: String,
    date: String,
    img: String,
    loc: String,
    des: String
});
const loginschema = new mongoose.Schema({
    name: String,
    password: String,
    number: Number,
    email: String
});
var flag = 0;
var dummy = 0;
const port = process.env.PORT || 3000;
const Vacancy = mongoose.model("vacancy", vacancyschema);
const Login = mongoose.model("login", loginschema);
const app = express();
app.set('view engine', 'ejs');
app.use(bp.urlencoded({ extended: true }));
app.get("/", function(req, res) {
    if (flag === 1) {
        Vacancy.find({}, function(err, vacancies) {
            if (err) {
                console.log("namaste");
            } else {
                res.render("dash", { vac: vacancies });
            }
        });
    } else {
        dummy = 1;
        res.render("login", { dummy: dummy });
    }
});

app.get("/admin", function(req, res) {
    if (flag === 1) {
        res.render("admin");

    } else {
        dummy = 1;
        res.render("login", { dummy: dummy });
    }
});

app.get("/moreresource", function(req, res) {
    if (flag === 1)
        res.render("moreresource");
    else {
        dummy = 1;
        res.render("login", { dummy: dummy });
    }
});
app.post("/", function(req, res) {
    var a = req.body.f_img;
    var b = req.body.f_date;
    var c = req.body.f_title;
    var d = req.body.f_des;
    var e = req.body.f_role;
    var f = req.
    body.f_loc;
    const vac = new Vacancy({
        key: c + e,
        title: c,
        role: e,
        date: b,
        img: a,
        des: d,
        loc: f,
    });
    vac.save();
    res.redirect("/");
});
app.get("/morevacancy", function(req, res) {
    if (flag === 1) {
        const a = new Date();
        console.log(a);
        Vacancy.find({}, function(err, vacancies) {
            if (err) {
                console.log("hlo frnfds");
            } else {
                res.render("morevacancy", { vac: vacancies });
            }
        });
    } else {
        dummy = 1;
        res.render("login", { dummy: dummy });
    }
});
app.post("/morevacancy", function(req, res) {
    var a = req.body.searchbar;
    console.log("hlo");
    if (a === "") {
        Vacancy.find({}, function(err, vacancies) {
            if (err) {
                console.log("hlo frnds");
            } else {
                res.render("morevacancy", { vac: vacancies });
            }
        });
    } else {
        Vacancy.find({ $or: [{ loc: a }, { role: a }, { title: a }] }, function(err, vacancies) {
            if (err) {
                console.log("hlo frnds");
            } else {
                res.render("morevacancy", { vac: vacancies });
            }
        });
    }
});

app.get("/login", function(req, res) {
    dummy = 0;
    res.render("login", { dummy: dummy });
});
app.post("/login", function(req, res) {
    var a = req.body.name;
    var b = req.body.pwd;
    console.log(a + " " + b);
    console.log("login page");
    Login.findOne({ name: a, password: b }, function(err, login) {
        if (login === null) {
            dummy = 0;
            res.render('login', { dummy: dummy });
        } else if (err) {
            dummy = 0;
            res.render("login", { dummy: dummy });
        } else {
            flag = 1;
            console.log(login);
            console.log(flag);
            Vacancy.find({}, function(err, vacancies) {
                if (err) {
                    console.log("namaste");
                } else {
                    res.render("dash", { vac: vacancies });
                }
            });
        }
    });
});
app.get("/signup", function(req, res) {
    res.render("signup");
});
app.post("/signup", function(req, res) {
    var a = req.body.user;
    var b = req.body.email;
    var c = req.body.number;
    var d = req.body.password;
    const log = new Login({
        number: c,
        email: b,
        name: a,
        password: d,
    });
    log.save();
    res.render("login", { dummy: dummy });
});

app.get("/feedback", function(req, res) {
    if (flag === 1)
        res.render("feedback");
    else {
        dummy = 1;
        res.render("login", { dummy: dummy });
    }
});
app.listen(port, function() {
    console.log("server started");
});