import {Schema, model, mongoose} from 'mongoose'


const adoptionCollection = "Adoptions";

const AdoptionSchema = new Schema({
    owner:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Users'
    },
    pet:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Pets'
    }
})

const adoptionModel = model(adoptionCollection, AdoptionSchema);

export default adoptionModel 