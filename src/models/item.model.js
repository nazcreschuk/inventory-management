import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    code: { type: String, required: true},
    description: { type: String},
    brand: { type: String, required: true},
    manufacture: {type: String, required: true},
    sku: {type: String, required: true},
});

export default mongoose.model('Item', ItemSchema);
