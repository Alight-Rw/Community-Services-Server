import randomstring from 'randomstring';
import {sign, verify } from 'jsonwebtoken';

const generateAccessToken = (id, key) => {
  return sign({ id }, key);
};

const verifyToken = (token, key)=> {
  return verify(token, key);
};

const generateRandomString = ()=> {
  return randomstring.generate(process.env.RANDOM_STRING_LENGTH);
};

const generateOtp = () => {
  return randomstring.generate({ length: 6, charset: 'numeric' });
};

export { generateAccessToken, verifyToken, generateRandomString, generateOtp };
