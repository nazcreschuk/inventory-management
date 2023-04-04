import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.ObjectId, ref: 'Item', required: true},
    from_location: { type: mongoose.Schema.ObjectId, ref: 'Location'},
    to_location: { type: mongoose.Schema.ObjectId, ref: 'Location'},
    action: { type: String, required: true},
    quantity: { type: Number, required: true},
    datetime:  { type: Date, default: Date.now},
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true},
});

export default mongoose.model('Event', EventSchema);
