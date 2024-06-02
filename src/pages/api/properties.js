import { getProperties } from "../../app/services/property.service.js";

const handler = async (req, res) => {
    try {
        const properties = await getProperties(req.query);
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default handler;
