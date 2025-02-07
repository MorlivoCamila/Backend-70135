import { Faker, en, es } from "@faker-js/faker";
import { createHash }    from "./bcrypt.js";

const faker = new Faker({
    locale: [ es, en ]
})

export const generateUsers = ( repeat ) => {

    const users = []

    for (let i = 0; i < repeat ; i++) {        

        users.push({
            password: createHash('coder123'),
            role: faker.number.int() % 2 === 0 ? 'user' : 'admin',
            pets: []
        })
        
    }
   
 
    return users

}