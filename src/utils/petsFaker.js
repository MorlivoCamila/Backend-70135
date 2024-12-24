import { Faker, en, es } from "@faker-js/faker";

const faker = new Faker({
    locale: [ es, en ]
})

export const generatePets = ( repeat ) => {

    const pets = []

    for (let i = 0; i < repeat; i++) {

        let adopted = faker.number.int() % 2 === 0 ? 'true' : 'false'

        pets.push({
            id: faker.database.mongodbObjectId(),
            type: faker.animal.type(),
            name: faker.animal.petName(),
            adopted,
            owner: adopted === 'true' ? generateOwner() : '' 
        })
        
    }

    return pets

}

export const generateOwner = () => {
    return{
        id: faker.database.mongodbObjectId(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number()
    }
}