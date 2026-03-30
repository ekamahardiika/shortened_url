import { ur } from 'zod/v4/locales';
import { prisma } from '../utils/prisma';
import { nanoid } from 'nanoid';

async function createShortUrl(originalUrl: string, userId: string){
    const shortCode = nanoid(6);
    
    const newUrl = await prisma.url.create({
        data: {
            originalUrl,
            shortCode,
            userId
        }
    })

    return newUrl;
}

async function getUrlByCode(code: string){
    const url = await prisma.url.findUnique({
        where: {
            shortCode: code
        }
    })

    if(!url){
        return null
    }

    await prisma.url.update({
        where: {
            id: url.id
        },
        data: {
            clicks: {
                increment: 1
            }
        }
    })

    return url;
}

async function getUrlAnalytics(code: string){
    const url = await prisma.url.findUnique({
        where: {
            shortCode: code
        }
    })

    return url;
}

export { 
    createShortUrl,
    getUrlByCode,
    getUrlAnalytics
 }