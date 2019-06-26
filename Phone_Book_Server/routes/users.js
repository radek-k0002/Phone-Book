const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcryptjs")
const path = require('path');
const passport = require("passport")
const {
    ensureAuthenticated
} = require("../config/auth")

const db = require("../database/db");

const connection = mysql.createConnection(db)
connection.connect(err => {
    if (err) return err;
    else {
        console.log("Connected to MySql")
    }
})

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "public", "build", "index.html"))
})

router.get("/sign_in", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "public", "build", "index.html"))
})

router.post("/", (req, res) => {
    const {
        email,
        password,
        repeatedPassword,
        checkbox
    } = req.body

    const fields = {
        email,
        password,
        repeatedPassword,
        checkbox
    }

    let errorFieldsMsg = {};

    connection.query(`SELECT COUNT(email) AS cnt FROM users WHERE email = "${fields["email"]}"`, (err, results) => {
        if (err) return res.send({
            uError: "Unexpected Error"
        })

        //VALIDATION
        for (let field in fields) {
            if (!fields[field]) {
                errorFieldsMsg[field] = "Please fill the field";

                if (field === "checkbox") {
                    errorFieldsMsg[field] = "You need to accept the statements";
                }

            } else if (field === "email") {
                const inUse = results[0].cnt
                if (inUse === 1) errorFieldsMsg["email"] = "Email is already in use";

            }
        }
        if (password.length < 4) {
            errorFieldsMsg["password"] = "Password is too short (min 4 characters)";
        }

        if (password != repeatedPassword) {
            errorFieldsMsg["repeatedPassword"] = "Passwords do not match";
        }

        if (Object.keys(errorFieldsMsg).length > 0) {
            res.send({
                errors: errorFieldsMsg,
            })
        } else {
            let pass = fields["password"];


            //Hash password
            bcrypt.genSalt(10, (err, salt) => bcrypt.hash(pass, salt, (err, hash) => {
                if (err) throw err;

                pass = hash;

                connection.query(`INSERT INTO users VALUES(NULL, "${fields["email"]}", "${pass}", NULL)`, (err, results) => {
                    if (err) return res.send({
                        uError: "Unexpected Error"
                    })

                    res.send({
                        status: "ok"
                    })
                    bcrypt.compare(pass, hash, (err, res) => {
                        if (err) throw err;
                    })
                })
            }))
        }
    })
})


//login

router.post("/sign_in", (req, res, next) => {
    //AUTHENTICATION
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err)
        if(!user) return res.send({status: "failure"})
        req.logIn(user, (err) => {
            if (err) return res.send({
                status: "failure"
            })
            res.setHeader("Access-Control-Allow-Credentials", "true")
            req.session.user = user;
            req.session.save()
            return res.send({
                status: "ok"
            })
        })
    })(req, res, next)
})

router.get("/contacts", ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../", "public", "build", "index.html"))
})

//GET ALL CONTACTS FROM DB
router.post("/getContacts", ensureAuthenticated, (req, res) => {
    const query = `SELECT id, name, notes, phone_number as phone FROM contacts WHERE email_user="${req.session.user.email}"`
    // connection.query(`SELECT id, name, notes, phone_number as phone FROM contacts WHERE email_user="${req.session.user.email}"`, (err, results) => {
    connection.query(query, (err, results) => {

        if (err) return res.send({
            uError: "UnexpectedError"
        })
        res.send({
            status: "ok",
            contacts: results
        })

    })
})


//DELETE CONTACT
router.delete("/contacts/:id", ensureAuthenticated, (req, res) => {
    const query = `DELETE FROM contacts WHERE email_user="${req.session.user.email}" && id=${req.params.id}`;
    connection.query(query, (err, results) => {

        // connection.query(`DELETE FROM contacts WHERE email_user="${req.session.user.email}" && id=${req.params.id}`, (err, results) => {
        if (err) return res.send({
            uError: "UnexpectedError"
        })
        else if (results.affectedRows) {
            return res.send({
                status: "ok"
            })
        } else {
            return res.send({
                uError: "UnexpectedError"
            })
        }

    })
})

//ADD NEW CONTACT
router.post("/contacts/", ensureAuthenticated, (req, res) => {
    let {
        name,
        notes,
        phone
    } = req.body

    const query = `INSERT INTO contacts(id, email_user, name, notes, phone_number) VALUES (NULL,"${req.session.user.email}","${name}","${notes}","${phone}")`
    connection.query(query, (err, results) => {
        if (err) return res.send({
            uError: "UnexpectedError"
        })
        else {
            connection.query(`SELECT id, name, notes, phone_number as phone FROM contacts WHERE email_user="${req.session.user.email}"`, (err, results) => {
                if (err) return res.send({
                    uError: "UnexpectedError"
                })
                res.send({
                    status: "ok",
                    contacts: results
                })

            })
        }
    })
})


router.put("/contacts/:id", ensureAuthenticated, (req, res) => {
    const data = req.body;
    let x = 0;
    let query = `UPDATE contacts SET `
    //UPDATE ONLY GIVEN PROPS
    for (el in data) {
        x++;
        let toUpdate = `${el}="${data[el]}", `
        if (x >= Object.keys(data).length) {
            toUpdate = `${el}="${data[el]}" `
        }
        query += toUpdate;

    }
    query += `WHERE email_user="${req.session.user.email}" && id="${req.params.id}"`

    connection.query(query, (err, results) => {
        if (err) return res.send({
            uError: "UnexpectedError"
        })
        res.send({
            status: "ok"
        })


    })
})

//REFRESH SESSION
router.post("/contacts/refresh", ensureAuthenticated, (req, res) => {
    res.send("status: refreshed")
})


//LOG OUT
router.get("/logout", (req, res) => {
    req.logOut();
    res.send({
        status: "logout"
    })
}) 

module.exports = router