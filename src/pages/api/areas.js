import { getAreas } from "../../app/services/property.service.js";

const areasHandler = async (req, res) => {
    try {
        const areas = await getAreas();
        res.status(200).json(areas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default areasHandler;
