import Location from '../models/location.model';
import ItemLocation from "../models/itemLocation.model";

export const create = async (req, res) => {
    try {
        const data = req.body;

        const newLocation = await new Location(data).save();
        return res.status(200).json({
            success: true,
            message: "New Location Created Successfully",
            data: newLocation
        });
    } catch (e) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const list = async (req, res) => {
    try {
        const listLocation = await Location.find({});
        return res.status(200).json({
            success: true,
            message: "Locations loaded successfully",
            data: listLocation
        })
    } catch (e) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const retrieve = async (req, res) => {
    try {
        const locationId = req.params.id;

        const location = await Location.findOne({_id: locationId});
        return res.status(200).json({
            success: true,
            message: "Location loaded successfully",
            data: location
        })
    } catch (e) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const inventory = async (req, res) => {
    try {
        const locationId = req.params.id;

        const item = await ItemLocation.find({ location: locationId}).populate("item");
        return res.status(200).json({
            success: true,
            message: "Location Inventory loaded successfully",
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
        const locationId = req.params.id;
        if (!locationId) {
            return res.status(400).json({
                message: "Location ID is required"
            });
        }
        const response = await Location.findOneAndUpdate({_id: locationId}, {
            $set: req.body
        }, {new: true}).lean();
        return res.status(200).json({
            success: true,
            message: "Location updated successfully",
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
        const locationId = req.params.id;
        if (!locationId) {
            return res.status(400).json({
                message: "Location ID is required"
            });
        }
        await Location.findOneAndDelete({_id: locationId});

        return res.status(200).json({
            success: true,
            message: "Location deleted successfully"
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal server Error"
        });
    }
};