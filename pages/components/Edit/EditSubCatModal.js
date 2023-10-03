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
const EditCatModal = (props) => {
  const [Btnloading, setBtnloading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [CatID, setCatID] = useState(props.CatID);
  const [CatOrder, setCatOrder] = useState(props.CatOrder);
  const [Title, setTitle] = useState(props.Title);
  const [CatImg, setCatImg] = useState(props.CatImg);
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
    let FinalFileName = document.querySelector('#FinalFileName').value
    let FinalCatImg = ''
    if (Title !== '' && FinalFileName !== '') {
      setBtnloading(true)
      UpdateCat(FinalFileName)

    } else {
      alert('all fields are required');
    }


  };

  const UpdateCat = async (e) => {

    const sendUM = { imageUrl: e, name: Title, catid: CatID, JwtToken: Contextdata.JwtToken, CatOrder :CatOrder}
    const data = await fetch("/api/V3/Update/EditSubCat", {
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
        router.push('/ecommerce/Categories')

      })
  }
  return (
    <div>
      <div>
        <Button onClick={handleClickOpen('paper')}>Edit</Button>

        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Edit Sub Category : {Title}</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <form onSubmit={handleSubmit} >
              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="Category Title"
                  fullWidth
                  value={Title}
                  onInput={e => setTitle(e.target.value)}

                />
              </div>
              <div className={MYS.inputlogin}>
                <TextField
                  required
                  label="Category Order"
                  fullWidth
                  type='Number'
                  value={CatOrder}
                  onInput={e => setCatOrder(e.target.value)}

                />
              </div>

              <div className={MYS.featuresimagebox}>
                <div className={MYS.featuresimageboxA}>
                  <img
                    src={`${DO_SPACES_URL}${DO_SPACES_FOLDER}/${CatImg}`}
                    width={100}
                    height={100}
                    layout='responsive'
                    alt='img'
                    id="Fimage"

                  />
                  <div>
                    <small>features images</small>
                  </div>
                </div>
                <div className={MYS.featuresimageboxB}>
                  <UploadDoimg />
                </div>
              </div>
              <input type="hidden" value={CatImg} id="FinalFileName" />

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
              <span>Update</span>
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default EditCatModal
