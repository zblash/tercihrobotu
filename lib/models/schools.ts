import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const SchoolsSchema = new Schema({
   
    name: {
        type: String
    }
});