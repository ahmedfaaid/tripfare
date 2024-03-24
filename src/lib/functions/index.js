import { SignJWT, jwtVerify } from 'jose';

const secret = 'tripfare';
const key = new TextEncoder().encode(secret);

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key); // replace with proper secret
}

export async function decrypt(input) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256']
  });
  return payload;
}
