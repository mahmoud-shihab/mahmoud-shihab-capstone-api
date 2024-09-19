import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const sheetsSchema = new Schema({
    user:String,
    sheet_name:String,
    character_sheet:Array

});

const Sheets = model('sheets', sheetsSchema);
export default Sheets;