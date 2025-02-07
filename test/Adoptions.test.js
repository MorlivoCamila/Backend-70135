import { expect } from 'chai'
import supertest from 'supertest';

const requester = supertest('http://localhost:8080')

describe('Testing del modulo de Adoptions', () => {

    it('El endpoint GET /api/adoptions debe traer correctamente todas las mascotas adoptadas de la base de datos.', async () => {

        const {ok, statusCode} = await requester.get('/api/adoptions')

        expect(ok).to.be.equal(true)
        expect(statusCode).to.be.equal(200)

    })

    it('El Dao debe poder traer una sola mascota adoptada de la base de datos mediante su ID', async function() {
        const petId = '67a3b99ec6cde3d5d79abc68'

        const {statusCode, ok} = await requester.get('/api/adoptions/').send({id:petId})
        expect(statusCode).to.be.equal(200)
        expect(ok).to.be.equal(true)
    })


    it('El endpoint POST /api/pets debe crear crear un registro de adopcion mediante el ID del usuario y de la mascota a adoptar', async () => {
        const userId = '67a3b99ec6cde3d5d79abc87'
        const petId = '67a3b99ec6cde3d5d79abc75'

        const {_body, statusCode, ok} = await requester.post(`/api/adoptions/${userId}/${petId}`)
        expect(statusCode).to.be.equal(200)
        expect(ok).to.be.equal(true)
        
    })

})