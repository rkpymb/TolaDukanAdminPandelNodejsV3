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
export default function ScrollDialog({ OrderID, Mobile, MainAmt, TotalPaid }) {
    const [Btnloading, setBtnloading] = useState(false);
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
  
    const [open, setOpen] = useState(false);
    const [PaymentType, setPaymentType] = useState(null);
    const [PaymentMode, setPaymentMode] = useState(null);
    const [Title, setTitle] = useState('');
   
    const [scroll, setScroll] = useState('paper');
    const [PayStatusText, setPayStatusText] = useState(null);
    const [PayStatus, setPayStatus] = useState(null);
    const [Amount, setAmount] = useState(0);
    const [DuesAmount, setDuesAmount] = useState(0);
    const [FinalAmtTopaid, setFinalAmtTopaid] = useState(0);
    const [PaymentText, setPaymentText] = useState('');
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
    useEffect(() => {
        setDuesAmount(MainAmt - TotalPaid)
        
    });

    const handleSubmit = (e) => {
        e.preventDefault();
          
        if (Amount !== 0 && PaymentType !== null && PaymentMode !== null) {
            if (PaymentType == 'Paid') {
                if (DuesAmount == 0 ) {
                    alert('Total Payment Received, No dues')
                } else {
                    if (DuesAmount !== 0 && Amount > DuesAmount) {
                        alert('Please Enter Valid  Amount ')
                    } else {
                        setBtnloading(true)
                        Adddata()
                    }
                }

            }
            if (PaymentType == 'Refund') {
                if (Amount > TotalPaid) {
                    alert('Please Enter Valid  Amount ')
                } else {
                    setBtnloading(true)
                    Adddata()
                    
                }

            }


          
           
        } else {
            alert('all fields are required');
        }


    };


    const Adddata = async () => {

        const sendUM = { Mobile: Mobile, OrderID: OrderID, type: PaymentType, Mode: PaymentMode, Details: PaymentText, JwtToken: Contextdata.JwtToken, amt: Amount }
        const data = await fetch("/api/V3/Add/AddPayment", {
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
                console.log(parsed.ReqData)
                if (parsed.ReqData) {
                    UpdatePaymentStatus()
                    
                    
                } else {
                    alert('Something Went Wrong Try Again')
                }
               

            })
    }

    const UpdatePaymentStatus = async () => {

        const sendUM = { id: OrderID, PayStatus: PayStatus, PayStatusText: PayStatusText, JwtToken: Contextdata.JwtToken }
        const data = await fetch("/api/V3/Add/UpdatePaymentstatus", {
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
                    alert(`${PaymentType} Added Succsefully `)
                    router.push(`/Orders/ManageOrder/${OrderID}`)
                } else {
                    alert('Something Went Wrong Try Again')
                }


            })
    }
   
    const HandleChangePaymentType = (event) => {
        setPaymentType(event.target.value);
        
        if (event.target.value == 'Paid') {
            setPayStatus(1)
            setPayStatusText('Paid')
        }
        if (event.target.value == 'Refund') {
            setPayStatus(3)
            setPayStatusText('Refund')
        }
       
    };
    const HandleChangePaymentMode = (event) => {
        setPaymentMode(event.target.value);
      
    };

    return (
        <div>
            <Button
                onClick={handleClickOpen('paper')}
                size="small"
                variant="outlined"
                startIcon={<AddTwoToneIcon fontSize="small" />}
            >
                Add Payment or Refund
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Add New Payment or Refund</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>


                    <form onSubmit={handleSubmit} >
                        <div className={MYS.inputlogin}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Payment Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={PaymentType}
                                    label="Select Payment Type"
                                    onChange={HandleChangePaymentType}
                                >
                                    <MenuItem value={`Paid`}>1 Paid</MenuItem>
                                    <MenuItem value={`Refund`}>2 Refund</MenuItem>
                                    
                                </Select>
                              
                             
                              
                
                            </FormControl>
                        </div>
                        <div className={MYS.inputlogin}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Payment Mode</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={PaymentMode}
                                    label="Select Payment Type"
                                    onChange={HandleChangePaymentMode}
                                >
                                    <MenuItem value="Cash">Cash</MenuItem>
                                    <MenuItem value='Online'>Online</MenuItem>
                                
                                </Select>
                              
    
                            </FormControl>
                        </div>
                        <div className={MYS.inputlogin}>
                            <TextField
                                required
                                label="Amount"
                                fullWidth
                                value={Amount}
                                type='Number'
                                onInput={e => setAmount(e.target.value)}
                            />
                        </div>
                        <div className={MYS.inputlogin}>
                            <TextField
                                required
                                label="Details"
                                fullWidth
                                value={PaymentText}
                                onInput={e => setPaymentText(e.target.value)}

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