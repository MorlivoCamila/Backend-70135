export const generatePetErrorInfo = (pet) => {
    return `One or more properties where incomplete or not valid.
    List of required properties:
    >name: needs to be a String, received ${pet.name}
    >adopted: needs to be a Boolean, received ${pet.adopted}
    >type: needs to be a String, received ${pet.type}
    `
}


export const generateSinglePetError = (uId) => {
    return `The id is not a number or is less than 0. Id: ${uId}`
}