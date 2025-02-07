import Adoption from "../dao/Adoption.js"
import AdoptionRepository from "../repository/AdoptionRepository.js"

export const adoptionsService = new AdoptionRepository(new Adoption())
