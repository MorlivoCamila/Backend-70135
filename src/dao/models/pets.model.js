import { Schema, model } from 'mongoose';

const petsCollection  = 'pets'
const PetSchema       = new Schema({
    
    id: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    adopted: {
        type: Boolean,
        required: true
    },
    owner: {
        type: Array
    }

})

export const petModel = model(petsCollection, PetSchema);