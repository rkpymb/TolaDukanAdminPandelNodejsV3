import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'
import { useRouter, useParams } from 'next/router'
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import Badge from '@mui/material/Badge';
import { LuArrowLeft } from "react-icons/lu";
import Catlist from '../../components/List/Catlist';

import AddCat from '../../components/Add/AddCat'
import AddSubCat from '../../components/Add/AddSubCat'
import {
  Button,
  Card,
  IconButton,
  Box,
  styled,
  Typography,
  Avatar,
  alpha,
  Tooltip,
  CardActionArea,

} from '@mui/material';
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
        <title>Categories</title>
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
            <span>Main Categories</span>
            </div>
          </div>
          <div style={{display:'flex',alignItems: 'center'}}>
            <AddCat />
            <div style={{minWidth:'10px'}}>

            </div>
            <AddSubCat />
          </div>
        </div>
        <Catlist />
      </Container>
      <Footer />
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
