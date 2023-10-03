import React, { useState, useEffect, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import MYS from '../../../Styles/mystyle.module.css'
import UploadDoimg from '../UploadDo/UploadDoimg'
import { Toast } from 'primereact/toast';
import { useRouter, useParams } from 'next/router'
import Image from 'next/image';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import Select from '@mui/material/Select';
import { DO_SPACES_URL, DO_SPACES_FOLDER } from '../../../Data/config'
import {
    Box,

    Container,
    Grid,
    CardHeader,
    CardContent,
    Card,
    Typography,
    TextField,
    Divider,

    FormControl,
    OutlinedInput,
    InputAdornment,
    styled
} from '@mui/material';
export default function ScrollDialog() {
    const Contextdata = useContext(CheckloginContext)
    const [Btnloading, setBtnloading] = useState(false);
    const router = useRouter()
    const toast = useRef(null);
    const [open, setOpen] = useState(false);
    const [Mainimg, setMainimg] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png');
    const [scroll, setScroll] = useState('paper');
    const [Title, setTitle] = useState('');
    const [Details, setDetails] = useState('');
    const [Stock, setStock] = useState(100);
    const [IsActive, setIsActive] = useState(false);
    const [Date, setDate] = useState('');
    const [Unittext, setUnittext] = useState('');
    const [Unit, setUnit] = useState(0);
    const [Time, setTime] = useState('');
    const [Category, setCategory] = useState('');
    const [SubCategory, setSubCategory] = useState('');
    const [Sprice, setSprice] = useState('');
    const [Mprice, setMprice] = useState('');
    const [Duration, setDuration] = useState('');
    const [Tagline, setTagline] = useState('');
    const [Taglinetwo, setTaglinetwo] = useState('');
    const [IsFree, setIsFree] = useState('');
    const [CatListdata, setCatListdata] = useState([]);
    const [SubCatListdata, setSubCatListdata] = useState([]);
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
        let FinalFileName = document.querySelector('#FinalFileName').value
        if (Title !== '' && FinalFileName !== '' && Category !== '' && Sprice !== '' && Mprice !== '' && Tagline !== '' && SubCategory !== '' && Unit !== 0 && Unittext !== '') {
            AddTs(FinalFileName)
            setBtnloading(true)

        } else {
            alert('all fields are required');
        }


    };
 
    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };
    const handleChangeSubCategory = (event) => {
        setSubCategory(event.target.value);
    };


    const AddTs = async (e) => {
        const Pid = Title.replace(/\s/g, '-');
        const sendUM = { pid: Pid, catid: Category, Subcatid: SubCategory, title: Title, details: Details, img: e, mprice: Mprice, sprice: Sprice, isActive: IsActive, stock: Stock, tagline: Tagline, Unit: Unit, Unittext: Unittext, JwtToken: Contextdata.JwtToken }
        const data = await fetch("/api/V3/Add/AddProduct", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                console.log(parsed)
                if (parsed.senddta) {
                    setOpen(false)
                    setBtnloading(false)
                    router.push('/ecommerce/Products')
                }

            })
    }
    useEffect(() => {
       
        const handleSubmit = async () => {
            const dataid = '08c5th4rh86ht57h6g';
            const sendUM = { dataid }
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
                    Subcatlist()
                    setCatListdata(parsed.ReqD.categories)
                   
                })
        }
        const Subcatlist = async () => {
            const dataid = '08c5th4rh86ht57h6g';
            const sendUM = { dataid }
            const data = await fetch("/api/V3/List/SubCategoriesList", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    setSubCatListdata(parsed.ReqD.categories)
                   
                })
        }
        handleSubmit()


    },[])

    return (
        <div>
            <Button
                onClick={handleClickOpen('paper')}
                size="small"
                variant="outlined"
                startIcon={<AddTwoToneIcon fontSize="small" />}
            >
                Add new Product
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Add new Product</DialogTitle>
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
                        <div className={MYS.inputlogin}>
                            <TextField
                                required
                                label="Title"
                                fullWidth
                                value={Title}

                                onInput={e => setTitle(e.target.value)}

                            />
                        </div>
                        <div className={MYS.inputlogin}>
                            <TextField
                                required
                                label="Full Details"
                                fullWidth
                                value={Details}

                                onInput={e => setDetails(e.target.value)}

                            />
                        </div>
                       
                        <div className={MYS.inputlogin}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Main Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={Category}
                                    label="Select Category"
                                    onChange={handleChangeCategory}
                                >
                                    {CatListdata.map((item) => {
                                        return <MenuItem value={item.slug}>{item.name}</MenuItem>


                                    }

                                    )}
                                    
                                   

                                </Select>
                            </FormControl>
                        </div>
                        <div className={MYS.inputlogin}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={SubCategory}
                                    label="Select Category"
                                    onChange={handleChangeSubCategory}
                                >
                                    {SubCatListdata.map((item) => {
                                        return <MenuItem value={item.slug}>{item.name}</MenuItem>


                                    }

                                    )}
                                    
                                   

                                </Select>
                            </FormControl>
                        </div>

                        <div className={MYS.inputlogin}>
                            <TextField
                                required
                                label="Main price"
                                fullWidth
                                type='number'
                                value={Mprice}

                                onInput={e => setMprice(e.target.value)}

                            />
                        </div>
                        <div className={MYS.inputlogin}>
                            <TextField
                                required
                                label="Sale price"
                                fullWidth
                                type='number'
                                value={Sprice}

                                onInput={e => setSprice(e.target.value)}

                            />
                        </div>
                        <div className={MYS.inputlogin}>
                            <TextField
                                required
                                label="stock"
                                fullWidth
                                type='number'
                                value={Stock}

                                onInput={e => setStock(e.target.value)}

                            />
                        </div>
                        <div className={MYS.inputlogin}>
                            <TextField
                                required
                                label="Unit in Number"
                                fullWidth
                                value={Unit}

                                onInput={e => setUnit(e.target.value)}

                            />
                        </div>
                        <div className={MYS.inputlogin}>
                            <TextField
                                required
                                label="Unit in Text"
                                fullWidth
                                value={Unittext}

                                onInput={e => setUnittext(e.target.value)}

                            />
                        </div>
                        <div className={MYS.inputlogin}>
                            <TextField
                                required
                                label="Tagline"
                                fullWidth
                                value={Tagline}

                                onInput={e => setTagline(e.target.value)}

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