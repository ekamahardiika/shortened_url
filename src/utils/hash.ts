import bcrypt from 'bcryptjs';

async function hashPasword(password: string): Promise<string>{
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}

async function comparePassword(password: string, hashPassword: string): Promise<boolean>{
    const comparePassword = await bcrypt.compare(password, hashPassword)
    return comparePassword;
}

export { hashPasword, comparePassword }