const localStrategy = require("passport-local").Strategy;
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const db = require("../database/db");

const connection = mysql.createConnection(db)
connection.connect(err => {
    if (err) return err;
    else {
        console.log("Connected to MySql")
    }
})

module.exports = (passport) => {
    passport.use(
        new localStrategy({
            usernameField: "email"
        }, (email, password, done) => {
            connection.query(`SELECT email, password FROM users WHERE email = "${email}"`, (err, results) => {
                if (err) throw err

                else if (results.length < 1) {
                    return done(null, false, {
                        message: "The email or password doesn't match any account"
                    })
                }
                bcrypt.compare(password, results[0].password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, {
                            email: email,
                            password: results[0].password
                        })
                    } else {
                        return done(null, false, {
                            message: "The email or password doesn't match any account"
                        })
                    }
                })
            })

        })
    )

    passport.serializeUser((id, done) => {
        done(null, id);
    })

    passport.deserializeUser((id, done) => {
        // connection.query(`SELECT * FROM users WHERE email = "${id.email}"`, (err, results) => {
        //     if (err) throw err
        done(null, id)
            // done(err, id)
            // done(err, results[0].id)

        // })
    })
}