import ItemLocation from '../models/itemLocation.model';
import Event from '../models/event.model';
import User from '../models/user.model';

export const add = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findOne({});

        const {item, to_location, quantity} = data;

        await ItemLocation.findOneAndUpdate({
            item: item,
            location: to_location
        }, {
            $inc: {quantity: quantity}
        }, {upsert: true}).lean();

        const newEvent = await new Event({
            ...data,
            action: "add",
            user: user
        }).save();

        return res.status(200).json({
            success: true,
            message: "New Inventory Event Created Successfully",
            data: newEvent
        });
    } catch (e) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const remove = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findOne({});

        const {item, from_location, quantity} = data;

        await ItemLocation.findOneAndUpdate({
            item: item,
            location: from_location
        }, {
            $inc: {quantity: quantity * -1}
        }).lean();

        const newEvent = await new Event({
            ...data,
            action: "remove",
            user: user
        }).save();

        return res.status(200).json({
            success: true,
            message: "New Inventory Event Created Successfully",
            data: newEvent
        });
    } catch (e) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const transfer = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findOne({});

        const {item, from_location, to_location, quantity} = data;

        await ItemLocation.findOneAndUpdate({
            item: item,
            location: from_location
        }, {
            $inc: {quantity: quantity * -1}
        }).lean();

        await ItemLocation.findOneAndUpdate({
            item: item,
            location: to_location
        }, {
            $inc: {quantity: quantity}
        }).lean();

        const newEvent = await new Event({
            ...data,
            action: "transfer",
            user: user
        }).save();

        return res.status(200).json({
            success: true,
            message: "New Inventory Event Created Successfully",
            data: newEvent
        });
    } catch (e) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const list = async (req, res) => {
    try {
        const listEvent = await Event.find({}).populate("user");
        for (const event of listEvent) {
            event.from_location && await event.populate("from_location");
            event.to_location && await event.populate("to_location");
        }
        return res.status(200).json({
            success: true,
            message: "Events loaded successfully",
            data: listEvent
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
