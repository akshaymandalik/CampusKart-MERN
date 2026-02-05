import argon2 from "argon2";

export const encyptPass = async (inputPassword) => {
    const hash = await argon2.hash(inputPassword, {
        type: argon2.argon2id
    });

    return hash;
    
}

export const verifyPass = async (dbPass, inputPassword) => {
    
    const isMatch = await argon2.verify(dbPass, inputPassword);    
    return isMatch;
}



