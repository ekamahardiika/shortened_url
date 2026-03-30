import jwt from 'jsonwebtoken';

function generateRefreshToken(userId: string): string {
    const payload = {id: userId};
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "7d"
    });

    return token;
}

function generateAccessToken(userId: string): string {
    const payload = {id: userId};
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "15m"
    });

    return token;
}


export { generateRefreshToken, generateAccessToken }
