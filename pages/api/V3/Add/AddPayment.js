import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
        };

        axios.post(`${process.env.API_URL}admin/AddPayment`, { token: process.env.MYKEY, Mobile: req.body.Mobile, OrderID: req.body.OrderID, type: req.body.type, Mode: req.body.Mode, Details: req.body.Details, amt: req.body.amt }, { headers }).then((response) => {
            res.status(200).json({ ReqData: response.data });
        });

    } else {
        res.status(200).json({ ReqS: ReqStatus });
    }
}