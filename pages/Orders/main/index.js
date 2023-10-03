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
import AllOrderslist from '../../components/List/AllOrderslist'
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
                <title>All Orders</title>
            </Head>

            <Container className={MYS.min100vh}>
                {!Loading &&
                    <div>

                        <AllOrderslist/>

                    </div>
                }
            </Container>


            <Footer />
        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
