import { startups } from "../data/data.js"

export const getAllData = (req, res) => {
    const { field, value } = req.params;

    const allowedFields = ['name', 'description', 'industry', 'country', 'continent', 'is_seeking_funding', 'has_mvp'];
    if (!allowedFields.includes(field)) {
        return res.status(400).json({ error: 'Invalid field parameter' });
    }

    const filteredData = startups.filter((startup) => {
        return startup[field] && startup[field].toLowerCase() === value.toLowerCase();
    });
    res.json(filteredData);
}