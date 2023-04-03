import axios from 'axios';

export default async function handler(req, res) {
    console.log(req.body);
    const { token } = req.body;

    try {
        const response = await axios.get(`http://localhost:4000/api/kehadiran`, { headers: { Authorization: `Bearer ${token}` } });

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}