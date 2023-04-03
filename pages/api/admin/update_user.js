import axios from 'axios';

import middleware from '@/lib/middleware'
import nextConnect from 'next-connect'
import * as fs from 'fs/promises';
import FormData from 'form-data'

const handler = nextConnect()
handler.use(middleware)

handler.post(async (req, res) => {
    console.log(req.body)
    console.log(req.files)
    const { id, email, password, job, phone, name, token } = req.body;
    const { photo } = req.files;

    console.log(photo[0].path);

    try {
        const image = await fs.readFile(photo[0].path)

        const data = new FormData()
        data.append('email', email.toString());
        data.append('password', password.toString());
        data.append('job', job.toString());
        data.append('phone', phone.toString());
        data.append('name', name.toString());
        data.append('photo', image, { filename: 'avatar.png' })

        const response = await axios.post(`http://localhost:4000/user/update/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } });

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export const config = {
    api: {
        bodyParser: false
    }
}

export default handler;
