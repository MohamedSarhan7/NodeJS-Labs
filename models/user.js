const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    token: { type: String },
});


const model=mongoose.model('user',userSchema);
module.exports=model;