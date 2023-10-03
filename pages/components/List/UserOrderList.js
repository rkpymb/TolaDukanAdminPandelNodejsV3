import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router'
import Link from 'next/link';

import MYS from '../../../Styles/mystyle.module.css'

import Button from '@mui/material/Button';
import UserOrdeLoader from './Loaders/UserOrdeLoader'
import Chip from '@mui/material/Chip';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import { LuTruck, LuArrowLeft } from "react-icons/lu";
import { FiArrowRight } from "react-icons/fi";
import { BsCurrencyRupee } from "react-icons/bs";
import Badge from '@mui/material/Badge';
import Image from 'next/image';
import {
    Card,
    styled,

    IconButton,

    useTheme,

} from '@mui/material';

function RecentOrders({ usermobile }) {
    const Contextdata = useContext(CheckloginContext)
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalAmount, setTotalAmount] = useState(0);
    const [deliveredOrdersCount, setDeliveredOrdersCount] = useState(0);
    const router = useRouter()
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

   
    useEffect(() => {
        GetOrderList()
        

    }, [router.query]);

    const GetOrderList = async () => {

        const sendUser = { JwtToken: Contextdata.JwtToken, usermobile: usermobile }
        const data = fetch("/api/V3/List/UserOrderList", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUser)
        }).then((a) => {
            return a.json();
        })
            .then((parsedUser) => {
                setRetdata(parsedUser.ReqD.ordersList)

                setIsLoading(false)
                const calculatedDeliveredOrdersCount = calculateDeliveredOrders(parsedUser.ReqD.ordersList);
                
                const calculatedTotalAmount = calculateTotalAmount(parsedUser.ReqD.ordersList);
                setDeliveredOrdersCount(calculatedDeliveredOrdersCount);
                setTotalAmount(calculatedTotalAmount);

            })
    }

   
    const theme = useTheme();

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));


    function calculateTotalAmount(orders) {
        return orders.reduce((total, order) => total + order.FinalItemAmt, 0);
    }

    function calculateDeliveredOrders(orders) {
        return orders.filter(order => order.OrderStatus === 5).length;
    }


   
    const deliveredOrders = Retdata.filter((order) => order.OrderStatus === 5);
    const totalAmountOfDeliveredOrders = deliveredOrders.reduce((accumulator, order) => accumulator + order.FinalItemAmt, 0);


    return (

        <>
            <div style={{ minHeight: '10px' }}></div>
            {!isLoading &&
                <div>
                  
                    <div className={MYS.UserCounterGid}>
                        <div className={MYS.UserCounterItem}>
                            <div className={MYS.UserCounterItemA}>
                                <span>{deliveredOrdersCount}</span>
                                <small>Orders delivered</small>
                            </div>
                            <div className={MYS.Counterimage}>
                                <Image
                                    src={`/received.png`}
                                    alt="image"
                                    layout="responsive"
                                    placeholder='blur'
                                    width={50}
                                    height={50}
                                    quality={100}
                                    blurDataURL={blurredImageData}

                                />
                            </div>
                        </div>
                        <div className={MYS.UserCounterItem}>
                            <div className={MYS.UserCounterItemA}>
                                <span>₹{totalAmountOfDeliveredOrders}</span>
                              <small>Amount Spends</small>
                            </div>
                            <div className={MYS.Counterimage}>
                                <Image
                                    src={`/get-money.png`}
                                    alt="image"
                                    layout="responsive"
                                    placeholder='blur'
                                    width={50}
                                    height={50}
                                    quality={100}
                                    blurDataURL={blurredImageData}

                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div style={{ minHeight: '20px' }}></div>
            <div>
                <div> <span style={{ fontWeight: 600 }}>All orders ({Retdata.length})</span></div>
            </div>
            {!isLoading &&
                <div className={MYS.OrderItemListGrid}>
                    {Retdata.map((item, index) => {
                        return <div className={MYS.OrderItemList} key={item._id}>
                            <div className={MYS.OrderItemListA}>
                                <div>
                                    <span style={{ fontSize: '8px', fontWeight: 600 }}>ORDER ID : {item._id}</span>
                                </div>
                                <div>
                                    <span style={{ fontWeight: 600 }}>{item.OrderTitle.slice(0, 100) + '...'}</span>
                                </div>
                                <div style={{ minHeight: '10px' }}></div>
                                <div>
                                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#605957' }}>
                                        ₹{item.TotalItemAmt} <small style={{ fontSize: '10px' }}>+ {item.Deliveryfee} (Delivery fee)</small>
                                    </span>


                                </div>
                                <div>
                                    <span style={{ fontSize: '10px', fontWeight: 600 }}>Order date : {item.date},{item.time}</span>
                                </div>
                                <div style={{ minHeight: '10px' }}></div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Chip icon={<LuTruck size={20} />} label={item.OrderStatusText} variant="outlined" />
                                    <div style={{ width: '10px' }}></div>
                                    <Chip icon={<BsCurrencyRupee size={20} />} label={item.PaymentType} variant="outlined" />



                                </div>
                                <div style={{ minHeight: '10px' }}></div>
                                <div>
                                    <div className={MYS.DeliveryTime}>
                                        {item.ExpectedDelivery}
                                    </div>
                                </div>
                                <div style={{ minHeight: '10px' }}></div>
                               

                            </div>
                            <div className={MYS.TrackBtnOrd}>
                                <Link href={`/Orders/ManageOrder/${item._id}`} >
                                    <Button variant="outlined" size='small' startIcon={<FiArrowRight />}>
                                        View details
                                    </Button>
                                </Link>
                               
                            </div>
                        </div>
                    }

                    )}

                </div>

            }

           
            {isLoading && 
                <div>
                    <UserOrdeLoader/>
            </div>
            }

        </>
    );
}

export default RecentOrders;
