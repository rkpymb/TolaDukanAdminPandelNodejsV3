import React, { useState, useEffect, useContext } from 'react';
import { Card } from '@mui/material';
import CatTable from './Extra/CatTable';
import { subDays } from 'date-fns';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Label from 'src/components/Label';
import Image from 'next/image';
import EditCatModal from '../Edit/EditCatModal'
import EditSubCatModal from '../Edit/EditSubCatModal'
import CheckloginContext from '../../../context/auth/CheckloginContext'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



import { DO_SPACES_URL, DO_SPACES_FOLDER } from '../../../Data/config'

import {
    Tooltip,
    Divider,
    Box,
    FormControl,
    InputLabel,

    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableContainer,
    Select,
    MenuItem,
    Typography,
    useTheme,
    CardHeader
} from '@mui/material';

function RecentOrders() {
    const Contextdata = useContext(CheckloginContext)
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    useEffect(() => {

        const handleSubmit = async () => {
            const dataid = '08c5th4rh86ht57h6g';
            const sendUM = { JwtToken: Contextdata.JwtToken }
            const data = await fetch("/api/V3/List/CatlisMain", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    setRetdata(parsed.CatData)
                    setIsLoading(false)
                })
        }
        handleSubmit()


    }, [router.query])

    const theme = useTheme();

    return (<>
            <Card>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Cat Image</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Sub Category</TableCell>
                                <TableCell>Action</TableCell>


                            </TableRow>
                        </TableHead>
                        {!isLoading &&
                            <TableBody>

                                {Retdata.map((item) => {
                                    return <TableRow hover key={item.category._id}>
                                        <TableCell>
                                            <div style={{maxWidth:'50px'}}>
                                                <Image
                                                    src={`${DO_SPACES_URL}${DO_SPACES_FOLDER}/${item.category.image}`}
                                                    width={100}
                                                    height={100}
                                                    layout='responsive'
                                                    alt='img'

                                                />
                                            </div>
                                           
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                            >
                                                {item.category.name}
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <div>
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                    >
                                                        <Typography>{item.subcategories.length}</Typography>
                                                    </AccordionSummary>
                                                    <div style={{ backgroundColor:'#F5EEF8'}}>
                                                        {item.subcategories.map((subcategory) => {
                                                            return <div>

                                                                <TableRow hover key={subcategory._id}>
                                                                    <TableCell>
                                                                        <div style={{ width: '50px', height:'50px' }}>
                                                                            <Image
                                                                                src={`${DO_SPACES_URL}${DO_SPACES_FOLDER}/${subcategory.image}`}
                                                                                width={100}
                                                                                height={100}
                                                                                layout='responsive'
                                                                                alt='img'

                                                                            />
                                                                           
                                                                        </div>

                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Typography
                                                                            variant="body1"
                                                                            fontWeight="bold"
                                                                            color="text.primary"
                                                                            gutterBottom
                                                                            noWrap
                                                                        >
                                                                            {subcategory.name}
                                                                        </Typography>
                                                                    </TableCell>

                                                                   
                                                                    <TableCell align="left">
                                                                        <div style={{ display: 'flex', alignItems: 'center' }}>

                                                                            <EditSubCatModal CatID={subcategory._id} Title={subcategory.name} CatImg={subcategory.image} CatOrder={subcategory.order} />
                                                                        </div>

                                                                    </TableCell>
                                                                </TableRow>
                                                            </div>
                                                        }

                                                        )}
                                                    </div>
                                                </Accordion>
                                            </div>

                                        </TableCell>
                                        <TableCell align="right">
                                            <div style={{display:'flex', alignItems: 'center'}}>
                                                <EditCatModal CatID={item.category._id} Title={item.category.name} CatImg={item.category.image} CatOrder={item.category.order} />
                                          </div>
                                           
                                        </TableCell>


                                    </TableRow>
                                }

                                )}
                            </TableBody>

                        }



                    </Table>
                </TableContainer>
            </Card>

        </>
    );
}

export default RecentOrders;
