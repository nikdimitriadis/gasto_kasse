import { useNavigate } from "react-router"
import { useAppSelector } from "../app/hooks";
import { AllCatBtn } from "../components/Buttons/IconDeleteButtons";
import { Grid } from "@mui/material";

export default function Allcat() {
    const navigate = useNavigate();
    const products = useAppSelector(state => state.products);
    const navigateHandler = (navLink: string) => {
        navigate(navLink)
    }

    let content;
    content = <div>Waiting...</div>
    if (products.fetched) {
        content = products.mainData.map((category) => (
            <AllCatBtn onClick={navigateHandler} navigate={category.id} title={`${category.category}`} key={category.id} />
        ))
    }
    return (
        <>
            <Grid container spacing={4} padding="1rem" height="100%" alignItems="center">
                {content}
            </Grid>
        </>
    )
}
