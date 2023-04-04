import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
    name: { type: String, required: true},
    type: { type: String, required: true}
});

export default mongoose.model('Location',LocationSchema);
