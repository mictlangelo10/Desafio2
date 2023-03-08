var express = require("express");
var router = express.Router();
let products = require('../models/producto')

//Listado de todos los productos
router.get('/', async function (req, res, next) {
    const result = await products.find();

    res.json(result);
});


router.post("/", async function (req, res, next) {
    let producto = new products(
        {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            images: req.body.images
        }


    );

    let result = await producto.save();
    res.json("Se agregaron nuevos productos");
});


router.put('/', async function (req, res, next) {
    const filter = { id: req.query.id }; //Condición de Query
    const update = { name: req.query.name }; //Campos a modificar


    const resultado = await products.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true
    });


    res.json("Se actualiza el producto");

});


router.delete('/:id', async function (req, res, next) {
    //Buscar un producto por ID y regresa una lista
    const resul = await products.find({ id: req.params.id }).exec();


    //Si se encontró lo elimina
    if (resul.length > 0) {
        await products.deleteOne({ id: req.params.id });
        res.json("Eliminando producto");
    } else {
        res.json({ error: "No se encontró el producto con Id " + req.params.id });
    }
});


module.exports = router;
