import { Router }    from "express";
import { userModel } from "../models/users.model.js";

const router   = Router()

router.get('/', async (req, res) => {

    try {

        const usuarios = await userModel.find({})
        res.send({message: 'success', payload: usuarios})
        
    } catch (error) {
        
        console.log(error);
        res.status(500).send("Error.")
        
    }

})

export default router