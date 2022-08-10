import { fetchData } from "/cmd/latest.js";

export default async (req, res) => {
    const { name } = req.query;
    try {
        const data = await fetchData(name);
        res.status(200).json({ status: 1, data: data });
    } catch (e) {
        res.status(400).json({ status: 0, message: e });
    }
};
