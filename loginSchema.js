import {z} from 'zod'

const loginSchema = z.object({
    email: z.string().email({message: "Invalid email address"}),
    password : z.string().min(6,{message : "Password must be atleast six character long"})
})

export default loginSchema