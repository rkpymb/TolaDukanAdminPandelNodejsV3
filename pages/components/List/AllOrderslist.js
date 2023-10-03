import React, { useState, useEffect, useContext } from 'react';
import { Card } from '@mui/material';
import Badge from '@mui/material/Badge';
import { useRouter } from 'next/router'
import Link from 'next/link';
import { LuArrowLeft } from "react-icons/lu";
import Avatar from '@mui/material/Avatar';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import MYS from '../../../Styles/mystyle.module.css'

import {
    IconButton,
    Divider,
    Box,
    FormControl,
    InputLabel,

    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableContainer,
    Select,
    styled,
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
            const sendUM = { JwtToken: Contextdata.JwtToken }
            const data = await fetch("/api/V3/List/AllOrderslist", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    console.log(parsed.ReqD)
                    setRetdata(parsed.ReqD)
                    setIsLoading(false)
                })
        }
        handleSubmit()


    }, [router.query])

    const theme = useTheme();

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    return (<>

        {!isLoading &&

            <div className={MYS.TitleWithBackHeader}>
                <div className={MYS.TitleWithBackHeaderA}>
                    <IconButton aria-label="cart" onClick={() => router.back()}>
                        <StyledBadge color="secondary" >
                            <LuArrowLeft />
                        </StyledBadge>
                    </IconButton>
                    <div>
                        <span>All Orders ({Retdata.length})</span>
                    </div>
                </div>
                <div>

                </div>
            </div>
        }

        <Card>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order Details</TableCell>
                            <TableCell>Date / Time</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Order Status</TableCell>
                            <TableCell>Payment</TableCell>
                            <TableCell>Action</TableCell>


                        </TableRow>
                    </TableHead>
                    {!isLoading &&
                        <TableBody>

                            {Retdata.map((item) => {
                                return <TableRow hover key={item._id}>
                                    <TableCell>
                                        <small style={{ fontSize: '10px', fontWeight: 500 }}>Order ID : <samll style={{ color: 'blue' }}>{item.orderdata._id}</samll></small>
                                        <div style={{ maxWidth: '220px' }}>
                                            <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                            >
                                                {item.orderdata.OrderTitle}
                                            </Typography>
                                            <div>
                                                <span>Total : ₹{item.orderdata.FinalItemAmt}</span>
                                           </div>
                                          
                                           
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span>{item.orderdata.date}</span>, <span>{item.orderdata.time}</span>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <span>{item.userdata.name}</span>
                                            
                                        </div>
                                        <div>
                                            <small>{item.userdata.mobile}</small>
                                            
                                        </div>

                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <span>{item.orderdata.OrderStatusText}</span>

                                        </div>
                                      
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <span>{item.orderdata.PayStatusText}</span>

                                        </div>
                                        <div>
                                            <small>{item.orderdata.PaymentType}</small>

                                        </div>

                                    </TableCell>
                                    <TableCell align="right">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Link href={`/Orders/ManageOrder/${item.orderdata._id}`} >
                                                <Button
                                                    size='small'
                                                    variant='outlined'
                                                    color='primary'
                                                >
                                                   Manage Order
                                                </Button>
                                            </Link>

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
