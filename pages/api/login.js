import axios from 'axios';

export default async function handler(req, res) {
    console.log(req.body);
    const { email, password } = req.body;

    try {
        const response = await axios.post('http://localhost:4000/login', { email, password });

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}