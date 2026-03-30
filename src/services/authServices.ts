import { hashPasword, comparePassword } from "../utils/hash";
import { prisma } from "../utils/prisma";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

async function registerUser({name, email, password}: RegisterInput) {

    if(!name || !email || !password){
        throw new Error("NO_CREDENTIALS")
    }

    const userExist = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if(userExist){
        throw new Error("USER_EXIST")
    }

    const newUser = await prisma.user.create({
        data: {
            name,
            email, 
            password: await hashPasword(password)
        }
    })

    return newUser;
}


async function loginUser({email, password}: LoginInput){

    if(!email || !password){
        throw new Error("NO_CREDENTIALS")
    }

    const userLogin = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(!userLogin){
        throw new Error("INVALID_CREDENTIALS")
    }

    const decodePassword = await comparePassword(password, userLogin.password)

    if(!decodePassword){
        throw new Error("INVALID_CREDENTIALS")
    }

    return userLogin;
}


async function getCurrentUser(user: any){
    return user;
}

export { registerUser, loginUser, getCurrentUser }

