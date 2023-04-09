import jwt from "jsonwebtoken";

export const createUserToken = async(user, req, res) => {
    //crete token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "nosso-secret")

    // return token
    res.status(200).json({
        message: 'Você está autenticado!',
        token: token,
        userId: user._id
    })
}