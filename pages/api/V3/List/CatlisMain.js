import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}admin/getCategories`, { token: process.env.MYKEY}, { headers }).then((response) => {
            const CatData = response.data;
            res.status(200).json({ CatData })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}