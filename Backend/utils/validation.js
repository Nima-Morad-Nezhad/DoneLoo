const mongoose = require("mongoose");

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        );
};


const validateObjectId = (string) => {
    return mongoose.Types.ObjectId.isValid(string);
}

module.exports = {
    validateEmail,
    validateObjectId,
}