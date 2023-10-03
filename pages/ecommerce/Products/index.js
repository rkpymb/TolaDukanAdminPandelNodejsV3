import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';

import ProductList from '../../components/List/ProductList';
import Badge from '@mui/material/Badge';
import AddProduct from '../../components/Add/AddProduct'
import { useRouter, useParams } from 'next/router'
import {
 
  IconButton,
 
  styled
} from '@mui/material';
import { LuArrowLeft } from "react-icons/lu";
function DashboardCrypto() {
  const router = useRouter()
  const Contextdata = useContext(CheckloginContext)
  useEffect(() => {
    if (Contextdata.IsLogin == true) {
      console.log('Login')
    } else {
      // setIsLoading(true);
      // router.push('/Login')
      console.log('Not Login')
    }
  });
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
  return (
    <>
      <Head>
        <title>Product</title>
      </Head>
      
      <Container className={MYS.min100vh}>

        <div className={MYS.TitleWithBackHeader}>
          <div className={MYS.TitleWithBackHeaderA}>
            <IconButton aria-label="cart" onClick={() => router.back()}>
              <StyledBadge color="secondary" >
                <LuArrowLeft />
              </StyledBadge>
            </IconButton>
            <div>
              <span>Product</span>
            </div>
          </div>
          <div>
            <AddProduct />
          </div>
        </div>
        <ProductList />
      </Container>
      <Footer />
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
