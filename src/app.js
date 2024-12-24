import express       from 'express'
import mocksRouter   from './router/mocks.router.js'
import { connectDB } from './config/database.js'
import usersRouter   from './router/users.router.js'
import petsRouter    from './router/pets.router.js'

const app  = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

connectDB()

app.use('/api/mocks', mocksRouter)
app.use('/api/users', usersRouter)
app.use('/api/pets' , petsRouter)

app.listen(PORT, err => {

    if(err) console.log(err)
    console.log(`Servidor escuchando en el puerto: ${PORT}`)

})