import React, { useState, useEffect, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import DialogTitle from '@mui/material/DialogTitle';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import MYS from '../../../Styles/mystyle.module.css'
import UploadDoimg from '../UploadDo/UploadDoimg'
import { Toast } from 'primereact/toast';
import { useRouter, useParams } from 'next/router'
import InputLabel from '@mui/material/InputLabel';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
    FormControl,
    TextField,
  
    styled
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
export default function ScrollDialog({ OrderID, Mobile }) {
    const [Btnloading, setBtnloading] = useState(false);
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
  
    const [open, setOpen] = useState(false);
    const [SelctedStatusNum, setSelctedStatusNum] = useState(null);
    const [Title, setTitle] = useState('');
    const [Mainimg, setMainimg] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png');
    const [scroll, setScroll] = useState('paper');
    const [ActivitySummary, setActivitySummary] = useState('');
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (ActivitySummary !== '' && SelctedStatusNum !== null) {
            setBtnloading(true)
            AddActivity()
        } else {
            alert('all fields are required');
        }


    };


    const AddActivity = async () => {

        const sendUM = { Mobile: Mobile, OrderID: OrderID, Status: SelctedStatusNum, OrderText: Title, Details: ActivitySummary, JwtToken: Contextdata.JwtToken }
        const data = await fetch("/api/V3/Add/AddActivity", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                setBtnloading(false)
                if (parsed.ReqData.OrderStatusData) {
                    UpdateOrder()
                } else {
                    alert('Something Went Wrong Try Again')
                }
               

            })
    }
    const UpdateOrder = async () => {

        const sendUM = { id: OrderID, OrderStatus: SelctedStatusNum, OrderStatusText: Title, JwtToken: Contextdata.JwtToken }
        const data = await fetch("/api/V3/Add/UpdateOrder", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                setBtnloading(false)
                console.log(parsed)
                if (parsed.ReqData.Done) {
                    setOpen(false)
                    alert('Activity updated successfully')
                    router.push(`/Orders/ManageOrder/${OrderID}`)
                } else {
                    alert('Something Went Wrong Try Again')
                }
               

            })
    }
    const HandleChangeSelctedStatusNum = (event) => {
        setSelctedStatusNum(event.target.value);
        console.log(event.target.value)
        if (event.target.value === 1) {
            setTitle('Order Accepted')
            setActivitySummary('Your Order is Accepted')
        }
      
        if (event.target.value === 2) {
            setTitle('Preparing Order')
            setActivitySummary('Preparing Your Order')
        }
        if (event.target.value === 3) {
            setTitle('On the Way')
            setActivitySummary('Your Order is On the Way')
        }
        if (event.target.value === 4) {
            setTitle('Out For Delivery')
            setActivitySummary('Your Order is Out For Delivery')
        }
        if (event.target.value === 5) {
            setTitle('Delivered')
            setActivitySummary('Order Delivered')
        }
        if (event.target.value === 6) {
            setTitle('Order Rejected ')
            setActivitySummary('Your Order is Rejected')
        }
        
       
        
        if (event.target.value === 7) {
            setTitle('Cancel order')
            setActivitySummary('')
        }
        if (event.target.value === 8) {
            setTitle('Return')
            setActivitySummary('')
        }
        if (event.target.value === 9) {
            setTitle('Refund')
            setActivitySummary('')
        }
       
    };

    return (
        <div>
            <Button
                onClick={handleClickOpen('paper')}
                size="small"
                variant="outlined"
                startIcon={<AddTwoToneIcon fontSize="small" />}
            >
                Add Activity
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Add new order Activity</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>


                    <form onSubmit={handleSubmit} >
                        <div className={MYS.inputlogin}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Activity</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={SelctedStatusNum}
                                    label="Select Activity"
                                    onChange={HandleChangeSelctedStatusNum}
                                >
                                    <MenuItem value={1}>1 Accept Order</MenuItem>
                                    <MenuItem value={2}>2 Preparing Order</MenuItem>
                                    <MenuItem value={3}>3 On the Way</MenuItem>
                                    <MenuItem value={4}>4 Out For Delivery</MenuItem>
                                    <MenuItem value={5}>5 Delivered</MenuItem>
                                    <MenuItem value={6}>6 Reject Order</MenuItem>
                                    <MenuItem value={7}>7 Cancel order</MenuItem>
                                    <MenuItem value={8}>8 Return</MenuItem>
                                    <MenuItem value={9}>9 Refund</MenuItem>
                                </Select>
                              
                             
                              
                
                            </FormControl>
                        </div>
                        <div className={MYS.inputlogin}>
                            <TextField
                                required
                                label="Activity summary"
                                fullWidth
                                value={ActivitySummary}

                                onInput={e => setActivitySummary(e.target.value)}

                            />
                        </div>
                       

                        <div style={{ minHeight: 25 }}></div>

                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <LoadingButton
                        size="small"
                        onClick={handleSubmit}
                        endIcon={<SendIcon />}
                        loading={Btnloading}
                        loadingPosition="end"
                        variant="contained"
                    >
                        <span>Save</span>
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}