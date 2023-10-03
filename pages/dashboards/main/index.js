import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'
import { useRouter, useParams } from 'next/router'
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import Badge from '@mui/material/Badge';

import Image from 'next/image'

import {
 
  styled,
 

} from '@mui/material';
function DashboardCrypto() {
  const router = useRouter()
  const [Loading, setLoading] = useState(true);
  const Contextdata = useContext(CheckloginContext)
  const [TotalUsers, setTotalUsers] = useState(0);
  const [TotalProducts, setTotalProducts] = useState(0);
  const [TotalCat, setTotalCat] = useState(0);
  const [TotalOrders, setTotalOrders] = useState(0);
  const [TotalSales, setTotalSales] = useState(0);
  const [AmountReceived, setAmountReceived] = useState(0);
  const [TotalDues, setTotalDues] = useState(0);
  const [TotalRefund, setTotalRefund] = useState(0);
  const [TotalDicount, setTotalDicount] = useState(0);
  const [TotalOrdersData, setTotalOrdersData] = useState([]);
  const [Paymentlist, setPaymentlist] = useState([]);

  const [totalSalesDelivered, setTotalSalesDelivered] = useState(0);
  
  const [totalSalesPending, setTotalSalesPending] = useState(0);
  const [totalDiscountPending, setTotalDiscountPending] = useState(0);

  

  useEffect(() => {
    if (Contextdata.IsLogin == true) {
    
      GetDashboardCounter()
    } else {
      router.push('/')
    
    }
  },[]);
 

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
    
  }));

  const GetDashboardCounter = async () => {
    const dataid = '08c5th4rh86ht57h6g';
    const sendUM = { JwtToken: Contextdata.JwtToken }
    const data = await fetch("/api/V3/Counter/DashboardCounter", {
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
        setTotalUsers(parsed.ReqD.TotalUsers)
        setTotalOrders(parsed.ReqD.TotalOrders)
        setTotalProducts(parsed.ReqD.TotalProducts)
        setTotalCat(parsed.ReqD.TotalCat)
        setTotalOrdersData(parsed.ReqD.TotalOrdersData)
        setPaymentlist(parsed.ReqD.Paymentlist)
        Calculatedata(parsed.ReqD.TotalOrdersData)
        calculateAmt(parsed.ReqD.Paymentlist)
        setLoading(false)
        // console.log(parsed.ReqD.PL)
        // setOrderPaymentList(parsed.ReqD.PL)
       


      })
  }
  const Calculatedata = async (e) => {
    // Filter orders by status
    const deliveredOrders = e.filter(order => order.OrderStatus === 5);
    const pendingOrders = e.filter(order => order.OrderStatus !== 5 );

    // Calculate total sales and total discount for delivered orders
    const salesDelivered = deliveredOrders.reduce((acc, order) => acc + order.FinalItemAmt, 0);
    const discountDelivered = deliveredOrders.reduce((acc, order) => acc + order.Discount, 0);
    setTotalDicount(discountDelivered)
    setTotalSales(salesDelivered)
    
  }
  const calculateAmt = async (e, TotalSales) => {
    let totalRefund = 0;
    let totalPaid = 0;
    let total = 0;
    e.forEach((item) => {
      if (item.type === 'Refund') {
        totalRefund += item.amt;
      } else if (item.type === 'Paid') {
        totalPaid += item.amt;
      }
      total += item.amt;
    });

    // Update state variables
    setTotalRefund(totalRefund);
    setAmountReceived(totalPaid);
   
    
  }
  return (
    <>
      <Head>
        <title>Toladukan Dashboard</title>
      </Head>
     
      <Container className={MYS.min100vh}>
       
        {!Loading &&
          <div className={MYS.DashboardCounterBox}>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>{TotalUsers}</span>
                <small>Total Users</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image src='/educator.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>{TotalProducts}</span>
                <small>Total Products</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image src='/educator.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>{TotalCat}</span>
                <small>Total Category</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image src='/educator.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>{TotalOrders}</span>
                <small>Total Orders</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image src='/educator.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>₹{TotalSales}</span>
                <small>Total Sales</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image src='/educator.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>₹{TotalDicount}</span>
                <small>Total Discounts</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image src='/educator.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>₹{AmountReceived}</span>
                <small>Amount Received</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image src='/educator.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>₹{TotalSales - AmountReceived}</span>
                <small>Total Dues</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image src='/educator.png' alt='im' height='50' width='50' />
              </div>
            </div>
            <div className={MYS.DashboardCounterItem}>
              <div className={MYS.DashboardCounterItemA}>
                <span>₹{TotalRefund}</span>
                <small>Total Refunds</small>
              </div>
              <div className={MYS.DashboardCounterItemB}>
                <Image src='/educator.png' alt='im' height='50' width='50' />
              </div>
            </div>
          </div>
        }
      </Container>
     
      <Footer />
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
