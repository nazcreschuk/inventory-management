import mongoose from 'mongoose';

const ItemLocationSchema = new mongoose.Schema({
    item: {type: mongoose.Schema.ObjectId, ref: 'Item'},
    location: {type: mongoose.Schema.ObjectId, ref: 'Location'},
    quantity: {type: Number, required: true}
});

ItemLocationSchema.index({item: 1, location: 1}, {unique: true})

export default mongoose.model('ItemLocation', ItemLocationSchema);
