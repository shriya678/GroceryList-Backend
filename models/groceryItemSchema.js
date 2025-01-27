
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    item: { type: String, required: true },
    count: { type: Number, required: true, default: 0 },
    isDone: { type: Boolean, default: false }
});

const Item = mongoose.model("Item", itemSchema);

export default Item; 
