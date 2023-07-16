import jwt from 'jsonwebtoken'
const activationToken = "fdsn4ok5505ve%^sd**lkfeNJVDNFK"
const resetToken = "fdsndvvvds##$$Gdvb05ve%^sd**lkfeNJVDNFK"

export const createActivationToken = (payload) => {
return jwt.sign(payload,activationToken,{expiresIn: '2d'})
}

export const createResetToken = (payload) => {
    return jwt.sign(payload,resetToken,{expiresIn: '6h'})
    }