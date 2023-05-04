const express = require('express'); // Inyectamos express
const router = express.Router(); // Generamos la instancia del router
const mongoose = require('mongoose'); // Inyectamos mongoose
let Person = require('../models/persons'); // Inyectamos persons del modelo creado anteriormente

/*
router.get('/gente', async (req, res) =>{ // Creamos una ruta para obtener todos los documentos de persons
    const Persons = await Person.find({}); // Obtenemos todas las personas y las guardamos en esta variable Persons
    res.json(Persons); // Respondemos con un json con la variable Persons (esto es para que el front-end pueda entenderlo)
});
*/

router.get("/gente", async (req, res) => { // Creamos una ruta para obtener todos los documentos de persons
    const Persons = await Person.find({}); // Obtenemos todas las personas y las guardamos en esta variable Persons
    res.render("index", { Persons }); // Respondemos renderizando Persons en index
});

router.get("/addPerson", async(req, res) =>{
    res.render("addPerson") // Creamos una vista para visualizar el formulario
})

router.post('/addPerson', function(req, res) {
    const newPerson =  Person({
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss
    }); // Este modelo tiene el Schema de MongoDB lo que nos permite crear un nuevo documento.

    newPerson
    .save() // Agregamos con "save" y recordemos que es asíncrono.
    .then(() => {res.redirect("gente")}) // Si no hubo errores lo redireccionamos a gente
    .catch((error) => {res.json({message:error})}); // Si hubo error manda mensaje con el error
});


module.exports = router; // Exportamos el router para poder acceder a el desde otros archivos