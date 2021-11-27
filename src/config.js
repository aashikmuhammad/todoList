import dotenv from 'dotenv';
dotenv.config();

export default {
    jwt: {
        secret: 'secret' || process.env.JWT_SECRET
    }
}