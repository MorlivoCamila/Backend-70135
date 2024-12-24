import bcrypt from 'bcrypt'

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
// export const isValidPassword = (passwordBody, userPassword) => bcrypt.compareSync(passwordBody, userPassword)