import jwt from 'jsonwebtoken';
import config from '../config.js';

export const createJwtToken = ({ id, email }) => {
    const token = jwt.sign({ id, email }, config.jwt.secret, { expiresIn: '1d', algorithm: 'HS256' })
    return token
}
