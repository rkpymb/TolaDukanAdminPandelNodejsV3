import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import { LuArrowLeft } from "react-icons/lu";
import Badge from '@mui/material/Badge';
import { DO_SPACES_URL, DO_SPACES_FOLDER } from '../../../Data/config'
import Avatar from '@mui/material/Avatar';
import { FaRupeeSign } from "react-icons/fa";
import { FiShoppingBag, FiTruck, FiRefreshCcw, FiCheckCircle, FiBox, FiThumbsUp, FiArrowRightCircle, FiCoffee, FiCheckSquare, FiAlertTriangle } from "react-icons/fi";
import AddTrakingDetails from '../../components/Add/AddTrakingDetails'
import AddPayment from '../../components/Add/AddPayment'
import { BsCurrencyRupee } from "react-icons/bs";
import EditExpctedText from '../../components/Edit/EditExpctedText'
import { useRouter, useParams } from 'next/router'
import {
    Card,
    IconButton,
    Typography,
    styled
} from '@mui/material';

import Link from 'src/components/Link';
import Image from 'next/image'

import * as animationData from '../../../Data/Lottie/animation_ln9a07w5.json'
import Lottie from 'react-lottie'
export async function getServerSideProps(context) {
    const DataSlug = context.query.pageno[0];
    return {
        props: { DataSlug },
    }

}
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
}

