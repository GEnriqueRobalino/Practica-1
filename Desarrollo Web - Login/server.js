//PRACTICA EN CLASE DESARROLLO WEB 10522
//ALUMNO: GABRIEL ROBALINO
//TUTOR: ING. CARLOS PILLAJO
//FECHA: 24/07/2023

const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy;

const app = express();
app.use(express.urlencoded({extended: true}));

app.use(cookieParser('mi ultra hiper secreto'));

app.use(session({
    secret: 'mi ultra hiper secreto',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new PassportLocal(function(username,password,done){
    if(username == "admin" && password == "12345678")
        return done(null,{id: 1, name: "Gabriel"});
    done(null, false);
}));

passport.serializeUser(function(user,done){
    done(null,user.id);
})

passport.deserializeUser(function(id,done){
    done(null,{id: 1, name: "Gabriel"});
})

app.set('view engine', 'ejs');

app.get("/", (req,res,next)=>{
    if(req.isAuthenticated()) return next();
    res.redirect("/login");
},(req,res)=>{
    //Si ya se inicio sesion mostrar bienvenida
    res.send("Práctica Número 1");
    // Caso contrario redirigir a /login
});

app.get("/login",(req,res)=>{
    res.render("login"); //Muestra el formulario
});

app.post("/login", passport.authenticate('local',{
    successRedirect: "/",
    failureRedirect: "/login"
}));

app.listen(8080,()=> console.log("Server Started"));