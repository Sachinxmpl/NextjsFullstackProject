import {z} from 'zod'

export const signInSchema = z.object({
   identifier : z.string() ,   //identifier may be email username 
   password : z.string()
})