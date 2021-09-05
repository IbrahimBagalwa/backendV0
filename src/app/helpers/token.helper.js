import dotenv from 'dotenv';
import pkg from 'jsonwebtoken';


dotenv.config();

const {sign, verify, decode} = pkg
const { JWT_EXPIRE_IN_HRS, JWT_KEY } = process.env

export const generateToken = userId =>{
    // const dataToEncrypt = _.omit(dataToToken, 'password');
    const token = sign({ id: userId }, JWT_KEY, {expiresIn :JWT_EXPIRE_IN_HRS});
    return token;
}

export const verifyToken = token => verify(token, JWT_KEY);

export const decodeToken = token => decode(token, JWT_KEY)