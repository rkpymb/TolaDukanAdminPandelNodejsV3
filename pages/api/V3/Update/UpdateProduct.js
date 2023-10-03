import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };
        axios.post(`${process.env.API_URL}admin/UpdateProduct`, { token: process.env.MYKEY, catid: req.body.catid, subcatid: req.body.subcatid, title: req.body.title, details: req.body.details, img: req.body.img, mprice: req.body.mprice, sprice: req.body.sprice, isActive: req.body.isActive, stock: req.body.stock, tagline: req.body.tagline, UnitText: req.body.UnitText, UnitNumber: req.body.UnitNumber, id: req.body.id }, { headers }).then((response) => {
            const senddta = response.data;
            res.status(200).json({ senddta })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}