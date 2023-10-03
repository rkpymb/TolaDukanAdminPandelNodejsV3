import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'

import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import Button from '@mui/material/Button';
import Link from 'next/link'
import SendIcon from '@mui/icons-material/Send';
import Badge from '@mui/material/Badge';
import { LuArrowLeft } from "react-icons/lu";
import {

  IconButton,

  styled
} from '@mui/material';
import Image from 'next/image'
import { useRouter, useParams } from 'next/router'
function DashboardCrypto() {
  const router = useRouter()
  const Contextdata = useContext(CheckloginContext)
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    if (Contextdata.IsLogin == true) {
      setLoading(false)
    } else {
      router.push('/')
    
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
        <title>TolaDukan Dashboard</title>
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
                  <span>E-Commerce</span>
                </div>
              </div>
              <div>

              </div>
            </div>
            <div className={MYS.DashboardCounterBox}>
              <div className={MYS.DashboardCounterItem}>
                <div className={MYS.DashboardCounterItemA}>
                  <span>Categories</span>
                  <small>manage all categories</small>
                  <div style={{ minHeight: '10px' }}></div>
                  <Link href='/ecommerce/Categories'>
                    <Button size='small' variant="outlined" endIcon={<SendIcon />}>
                      view more
                    </Button>
                  </Link>

                </div>
                <div className={MYS.DashboardCounterItemB}>
                  <Image src='/categories.png' alt='im' height='50' width='50' />
                </div>
              </div>
              <div className={MYS.DashboardCounterItem}>
                <div className={MYS.DashboardCounterItemA}>
                  <span>Products</span>
                  <small>manage all Products</small>
                  <div style={{ minHeight: '10px' }}></div>
                  <Link href='/ecommerce/Products'>
                    <Button size='small' variant="outlined" endIcon={<SendIcon />}>
                      view more
                    </Button>
                  </Link>

                </div>
                <div className={MYS.DashboardCounterItemB}>
                  <Image src='/online-shopping.png' alt='im' height='50' width='50' />
                </div>
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
