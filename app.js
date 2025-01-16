require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 80;
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.post('/factorial', (req, res) => {
    const numero = req.body.numero;
    if(numero === undefined || isNaN(numero)){
        return res.status(400).send("Numero no valido");
    }
    
    const factorial = (n) => {
        if(n === 0) return 1;
        return n * factorial(n-1);
    }
    const resultado = factorial(Number(numero));
    res.send(`El factorial de ${numero} es ${resultado}`);
})
app.get('/saludo', (req, res) => {
    const nombre = req.query.nombre || "invitado";
    const apellido = req.query.apellido || "Don Nadie";
    res.send(`<h1>HOLA ${nombre} ${apellido}</h1>`);
})
//Para usar post hay que instalar una extension, 
app.post('/saludo', (req, res) => {
    const nombre = req.body.nombre || "invitado";
    const apellido = req.body.apellido || "Don Nadie";
    res.send(`<h1>HOLA ${nombre} ${apellido}</h1>`);
})
app.get('*', (req, resp) => {
    resp.sendFile( ""+__dirname + '/public/error.html');
})
app.get('/', (req, resp) => {
    resp.sendFile( ""+__dirname + '/public/index.html');
})
app.get('/precios', (req, res) => {
    res.send('<h1>Chorarada</h1>');
})
app.listen(port, 
    () => console.log(`Server 
        escuchando en el puerto ${port}`));