import { Router }                                     from "express";
import { generateOwner, generatePets }                from "../utils/petsFaker.js";
import ErrorEnum                                      from "../errorHandlers/enumErrors.js";
import CustomError                                    from "../errorHandlers/customErrors.js";
import {generatePetErrorInfo, generateSinglePetError} from '../errorHandlers/generateErrorsInfo.js'
import { generateUsers }                              from "../utils/mockingUsers.js";
import { userModel }                                  from "../dao/models/users.model.js";
import { petModel }                                   from "../dao/models/pets.model.js";
 
const router = Router()
let users    = []
let mascotas = []

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

router.get('/generatedata', async (req, res) => {

    try {    
    
        const quantityUsers = req.query.users
        const quantityPets  = req.query.pets

        users               = generateUsers(quantityUsers)
        mascotas            = generatePets(quantityPets)

        for (let i = 0; i < users.length; i++) {

            let indice = getRandomInt(mascotas.length)         
            users[i].pets.push(mascotas[indice])
            
        }
        

        const newPets  = await petModel.create(mascotas)
        const newUsers = await userModel.create(users)

        res.send({message: 'Usuarios y mascotas generados con exito!'})
        
    } catch (error) {
        
        console.log(error);
        res.status(500).send("Error.")

    }

})

router.get('/mockingusers', (req, res) => {
    
    try {

        users.push(generateUsers(50))
        res.send({message: 'sucess', payload: users})

    } catch (error) {

        console.log(error);
        res.status(500).send("Error.")

    }

})

router.get('/mockingpets', ( req, res ) => {

    try {

        mascotas.push(generatePets(100))
        res.send({message: 'sucess', payload: mascotas})

    } catch (error) {

        console.log(error);
        res.status(500).send("Error.")

    }

})

router.get('/:id', async (req,res) => {

    try {
        const { id } = req.params

        if(typeof id !== "string" || id <= 0) {
            
            const error = CustomError.createError(
                {
                    name: 'Find pet failed.',
                    cause: generateSinglePetError(petId),
                    message: 'Error trying to find a single pet.',
                    code: ErrorEnum.INVALID_PARAM
                }
            )
            
            res.send({status: 'Error', error: error.name, message: error.cause})
        }

        const pet = await petModel.findOne( { id: id } )    

        res.send({message: 'success', payload: pet})

    } catch (error) {

        console.log(error);
        res.status(500).send("Error.")

    }

})

router.post('/', async (req, res) => { 

    try {
    
        const { name, type, adopted } = req.body
        
        if( !name || !type || isNaN(adopted) ){
            
            const error = CustomError.createError({
                name: 'Pet creation failed.',
                cause: generatePetErrorInfo(req.body),
                message: 'Error trying to create a pet',
                code: ErrorEnum.INVALID_TYPE_ERROR
            })

            res.send({status: 'Error', error: error.name, message: error.cause})
        } 

        const owner = adopted === true ? generateOwner() : ''
        
        const pet   = {
            id: Date.now().toString(35) + Math.random().toString(36).slice(2),
            type,
            name,
            adopted,
            owner
        }

        
        const pets =  await petModel.create(pet)
        
        res.send({status: 'success', payload: pets})

    } catch (error) {
            
        console.log(error);
        res.status(500).send("Error.")

    }
})
 
export default router