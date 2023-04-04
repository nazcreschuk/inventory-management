import Item from '../models/item.model';
import ItemLocation from '../models/itemLocation.model';

export const create = async (req, res) => {
    try {
        const data = req.body;

        const newItem = await new Item(data).save();
        return res.status(200).json({
            success: true,
            message: "New Item Created Successfully",
            data: newItem
        });
    } catch (e) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const list = async (req, res) => {
    try {
        const listItem = await Item.find({});
        return res.status(200).json({
            success: true,
            message: "Items loaded successfully",
            data: listItem
        })
    } catch (e) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const retrieve = async (req, res) => {
    try {
        const itemId = req.params.id;

        const item = await Item.findOne({_id: itemId});
        return res.status(200).json({
            success: true,
            message: "Item loaded successfully",
            data: item
        })
    } catch (e) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const inventory = async (req, res) => {
    try {
        const itemId = req.params.id;

        const item = await ItemLocation.find({ item: itemId}).populate("location");
        return res.status(200).json({
            success: true,
            message: "Item Inventory loaded successfully",
            data: item
        })
    } catch (e) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const update = async (req, res) => {
    try {
        const itemId = req.params.id;
        if (!itemId) {
            return res.status(400).json({
                message: "Item ID is required"
            });
        }
        const response = await Item.findOneAndUpdate({_id: itemId}, {
            $set: req.body
        }, {new: true}).lean();
        return res.status(200).json({
            success: true,
            message: "Item updated successfully",
            data: response
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "error",
            data: e
        });
    }
};

export const deleteItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        if (!itemId) {
            return res.status(400).json({
                message: "Item ID is required"
            });
        }
        await Item.findOneAndDelete({_id: itemId});

        return res.status(200).json({
            success: true,
            message: "Item deleted successfully"
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal server Error"
        });
    }
};