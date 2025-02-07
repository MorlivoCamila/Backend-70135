import express         from 'express'
import mocksRouter     from './router/mocks.router.js'
import { connectDB }   from './config/database.js'
import usersRouter     from './router/users.router.js'
import petsRouter      from './router/pets.router.js'
import adoptionsRouter from './router/adoption.router.js'

const app  = express()
const PORT = 3030

import swaggerJsDoc       from 'swagger-jsdoc'
import swaggerUiExpress   from 'swagger-ui-express'
import { swaggerOptions } from './config/swagger.config.js'
import cors from 'cors'

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

connectDB()

const specs = swaggerJsDoc(swaggerOptions)
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use('/api/mocks',     mocksRouter)
app.use('/api/users',     usersRouter)
app.use('/api/pets' ,     petsRouter)
app.use('/api/adoptions', adoptionsRouter) 

 
app.listen(PORT, err => {

    if(err) console.log(err)
    console.log(`Servidor escuchando en el puerto: ${PORT}`)

})