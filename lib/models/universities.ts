import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UniversitiesSchema = new Schema({
    id: {
        type: Number
    },
    tur: {
        type: String
    },
    eskitur: {
        type: String            
    },
    kod: {
        type: String            
    },
    okul: {
        type: String            
    },
    sehir: {
        type: String            
    },
    bolum: {
        type: String            
    },
    fakulte: {
        type: String            
    },
    ekbilgi: {
        type: String            
    },
    puan: {
        type: Number            
    },
    eskisira: {
        type: Number            
    },
    sure: {
        type: Number            
    },
    eskikont: {
        type: Number            
    },
    ogrencisayisi: {
        type: Number            
    },
    okulbir: {
        type: Number            
    },
    yerlesen: {
        type: Number            
    },
    ozelkosullar: {
        type: String            
    }
});