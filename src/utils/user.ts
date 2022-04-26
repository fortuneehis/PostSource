import * as bcrypt from 'bcryptjs'


export const hashPassword = async (password: string, rounds?: number) => {
    const salt = await bcrypt.genSalt(10 || rounds)
    return await bcrypt.hash(password, salt)
}


export const comparePassword = async (password: string, hashedPassword: string) => {
   return await bcrypt.compare(password, hashedPassword)
}    