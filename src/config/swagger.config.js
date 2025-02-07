import { fileURLToPath } from 'url'
import { dirname }       from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación De App para Adoptar Mascotas Adoptame',
            description: 'Api pensada para adopción de mascotas'
        }
    },
    apis: [`${dirname(__dirname)}/docs/**/*.yaml`]
}// @