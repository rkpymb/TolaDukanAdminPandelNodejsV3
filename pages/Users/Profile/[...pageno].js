import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import MYS from '../../../Styles/mystyle.module.css'
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import CheckloginContext from '../../../context/auth/CheckloginContext'
import { LuArrowLeft } from "react-icons/lu";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

import UserOrderList from '../../components/List/UserOrderList'
import { useRouter, useParams } from 'next/router'
import {
    Card,
    IconButton,
    Typography,
    styled
} from '@mui/material';




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

function DashboardCrypto({DataSlug}) {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [Loading, setLoading] = useState(true);
    const [UserData, setUserData] = useState();
    useEffect(() => {
        if (Contextdata.IsLogin == true) {
            GetUSerDatabyid()
            
        } else {
            router.push('/')

        }
    },[]);


  


    const GetUSerDatabyid = async (e) => {
        const sendUM = { userid: DataSlug, JwtToken: Contextdata.JwtToken}
        const data = await fetch("/api/V3/User/UserByid", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                setUserData(parsed.ReqData.UserData[0]);
             
                setLoading(false)
            })
    }
    return (
        <>
            <Head>
                <title>User's Profile {DataSlug}</title>
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
                                    <span>{UserData.name}'s profile</span>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                        <Card>
                            <div className={MYS.UserProfileBoxTop}>
                                <div className={MYS.UserProfileBoxTopA}>
                                    <Avatar alt={UserData.name} src="/static/images/avatar/1.jpg" sx={{ width: 56, height: 56 }} />
                                </div>
                                <div className={MYS.UserProfileBoxTopB}>
                                  
                                    <div className={MYS.UserProfileBoxTopBName}>
                                        <span>{UserData.name}</span>
                                    </div>
                                    <div>
                                        <span>{UserData.mobile}</span>
                                    </div>
                                    <div>
                                        <small>{UserData.email}</small>
                                    </div>
                                </div>
                           </div>
                        </Card>
                       <div style={{minHeight:'20px'}}></div>
                        <UserOrderList usermobile={UserData.mobile} />
                    </div>
                }
            </Container>

            <Footer />
        </>
    );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