function DashboardCrypto({ DataSlug }) {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [Loading, setLoading] = useState(true);


    const [OrderSList, setOrderSList] = useState([]);
    const [OrderItems, setOrderItems] = useState([]);
    const [OrderPaymentList, setOrderPaymentList] = useState([]);
    const [AddressData, setAddressData] = useState();
    const [OrderData, setOrderData] = useState();
    const [FormattedDateOrder, setFormattedDateOrder] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingOrderSList, setisLoadingOrderSList] = useState(0);
    const [TotalPaidAmount, setTotalPaidAmount] = useState(0);
    const [TotalRefundedAmount, setTotalRefundedAmount] = useState(0);
    const [TotalAmount, setTotalAmount] = useState(0);
   
    const [TotalDuesAmount, setTotalDuesAmount] = useState(0);
   
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    useEffect(() => {
        if (Contextdata.IsLogin == true) {
            GetOrderDatabyid()

        } else {
            router.push('/')

        }
    }, [router.query]);


    const OrderStatusList = async () => {
        const dataid = '08c5th4rh86ht57h6g';
        const sendUM = { OrderID: DataSlug }
        const data = await fetch("/api/V3/List/OrderStatusList", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {

                setOrderSList(parsed.ReqD.OrderStatusList)
                setisLoadingOrderSList(false)
            })
    }
    const GetOrderPaymentList = async () => {
        const dataid = '08c5th4rh86ht57h6g';
        const sendUM = { OrderID: DataSlug, JwtToken: Contextdata.JwtToken }
        const data = await fetch("/api/V3/List/OrderPaymentList", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                console.log(parsed.ReqD.PL)
                setOrderPaymentList(parsed.ReqD.PL)
                calculateAmt(parsed.ReqD.PL)


            })
    }
    const formatDate = (inputDate) => {

        // Parse the input date string into a Date object
        const dateParts = inputDate.split('-'); // Assuming input format is "yyyy-mm-dd"
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; // Month is 0-based in JavaScript
        const day = parseInt(dateParts[2]);
        const parsedDate = new Date(year, month, day);

        // Format the date into "day month year" format
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = parsedDate.toLocaleDateString(undefined, options);
        setFormattedDateOrder(formattedDate)

    };

    const GetOrderDatabyid = async (e) => {
        const sendUM = { OrderID: DataSlug, JwtToken: Contextdata.JwtToken }
        const data = await fetch("/api/V3/User/OrderDetails", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsedUser) => {

                console.log(parsedUser.ReqData.OrderDetails);
                setOrderData(parsedUser.ReqData.OrderDetails[0])
                formatDate(parsedUser.ReqData.OrderDetails[0].date);
                setOrderItems(parsedUser.ReqData.OrderDetails[0].CartList)
                setIsLoading(false)
                setAddressData(parsedUser.ReqData.OrderDetails[0].AddressID.AdreessData)

                OrderStatusList()
                GetOrderPaymentList()
                setLoading(false)
            })
    }

    const calculateAmt = async (e) => {
        let paid = 0;
        let refunded = 0;
        let dues = 0;

        e.forEach((payment) => {
            if (payment.type === 'Paid') {
                paid += payment.amt;
                
            } else if (payment.type === 'Refund') {
                refunded += payment.amt;
                
            }
        });
        setTotalPaidAmount(paid);
        setTotalRefundedAmount(refunded);
    }


    return (
        <>
            <Head>
                <title>Order Details {DataSlug}</title>
            </Head>

            <Container className={MYS.min100vh}>
                {!Loading &&
                    <div>
                        <div className={MYS.TitleWithBackHeader}>
                            <div className={MYS.TitleWithBackHeaderA}>
                                <IconButton aria-label="cart" onClick={() => router.back()}>
                                    <StyledBadge color="secondary" >
                                        <LuArrowLeft />
                                    </StyledBadge>
                                </IconButton>
                                <div>
                                    <span>#{OrderData._id}</span>
                                </div>
                            </div>

                            <div>

                                <div className={MYS.ClearCartBox}>
                                    {OrderData.OrderStatus === 0 &&
                                        <div className={MYS.OrderStatusTextItem}>
                                            <div className={MYS.OrderStatusTextItemIcon}>
                                                <FiShoppingBag size={15} />
                                            </div>
                                            <div className={MYS.OrderStatusTextItemText}>
                                                <span> {OrderData.OrderStatusText}</span>
                                            </div>
                                        </div>

                                    }
                                    {OrderData.OrderStatus === 1 &&
                                        <div className={MYS.OrderStatusTextItem}
                                            style={{ backgroundColor: '#67EEA0', color: 'black' }}
                                        >
                                            <div className={MYS.OrderStatusTextItemIcon}>
                                                <FiThumbsUp size={15} />
                                            </div>
                                            <div className={MYS.OrderStatusTextItemText}>
                                                <span> {OrderData.OrderStatusText}</span>
                                            </div>
                                        </div>

                                    }

                                    {OrderData.OrderStatus === 2 &&
                                        <div className={MYS.OrderStatusTextItem}
                                            style={{ backgroundColor: '#605957', color: 'yellow' }}
                                        >
                                            <div className={MYS.OrderStatusTextItemIcon}>
                                                <FiCoffee size={15} />
                                            </div>
                                            <div className={MYS.OrderStatusTextItemText}>
                                                <span> {OrderData.OrderStatusText}</span>
                                            </div>
                                        </div>

                                    }


                                    {OrderData.OrderStatus === 3 &&
                                        <div className={MYS.OrderStatusTextItem}
                                            style={{ backgroundColor: '#52BE80', color: 'white' }}
                                        >
                                            <div className={MYS.OrderStatusTextItemIcon}>
                                                <FiTruck size={15} />
                                            </div>
                                            <div className={MYS.OrderStatusTextItemText}>
                                                <span> {OrderData.OrderStatusText}</span>
                                            </div>
                                        </div>

                                    }

                                    {OrderData.OrderStatus === 4 &&
                                        <div className={MYS.OrderStatusTextItem}
                                            style={{ backgroundColor: 'green', color: 'white' }}
                                        >
                                            <div className={MYS.OrderStatusTextItemIcon}>
                                                <FiBox size={15} />
                                            </div>
                                            <div className={MYS.OrderStatusTextItemText}>
                                                <span> {OrderData.OrderStatusText}</span>
                                            </div>
                                        </div>

                                    }
                                    {OrderData.OrderStatus === 5 &&
                                        <div className={MYS.OrderStatusTextItem}
                                            style={{ backgroundColor: '#F1C40F', color: 'black' }}
                                        >
                                            <div className={MYS.OrderStatusTextItemIcon}>
                                                <FiCheckSquare size={15} />
                                            </div>
                                            <div className={MYS.OrderStatusTextItemText}>
                                                <span> {OrderData.OrderStatusText}</span>
                                            </div>
                                        </div>

                                    }
                                    {OrderData.OrderStatus === 6 &&
                                        <div className={MYS.OrderStatusTextItem}
                                            style={{ backgroundColor: 'red', color: 'white' }}
                                        >
                                            <div className={MYS.OrderStatusTextItemIcon}>
                                                <FiAlertTriangle size={15} />
                                            </div>
                                            <div className={MYS.OrderStatusTextItemText}>
                                                <span> {OrderData.OrderStatusText}</span>
                                            </div>
                                        </div>

                                    }
                                    {OrderData.OrderStatus === 7 &&
                                        <div className={MYS.OrderStatusTextItem}
                                            style={{ backgroundColor: 'red', color: 'white' }}
                                        >
                                            <div className={MYS.OrderStatusTextItemIcon}>
                                                <FiAlertTriangle size={15} />
                                            </div>
                                            <div className={MYS.OrderStatusTextItemText}>
                                                <span> {OrderData.OrderStatusText}</span>
                                            </div>
                                        </div>

                                    }

                                    {OrderData.OrderStatus === 8 &&
                                        <div className={MYS.OrderStatusTextItem}
                                            style={{ backgroundColor: 'blue', color: 'white' }}
                                        >
                                            <div className={MYS.OrderStatusTextItemIcon}>
                                                <FiRefreshCcw size={15} />
                                            </div>
                                            <div className={MYS.OrderStatusTextItemText}>
                                                <span> {OrderData.OrderStatusText}</span>
                                            </div>
                                        </div>

                                    }
                                    {OrderData.OrderStatus === 9 &&
                                        <div className={MYS.OrderStatusTextItem}
                                            style={{ backgroundColor: 'pink', color: 'black' }}
                                        >
                                            <div className={MYS.OrderStatusTextItemIcon}>
                                                <FiCheckCircle size={15} />
                                            </div>
                                            <div className={MYS.OrderStatusTextItemText}>
                                                <span> {OrderData.OrderStatusText}</span>
                                            </div>
                                        </div>

                                    }




                                </div>
                            </div>
                        </div>
                        <Card>
                            <div style={{ minHeight: '20px' }}></div>
                            <div>

                                <div className={MYS.UserCounterGid}>
                                    <div className={MYS.UserCounterItem}>
                                        <div className={MYS.UserCounterItemA}>
                                            <span>₹{OrderData.FinalItemAmt}</span>
                                            <small>Order Total</small>
                                        </div>
                                        <div className={MYS.Counterimage}>
                                            <Image
                                                src={`/ttoalrupee.png`}
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
                                            <span>₹{TotalPaidAmount}</span>
                                            <small>Amount Paid</small>
                                        </div>
                                        <div className={MYS.Counterimage}>
                                            <Image
                                                src={`/paidrupee.png`}
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
                                            <span>₹{OrderData.FinalItemAmt - TotalPaidAmount}</span>
                                            <small>Amount Dues</small>
                                        </div>
                                        <div className={MYS.Counterimage}>
                                            <Image
                                                src={`/duerupee.png`}
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
                                            <span>₹{TotalRefundedAmount}</span>
                                            <small>Amount Refunded</small>
                                        </div>
                                        <div className={MYS.Counterimage}>
                                            <Image
                                                src={`/returnrupee.png`}
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
                            <div style={{ minHeight: '20px' }}></div>
                            <div className={MYS.OrderStatusBox}>
                                <div className={MYS.OrderStatusBoxA}>


                                    <div className={MYS.OrderStatusBoxABox}>
                                        <div>


                                            <div className={MYS.OrderStatusBoxABoxItemBox}>
                                                <div className={MYS.OrderDetailsBox}>
                                                    <div className={MYS.CartSummyboxA}>
                                                        <div>
                                                            <div>
                                                                <span className={MYS.amttext}><small>ORDER ID : {OrderData._id}</small></span>
                                                            </div>
                                                            <div style={{ minHeight: '10px' }}></div>
                                                            <div>
                                                                <span className={MYS.amttext}>Order @ {FormattedDateOrder}<small> ({OrderData.time})</small></span>
                                                            </div>

                                                        </div>
                                                        <div style={{ minHeight: '10px' }}></div>

                                                        <div className={MYS.CartSummyboxListBoxItem}>
                                                            <div className={MYS.CartSummyboxListBoxItemA}>
                                                                <span>Item total</span>
                                                            </div>
                                                            <div className={MYS.CartSummyboxListBoxItemB}>
                                                                <span className={MYS.amttext}>₹ {OrderData.Mprice}</span>
                                                            </div>
                                                        </div>
                                                        <div className={MYS.CartSummyboxListBoxItem}>
                                                            <div className={MYS.CartSummyboxListBoxItemA}>
                                                                <span>Delivery fee</span>

                                                            </div>
                                                            <div className={MYS.CartSummyboxListBoxItemB}>
                                                                <span className={MYS.amttext}>₹ {OrderData.Deliveryfee}</span>
                                                            </div>
                                                        </div>
                                                        <div className={MYS.CartSummyboxListBoxItem}>
                                                            <div className={MYS.CartSummyboxListBoxItemA}>
                                                                <span>Discount</span>

                                                            </div>
                                                            <div className={MYS.CartSummyboxListBoxItemB}>
                                                                <span className={MYS.amttext}>₹ {OrderData.Discount}</span>
                                                            </div>
                                                        </div>
                                                        <div style={{ minHeight: '10px' }}></div>
                                                        <div className={MYS.deviderCart}></div>
                                                        <div style={{ minHeight: '10px' }}></div>
                                                        <div className={MYS.CartSummyboxListBoxItem}>
                                                            <div className={MYS.CartSummyboxListBoxItemA}>
                                                                <span>Grand total</span>
                                                                <div><small>Inclusive of all taxes</small></div>

                                                                <div style={{ minHeight: '20px' }}></div>
                                                                <div>
                                                                    {OrderData.PayStatus === 0 &&
                                                                        <div className={MYS.OrderStatusTextItem}
                                                                            style={{ backgroundColor: '#67EEA0', color: 'black' }}
                                                                        >
                                                                            <div className={MYS.OrderStatusTextItemIcon}>
                                                                                <FaRupeeSign size={20} />
                                                                            </div>
                                                                            <div className={MYS.OrderStatusTextItemText}>
                                                                                <span>   {OrderData.PayStatusText}</span>
                                                                            </div>
                                                                        </div>

                                                                    }
                                                                    {OrderData.PayStatus === 1 &&
                                                                        <div className={MYS.OrderStatusTextItem}
                                                                            style={{ backgroundColor: '#52BE80', color: 'white' }}
                                                                        >
                                                                            <div className={MYS.OrderStatusTextItemIcon}>
                                                                                <FaRupeeSign size={20} />
                                                                            </div>
                                                                            <div className={MYS.OrderStatusTextItemText}>
                                                                                <span>   {OrderData.PayStatusText}</span>
                                                                            </div>
                                                                        </div>

                                                                    }
                                                                    {OrderData.PayStatus === 3 &&
                                                                        <div className={MYS.OrderStatusTextItem}
                                                                            style={{ backgroundColor: '#F1C40F', color: 'black' }}
                                                                        >
                                                                            <div className={MYS.OrderStatusTextItemIcon}>
                                                                                <FaRupeeSign size={20} />
                                                                            </div>
                                                                            <div className={MYS.OrderStatusTextItemText}>
                                                                                <span>   {OrderData.PayStatusText}</span>
                                                                            </div>
                                                                        </div>

                                                                    }

                                                                    <div style={{ minHeight: '20px' }}></div>
                                                                    <div>Payment Method :<span className={MYS.DeliveryTime}> {OrderData.PaymentType}</span>  </div>

                                                                </div>
                                                            </div>
                                                            <div className={MYS.CartSummyboxListBoxItemB}>
                                                                <span className={MYS.amttextSub}>₹ {OrderData.FinalItemAmt}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                        <div style={{ minHeight: '20px' }}></div>
                                        <div className={MYS.OrderStatusBoxABoxItemBox}>
                                            <div className={MYS.FinalAddressText}>
                                                <div className={MYS.LottieLocation}>
                                                    <Lottie options={defaultOptions}
                                                        width={100}
                                                        height={100}
                                                        isStopped={false}
                                                        isPaused={false} />
                                                </div>
                                                <div>
                                                    <div>

                                                        <span className={MYS.DeliveryTime}>Delivery Address :</span>
                                                    </div>

                                                    <div>
                                                        <span style={{ fontWeight: 600 }}>Name : {AddressData.Name}</span>
                                                    </div>
                                                    <div>
                                                        <span style={{ fontWeight: 500 }}>Contact Number : {AddressData.Mobile}</span>
                                                    </div>
                                                    <div>
                                                        <span style={{ fontWeight: 500 }}>Address : {AddressData.Address},{AddressData.City},{AddressData.State} {AddressData.PinCode} (Landmark: {AddressData.Landmark})</span>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ minHeight: '20px' }}></div>
                                        <div>
                                            <div className={MYS.MainTitleBoxCartA}>
                                                <div className={MYS.Ativitytitle}>
                                                    <div className={MYS.MainTitleBoxCartAIcon}>

                                                        <IconButton aria-label="cart">
                                                            <StyledBadge color="secondary" >
                                                                <FiShoppingBag />
                                                            </StyledBadge>
                                                        </IconButton>
                                                    </div>
                                                    Items in this order
                                                </div>
                                            </div>

                                            <div style={{ minHeight: '10px' }}></div>
                                            {Object.keys(OrderItems).map((ItemKey, index) => (
                                                <div key={index} className={MYS.CartListItem}>
                                                    <div className={MYS.CartListItemA}>
                                                        <div className={MYS.CartListItemAImg}>
                                                            <Image
                                                                src={`${DO_SPACES_URL}${DO_SPACES_FOLDER}/${OrderItems[ItemKey].itemImg}`}
                                                                alt="image"
                                                                layout="responsive"
                                                                placeholder='blur'
                                                                width={50}
                                                                height={50}
                                                                quality={100}
                                                                blurDataURL={blurredImageData}

                                                            />
                                                        </div>
                                                        <div className={MYS.CartListItemContent}>
                                                            <div className={MYS.CartListItemContentTitle}>
                                                                <span>{OrderItems[ItemKey].name}</span>
                                                            </div>
                                                            <div className={MYS.OtherDataBoxCart}>
                                                                <span>unit:  {OrderItems[ItemKey].UnitNumber}{OrderItems[ItemKey].UnitText}</span>
                                                            </div>



                                                            <div className={MYS.CartListItemContentPrice}>
                                                                <span>₹{OrderItems[ItemKey].price}</span>  <small><del>₹{OrderItems[ItemKey].mprice}</del></small>  x <small>{OrderItems[ItemKey].qty}</small>
                                                            </div>

                                                        </div>

                                                    </div>



                                                </div>
                                            ))}
                                        </div>

                                    </div>

                                </div>

                                <div className={MYS.OrderStatusBoxB}>

                                    <div className={MYS.ExpTextBox}>
                                        <div>
                                            <div style={{ minHeight: '0px' }}></div>
                                            <div>
                                                <small>Delivery note</small>
                                            </div>
                                            <span className={MYS.DeliveryTime}>{OrderData.ExpectedDelivery}</span>
                                        </div>
                                        <div>
                                            <EditExpctedText OrderIDMain={DataSlug} TitleMain={OrderData.ExpectedDelivery} />
                                        </div>
                                    </div>
                                    <div style={{ minHeight: '10px' }}></div>
                                    <div className={MYS.MainTitleBoxCartA}>
                                        <div className={MYS.Ativitytitle}>
                                            <div className={MYS.MainTitleBoxCartAIcon}>

                                                <IconButton aria-label="cart">
                                                    <StyledBadge color="secondary" >
                                                        <FiTruck />
                                                    </StyledBadge>
                                                </IconButton>
                                            </div>
                                            Order Activity
                                        </div>

                                        <div>
                                            <AddTrakingDetails Mobile={OrderData.Mobile} OrderID={DataSlug} />
                                        </div>
                                    </div>


                                    <div style={{ minHeight: '20px' }}></div>
                                    <div>
                                        {!isLoadingOrderSList &&
                                            <div className={MYS.TakingzTmbic}>
                                                {OrderSList.map((item) => {
                                                    return <div className={MYS.TrakingTimelineItem} key={item._id}>
                                                        <div>
                                                            <div>
                                                                <span><FiArrowRightCircle /></span> <span>{item.OrderText}</span>
                                                                <div>
                                                                    <small>{item.Details}</small>
                                                                </div>
                                                                <div className={MYS.TrakingTimelineItemDate}>
                                                                    <small>{item.date}, {item.time}</small>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className={MYS.TrakingTimelineItemLine}>

                                                        </div>


                                                    </div>
                                                }

                                                )}

                                            </div>

                                        }
                                    </div>
                                    <div className={MYS.Deviderx}></div>
                                    <div style={{ minHeight: '20px' }}></div>
                                    <div className={MYS.MainTitleBoxCartA}>
                                        <div className={MYS.Ativitytitle}>
                                            <div className={MYS.MainTitleBoxCartAIcon}>

                                                <IconButton aria-label="cart">
                                                    <StyledBadge color="secondary" >
                                                        <BsCurrencyRupee />
                                                    </StyledBadge>
                                                </IconButton>
                                            </div>
                                            Payments & Refunds
                                        </div>

                                        <div>
                                            <AddPayment Mobile={OrderData.Mobile} OrderID={DataSlug} MainAmt={OrderData.FinalItemAmt} TotalPaid={TotalPaidAmount} />
                                        </div>
                                    </div>
                                    <div style={{ minHeight: '20px' }}></div>
                                    <div>
                                        {!isLoadingOrderSList &&
                                            <div className={MYS.TakingzTmbic}>
                                                {OrderPaymentList.map((item) => {
                                                    return <div className={MYS.PaymentItem} key={item._id}>
                                                        <div className={MYS.PaymentItemA}>
                                                            <span>₹{item.amt}</span>
                                                        </div>
                                                        <div className={MYS.PaymentItemB}>
                                                            {item.type === 'Paid' &&
                                                                <div className={MYS.PaymentItemType}>
                                                                    <span>Paid</span>
                                                                </div>
                                                            }
                                                            {item.type === 'Refund' &&
                                                                <div className={MYS.PaymentItemTypeRefunded}>
                                                                    <span>Refunded</span>
                                                                </div>
                                                            }

                                                        </div>
                                                    </div>
                                                }

                                                )}

                                            </div>

                                        }
                                    </div>
                                    <div className={MYS.Deviderx}></div>
                                    <div style={{ minHeight: '20px' }}></div>
                                </div>
                            </div>
                        </Card>
                    </div>
                }
            </Container>

            <Footer />
        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
