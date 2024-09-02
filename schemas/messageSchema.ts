import {z} from 'zod'

export const MessageSchema =  z.object({
    content : z.string()
    .min(10 , {message : "Must be at least 10 characters"})
    .max(100 , {message : "Must be less than 100 characters"} )
})