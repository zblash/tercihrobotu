import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CitiesSchema = new Schema({
   
    name: {
        type: String
    }
});