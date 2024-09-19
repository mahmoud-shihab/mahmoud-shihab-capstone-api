import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const usersSchema = new Schema({
    name:String,
    email:String,
    password:String

});

const Users = model('users', usersSchema);
export default Users;