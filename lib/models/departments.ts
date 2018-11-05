import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const DepartmentsSchema = new Schema({
   
    name: {
        type: String
    }
});