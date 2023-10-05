const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    // phoneNumber:{
    //     type:String,
    //     required:true
    // },
    password:{
        type:String,
        required:true
    }
    
});

// UserSchema.methods.findById = function(id, callback) {
//     mongoose.model('User').findById(id, callback);
//   };

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(this.password, saltRounds);
      this.password = hashedPassword;
    }
    next();
});
const Users = new mongoose.model('User', UserSchema);
module.exports = Users;