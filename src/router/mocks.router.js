import { Router }                                     from "express";
import { generateOwner, generatePets }                from "../utils/petsFaker.js";
import ErrorEnum                                      from "../errorHandlers/enumErrors.js";
import CustomError                                    from "../errorHandlers/customErrors.js";
import {generatePetErrorInfo, generateSinglePetError} from '../errorHandlers/generateErrorsInfo.js'
import { generateUsers }                              from "../utils/mockingUsers.js";
import { userModel }                                  from "../models/users.model.js";
import { petModel }                                   from "../models/pets.model.js";

const router = Router()
const pets   = []
let users    = []
let mascotas = []

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

router.get('/generatedata', async (req, res) => {

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

})

router.get('/mockingusers', (req, res) => {
    
    const users = generateUsers(50)
    res.send({message: 'sucess', payload: users})

})

router.get('/mockingpets', ( req, res ) => {

    let mascotas = []

    mascotas.push(generatePets(100))

    res.send({message: 'sucess', payload: mascotas})

})

router.get('/:id', (req,res) => {

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

    const pet = pets.find( p => p.id === id)

    res.send({message: 'success', payload: pet})

})

router.post('/', (req, res) => {
    
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
    
    pets.push(pet)    
    
    res.send({status: 'success', payload: pets})
})
 
export default router