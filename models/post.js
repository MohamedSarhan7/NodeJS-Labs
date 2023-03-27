const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    title: { type: String },
    body: { type: String},
    author: { type: mongoose.Schema.Types.ObjectId, ref:'user'},
});


const model = mongoose.model('post', postSchema);
module.exports = model;