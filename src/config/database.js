import { connect } from 'mongoose'

export const connectDB = async () => {

    console.log('Base de datos conectada')
    return await connect('mongodb+srv://Camila:Panyqueso1.@cluster0.miunx.mongodb.net/MocksData')

}