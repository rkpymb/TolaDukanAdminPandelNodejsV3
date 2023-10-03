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

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import { useRouter, useParams } from 'next/router'

import {
  
    TextField,
  
    styled
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
export default function ScrollDialog() {
    const [Btnloading, setBtnloading] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const [Catlist, setCatlist] = useState([]);
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
  
    const [open, setOpen] = useState(false);
    const [Mainimg, setMainimg] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png');
    const [scroll, setScroll] = useState('paper');
    const [Title, SetTitle] = useState('');

    const [MainCat, setMainCat] = React.useState('');

    const handleChangeMainCat = (event) => {
        setMainCat(event.target.value);
    };

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        GetCatlist()
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
        if (Title !== '' && FinalFileName !== '') {
            setBtnloading(true)
            AddCat(FinalFileName)
        } else {
            alert('all fields are required');
        }


    };


    const AddCat = async (e) => {
        
        const slug = Title.replace(/\s/g, '-'); 
        const sendUM = { imageUrl: e, name: Title, slug: slug, MainCat: MainCat, JwtToken: Contextdata.JwtToken }
        const data = await fetch("/api/V3/Add/AddSubcat", {
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
                if (parsed.ReqData.categories) {
                   
                    setOpen(false)
                    router.push('/ecommerce/Categories')
                } else {
                    alert('Something went wrong')
                }
               

            })
    }
    const GetCatlist = async () => {
    
        const sendUM = 1
        const data = await fetch("/api/V3/List/CatList", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
               
                if (parsed.ReqD.categories) {
                    setCatlist(parsed.ReqD.categories)
                    setisLoading(false)
                    
                } else {
                    alert('Something went wrong')
                }
               

            })
    }


    return (
        <div>
            <Button
                onClick={handleClickOpen('paper')}
                size="small"
                variant="outlined"
                startIcon={<AddTwoToneIcon fontSize="small" />}
            >
                Add new Sub Category
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Add new Sub Category</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>

                    <div className={MYS.featuresimagebox}>
                        <div className={MYS.featuresimageboxA}>
                            <img
                                src={`${Mainimg}`}
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
                    <form onSubmit={handleSubmit} >
                        {!isLoading &&
                            <div className={MYS.inputlogin}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Main Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={MainCat}
                                        label="Main Category"
                                        onChange={handleChangeMainCat}
                                    >
                                        {Catlist.map((item,index) => {
                                            return <MenuItem value={item.slug} key={item._id}>{index + 1} : {item.name}</MenuItem>
                                        }

                                        )}
                                      
                                        
                                    </Select>
                                </FormControl>
                            </div>
                        }

                        <div className={MYS.inputlogin}>
                            <TextField
                                required
                                label="Category Title"
                                fullWidth
                                value={Title}

                                onInput={e => SetTitle(e.target.value)}

                            />
                        </div>
                        <input type="hidden" id="FinalFileName" />

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