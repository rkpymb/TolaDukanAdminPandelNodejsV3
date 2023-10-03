import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Mstyles from '../../../../Styles/mystyle.module.css'
const UserOrdeLoader = () => {
    return (
        <div>
            <div className={Mstyles.OrderItemListGrid}>
                <div className={Mstyles.ProductGridItem}>
                    <div className={Mstyles.ProductItemImage}>
                        <Skeleton variant="rectangular" width={'100%'} height={118} />
                    </div>

                    <div className={Mstyles.ProductItemTitle}>
                        <Skeleton />
                    </div>
                    <div className={Mstyles.ProductItemPrice}>
                        <Skeleton />
                    </div>
                    <div style={{ minHeight: '10px' }}></div>
                    <Skeleton width="60%" />
                </div>
                <div className={Mstyles.ProductGridItem}>
                    <div className={Mstyles.ProductItemImage}>
                        <Skeleton variant="rectangular" width={'100%'} height={118} />
                    </div>

                    <div className={Mstyles.ProductItemTitle}>
                        <Skeleton />
                    </div>
                    <div className={Mstyles.ProductItemPrice}>
                        <Skeleton />
                    </div>
                    <div style={{ minHeight: '10px' }}></div>
                    <Skeleton width="60%" />
                </div>
                <div className={Mstyles.ProductGridItem}>
                    <div className={Mstyles.ProductItemImage}>
                        <Skeleton variant="rectangular" width={'100%'} height={118} />
                    </div>

                    <div className={Mstyles.ProductItemTitle}>
                        <Skeleton />
                    </div>
                    <div className={Mstyles.ProductItemPrice}>
                        <Skeleton />
                    </div>
                    <div style={{ minHeight: '10px' }}></div>
                    <Skeleton width="60%" />
                </div>
                <div className={Mstyles.ProductGridItem}>
                    <div className={Mstyles.ProductItemImage}>
                        <Skeleton variant="rectangular" width={'100%'} height={118} />
                    </div>

                    <div className={Mstyles.ProductItemTitle}>
                        <Skeleton />
                    </div>
                    <div className={Mstyles.ProductItemPrice}>
                        <Skeleton />
                    </div>
                    <div style={{ minHeight: '10px' }}></div>
                    <Skeleton width="60%" />
                </div>
                <div className={Mstyles.ProductGridItem}>
                    <div className={Mstyles.ProductItemImage}>
                        <Skeleton variant="rectangular" width={'100%'} height={118} />
                    </div>

                    <div className={Mstyles.ProductItemTitle}>
                        <Skeleton />
                    </div>
                    <div className={Mstyles.ProductItemPrice}>
                        <Skeleton />
                    </div>
                    <div style={{ minHeight: '10px' }}></div>
                    <Skeleton width="60%" />
                </div>
                <div className={Mstyles.ProductGridItem}>
                    <div className={Mstyles.ProductItemImage}>
                        <Skeleton variant="rectangular" width={'100%'} height={118} />
                    </div>

                    <div className={Mstyles.ProductItemTitle}>
                        <Skeleton />
                    </div>
                    <div className={Mstyles.ProductItemPrice}>
                        <Skeleton />
                    </div>
                    <div style={{ minHeight: '10px' }}></div>
                    <Skeleton width="60%" />
                </div>
                <div className={Mstyles.ProductGridItem}>
                    <div className={Mstyles.ProductItemImage}>
                        <Skeleton variant="rectangular" width={'100%'} height={118} />
                    </div>

                    <div className={Mstyles.ProductItemTitle}>
                        <Skeleton />
                    </div>
                    <div className={Mstyles.ProductItemPrice}>
                        <Skeleton />
                    </div>
                    <div style={{ minHeight: '10px' }}></div>
                    <Skeleton width="60%" />
                </div>

            </div>
        </div>
    )
}

export default UserOrdeLoader
