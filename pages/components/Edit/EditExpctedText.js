import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import UploadDoimg from '../UploadDo/UploadDoimg'

import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

import { useRouter, useParams } from 'next/router'
import { DO_SPACES_URL, DO_SPACES_FOLDER } from '../../../Data/config'
import MYS from '../../../Styles/mystyle.module.css'
import {
  Tooltip,
  IconButton,
  TextField,
  useTheme,
} from '@mui/material';
import CheckloginContext from '../../../context/auth/CheckloginContext'
const EditCatModal = ({TitleMain, OrderIDMain}) => {
  const [Btnloading, setBtnloading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [OrderID, setOrderID] = useState(OrderIDMain);
 
  const [Title, setTitle] = useState(TitleMain);
  
  const Contextdata = useContext(CheckloginContext)
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  const router = useRouter()
  const handleClose = () => {
    setOpen(false);
  };
  const descriptionElementRef = React.useRef(null);
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
   
    if (Title !== '') {
      setBtnloading(true)
      UpdateNote()

    } else {
      alert('all fields are required');
    }


  };

  const UpdateNote = async () => {

    const sendUM = { Title: Title, OrderID: OrderID, JwtToken: Contextdata.JwtToken }
    const data = await fetch("/api/V3/Update/UpdateNote", {
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
        console.log(parsed);
        setOpen(false)
        alert('Delivery note updated successfully')
        router.push(`/Orders/ManageOrder/${OrderID}`)

      })
  }

 
  return (
    <div>
      <div>
        <Button onClick={handleClickOpen('paper')} size="small">Edit</Button>

        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
         
          <DialogContent dividers={scroll === 'paper'}>
            <form onSubmit={handleSubmit} >
              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="Enter Delivery note"
                  fullWidth
                  value={Title}
                  onInput={e => setTitle(e.target.value)}

                />
              </div>
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
              <span>Update</span>
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default EditCatModal
