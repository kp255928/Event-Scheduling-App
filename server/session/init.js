const express = require('express')
const app = express()
const passport = require('passport')
const passportjwt = require('passwort-jwt')
const bcrypt = require('bcrypt')
app.set('view-engine', 'ejs')
app.get('/register',(req, res) =>{
    res.render('register.ejs')
})
app.post('register', (req, res) => {
    try{
        const userdata = req.body;
    }catch(e){

    }
})
app.get('/login', (req, res) => {
    res.render('login.ejs')
})
app.post('/login',async (req,res) => {
    try{
        const login = req.body;
        //const result =
    }catch(e){

    }
})

app.delete('/logout', (req,res) =>{
    req.logOut()
    res.redirect('/login')
})