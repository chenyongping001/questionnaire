export default function randomString(length: number = 32) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charsLength = chars.length;
    let generateString = '';
    for (let i = 0; i < length; i++) generateString += chars.charAt(Math.floor(Math.random() * charsLength));
    return generateString;
}