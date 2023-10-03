import React, { useState, useEffect, useContext } from 'react';
import { Card } from '@mui/material';

import { useRouter } from 'next/router'
import Link from 'next/link';
import Badge from '@mui/material/Badge';
import MYS from '../../../Styles/mystyle.module.css'
import Avatar from '@mui/material/Avatar';
import CheckloginContext from '../../../context/auth/CheckloginContext'

import { LuArrowLeft } from "react-icons/lu";
import {
    Tooltip,
    Divider,
    Box,
    FormControl,
    InputLabel,
    IconButton,
    styled,

    Button,
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
            const sendUM = { JwtToken: Contextdata.JwtToken }
            const data = await fetch("/api/V3/List/UsersList", {
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
                    setRetdata(parsed.ReqD.UL)
                    setIsLoading(false)
                })
        }
        handleSubmit()


    }, [router.query])

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    const theme = useTheme();

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
                        <span>TolaDukan all Users ({Retdata.length})</span>
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
                                <TableCell>User Name / Photo</TableCell>
                                <TableCell>Contact info</TableCell>
                                <TableCell>User Status</TableCell>
                                <TableCell>Date / Time</TableCell>
                                <TableCell>Action</TableCell>


                            </TableRow>
                        </TableHead>
                        {!isLoading &&
                            <TableBody>

                                {Retdata.map((item) => {
                                    return <TableRow hover key={item._id}>
                                        <TableCell>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <div style={{ maxWidth: '50px' }}>
                                                    <Avatar alt={item.name} src="/static/images/avatar/1.jpg" />

                                                </div>
                                                <div style={{marginLeft:'5px', maxWidth:'120px'}}>
                                                    <Typography
                                                        variant="body1"
                                                        fontWeight="bold"
                                                        color="text.primary"
                                                        gutterBottom
                                                        noWrap
                                                    >
                                                        {item.name}
                                                    </Typography>
                                               </div>
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
                                                {item.email}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                            >
                                                {item.mobile}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            { //Check if message failed
                                                (item.isActive)
                                                    ? <div> Active </div>
                                                    : <div> Deactivated </div>
                                            }
                                           

                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                variant="body1"
                                               
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                            >
                                                {item.date}, {item.time}
                                            </Typography>

                                        </TableCell>
                                        <TableCell align="right">
                                            <div style={{display:'flex', alignItems: 'center'}}>
                                                <Link href={`/Users/Profile/${item._id}`} >
                                                    <Button
                                                        size='small'
                                                        variant='outlined'
                                                        color='primary'
                                                    >
                                                       View Profile
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
