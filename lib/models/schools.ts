import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const SchoolsSchema = new Schema({
    city: {
        type: String
    },
    name: {
        type: String
    }
});