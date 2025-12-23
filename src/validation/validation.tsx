import z from "zod"


// validation schema
export const registerSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    phone: z.string().regex(
        /^(?:\+971|971|0)?5[024568]\d{7}$/,
        "Please enter a valid UAE mobile number"
    )
});