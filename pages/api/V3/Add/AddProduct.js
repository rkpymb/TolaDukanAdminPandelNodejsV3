import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };
        axios.post(`${process.env.API_URL}admin/CreateProduct`, { token: process.env.MYKEY, pid: req.body.pid, catid: req.body.catid, subcatid: req.body.Subcatid, title: req.body.title, details: req.body.details, img: req.body.img, mprice: req.body.mprice, sprice: req.body.sprice, isActive: req.body.isActive, stock: req.body.stock, tagline: req.body.tagline, UnitText: req.body.Unittext, UnitNumber: req.body.Unit }, { headers }).then((response) => {
            const senddta = response.data;
            res.status(200).json({ senddta })

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}