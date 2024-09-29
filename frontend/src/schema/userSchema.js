import { z } from "zod";

export const userSignupSchema = z.object({
    fullname:z.string().min(1,"Fullname is required"),
    email:z.string().email("Invalid email address"),
    password:z.string().min(6, "Password must be at least 6 characters."),
});


export const userLoginSchema = z.object({ 
    email:z.string().email("Invalid email address"),
    password:z.string().min(6, "Password must be at least 6 characters.") 
});

