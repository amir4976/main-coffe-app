import {hash,compare} from 'bcryptjs';
import {sign,verify} from 'jsonwebtoken';

// project dependency
const hashPassword= async ({password})=>{
    const HashedPassword = await hash(password,12);
    return HashedPassword;
}


const verifyPassword = async (password,hashedPassword) => {
    const isPasswordMatch = await compare(password,hashedPassword);
    return isPasswordMatch;
}


const genrateToken = async (data) => {
    const token = await sign({...data},process.env.JWT_SECRET,{expiresIn: '7d'});
    return token;
}


const verifyToken = async (token) => {
    try {
        const data = await verify(token,process.env.JWT_SECRET);
        return data;
    } catch (error) {
        console.log('error in verifyToken',error);
        return false;
    }
}

const genrateRefreshToken = async (data) => {
    const token = await sign({...data},process.env.RFRESH_SECRET,{expiresIn: '7d'});
    return token;
}
//

// validat by regex
const validateEmail = async (email) => {
const pattern =/ [^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
return pattern.test(email);
}

const validatePhone = async (phone) =>{
const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/g;
return pattern.test(phone);
}

const validatePassword = async (password) => {
const pattern =/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/g;
const isValidPassword = pattern.test(password);
return isValidPassword;
}
//




export {
    hashPassword,
    verifyPassword,
    genrateToken,
    verifyToken,
    genrateRefreshToken,
    validateEmail,
    validatePhone,
    validatePassword
    // ,authUser
}