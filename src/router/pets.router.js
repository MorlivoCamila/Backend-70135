import { Router }   from "express";
import { petModel } from "../models/pets.model.js";

const router   = Router()

router.get('/', async (req, res) => {

    try {

        const mascotas = await petModel.find({})
        res.send({message: 'success', payload: mascotas})
        
    } catch (error) {

        console.log(error);
        res.status(500).send("Error.")

    }

})

export default router