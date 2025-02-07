import { Router }     from "express";
import { userModel }  from "../dao/models/users.model.js";
import { createHash } from "../utils/bcrypt.js";
import { generatePets } from "../utils/petsFaker.js";

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

router.get('/:id', async (req, res) => {

    try {
        const { id } = req.params
        const user = await userModel.findOne( { _id: id } )
        if(!user) return res.status(404).send({status:"error",error:"User not found"})
        res.send({status:"success",payload:user})
    
    } catch (error) {
        
        console.log(error);
        res.status(500).send("Error.") 
    
    }
    
})

router.post('/', async (req, res) => {
    
    try {
        
        const {password, role} = req.body

        const pet = generatePets(1)

        const newUser = {
            password: await createHash(password),
            role: role,
            pets: pet
        }

        const result = await userModel.create(newUser)
        res.send({status:"success", message:"User created"}) 
    
    } catch (error) {
        
        console.log(error);
        res.status(500).send("Error.") 
    
    }

})

router.put('/:id', async (req, res) => {
    
    try {

        const { id } = req.params
        const updateBody = req.body;
        const user = await userModel.findOne( { _id: id } )
        if(!user) return res.status(404).send({status:"error", error:"User not found"})
        const result = await userModel.findByIdAndUpdate(user, updateBody);
        res.send({status:"success",message:"User updated"})

    } catch (error) {

        console.log(error);
        res.status(500).send("Error.") 
        
    }

})

router.delete('/:id', async (req, res) => {
    
    try {

        const {id} = req.params;
        const result = await userModel.findByIdAndDelete({_id: id});
        res.send({status:"success",message:"User deleted"})

    } catch (error) {
        
        console.log(error);
        res.status(500).send("Error.") 
    
    }

})

export default router