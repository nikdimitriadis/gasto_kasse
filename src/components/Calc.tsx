import React from 'react'
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { addToHistory } from '../redux/slices/ordersSlice'

import { Divider, Grid, Typography, Button } from '@mui/material'
import BackspaceIcon from '@mui/icons-material/Backspace';
import { NumberCalcButton } from './Buttons/IconDeleteButtons'

// import { socket } from '../App'

const buttonStyle = { width: "100%", maxWidth: "245px", padding: 1.5 }

export default function Calc() {
    const [test01, setTest01] = useState("0")
    const [dif, setDif] = useState({
        value: 0,
        changed: false
    })
    const calc = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]
    const busket = useAppSelector(state => state.orders.orders.totalOrderedPrice)
    // const orders = useAppSelector(state => state.orders.barista.activeOrders)
    // const history = useAppSelector(state => state.orders.historyOrders)
    const dispatch = useAppDispatch()

    const payHandler = () => {
        if (test01 === "0") {
            setTest01(`${busket}`)
        } else if (+test01 < busket && test01 !== "0") {
            console.log("mikro")
            return
        } else {
            const result = +test01 - busket
            setDif({ changed: true, value: result })
            dispatch(addToHistory())
            setTest01("0")
            // socket.emit("baristaOrder", orders)

        }


    }

    if (dif.changed) {
        setTimeout(() => {
            setDif({ value: 0, changed: false })
        }, 3000)
    }


    const calcHandler = (stringNum: string) => {
        // debugger
        if (test01 === "") {
            setTest01(() => stringNum)
        } else if (test01 === "0" && stringNum !== ".") {
            setTest01(() => stringNum)
        } else {
            setTest01((number) => number += stringNum)
        }
    }


    const removeLastHandler = () => {
        const text = test01;
        const editedText = text.slice(0, -1)
        setTest01(() => editedText)
    }

    return (
        <Grid container spacing={1} p={1} justifyContent="center"/*sx={{ width: '100%', maxHeight: "100%" }}*/>
            <Grid item xs={12} textAlign="center" >
                <Typography component="p" variant="h5">{`${test01 === "" ? "0" : test01}$`}</Typography>
            </Grid>
            <Grid item xs={12} textAlign="center" >
                <Typography component="p" variant="h5">
                    Total Price :   {`${busket.toFixed(2)}$`}
                </Typography>
                <Divider />
            </Grid>
            <Grid item xs={12} textAlign="center" >
                <Typography component="p" variant="h5">{"Change : " + dif.value.toFixed(2) + "$"}</Typography>
            </Grid>
            <Grid item xs={12} textAlign="center">
                <Grid container spacing={1} pr={1} sx={{ maxWidth: "500px", m: "auto" }} >
                    {calc.map((item) => (
                        <NumberCalcButton number={item} onClick={calcHandler} key={item} />
                    ))}

                </Grid>
                <Grid container textAlign="center" spacing={2} mt={1}>
                    <Grid xs={6} item textAlign="end" >
                        <Button sx={buttonStyle} endIcon={<BackspaceIcon />} color="error" variant="contained" onClick={removeLastHandler}>Delete</Button>
                    </Grid>
                    <Grid xs={6} item textAlign="start" >
                        <Button variant="contained" color="success" sx={buttonStyle} onClick={payHandler}>Pay!</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    )
}
