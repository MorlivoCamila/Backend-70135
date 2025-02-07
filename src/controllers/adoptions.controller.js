import { adoptionsService } from "../services/index.js";
import { petModel } from '../dao/models/pets.model.js';
import { userModel } from '../dao/models/users.model.js';

const getAllAdoptions = async(req,res)=>{
    const result = await adoptionsService.getAll();
    res.send({status:"success",payload:result})
}

const getAdoption = async(req,res)=>{
    const adoptionId = req.params.aid;
    const adoption = await adoptionsService.getBy({_id:adoptionId})
    if(!adoption) return res.status(404).send({status:"error",error:"Adoption not found"})
    res.send({status:"success",payload:adoption})
}

const createAdoption = async(req,res) =>{
    const {uid,pid} = req.params;

    const user = await userModel.findOne({_id: uid});
    if(!user) return res.status(404).send({status:"error", error:"user Not found"});
    
    const pet = await petModel.findOne({_id: pid});
    if(!pet) return res.status(404).send({status:"error",error:"Pet not found"});
    if(pet.adopted) return res.status(400).send({status:"error",error:"Pet is already adopted"});
    
    user.pets.push(pet._id);

    await userModel.findByIdAndUpdate(user._id,{pets:user.pets})

    await petModel.findByIdAndUpdate(pet._id,{adopted:true,owner:user._id})

    await adoptionsService.create({owner:user._id,pet:pet._id})

    res.send({status:"success",message:"Pet adopted"})
}

export default {
    createAdoption,
    getAdoption,
    getAllAdoptions
}
