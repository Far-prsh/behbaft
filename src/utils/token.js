import jwt from 'jsonwebtoken'
const activationToken = "fdsn4ok5505ve%^sd**lkfeNJVDNFK"


export const createActivationToken = (payload) => {
return jwt.sign(payload,activationToken,{expiresIn: '2d'})
}