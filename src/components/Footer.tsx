import React, { useMemo } from 'react'
import { useNavigate } from 'react-router'

import { FooterNavBtn } from './Buttons/IconDeleteButtons';

import { Grid } from '@mui/material'

// import BadgeIcon from '@mui/icons-material/Badge';
// import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
// import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
// import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';



const Footer = () => {
    const navigate = useNavigate();
    const historyHandler = (direction: string) => {
        navigate(direction)
    }
    const footerBtnData = useMemo(() => {
        return [
            {
                navigate: "/",
                title: 'Menu'
            },
            {
                navigate: "/history",
                title: 'History'
            },
            {
                navigate: "/admin",
                title: 'Admin Log'
            },
            {
                navigate: "/employe",
                title: 'Employe Log'
            },
            {
                navigate: "/barista",
                title: 'Barista'
            },
        ]
    }, [])
    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" >
            {footerBtnData.map(btn => (
                <FooterNavBtn key={btn.title} navigate={btn.navigate} title={btn.title} onClick={historyHandler} />
            ))}
        </Grid>
    )
}

export default Footer;