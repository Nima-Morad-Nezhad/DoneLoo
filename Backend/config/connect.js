const mongoose = require("mongoose");

main().then(()=> {console.log("connected to the DB")}).catch(err => console.log("Is not able to connect" ,err));
async function main(){
    await mongoose.connect(process.env.MONGO_DB)
}
module.exports = main;