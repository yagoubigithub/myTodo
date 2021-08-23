const crypto = require('crypto');

//crypt the password to get the hash for storing just the password
const encryptPassword  = (password, salt) =>{

    if(!password) return "";
    try {
        return crypto.createHmac('sha1',salt)
        .update(password)
        .digest("hex");
        
    } catch (error) {
        return "";
    }
}

module.exports = {encryptPassword}

