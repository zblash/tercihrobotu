import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const DepartmentsSchema = new Schema({
    type: {
        type: String
    },
    name: {
        type: String
    }
});