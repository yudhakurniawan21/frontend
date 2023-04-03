import axios from 'axios';

export default async function handler(req, res) {
    console.log(req.body);
    const { users_id, tanggal, jam, status, token } = req.body;

    try {
        const response = await axios.post('http://localhost:4000/api/kehadiran', { users_id, tanggal, jam, status }, { headers: { Authorization: `Bearer ${token}` } });

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}