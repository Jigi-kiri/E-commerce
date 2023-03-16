import * as React from 'react'
import {
    Breadcrumbs,
    Button,
    ButtonGroup,
    CircularProgress,
    Divider,
    Grid,
    Stack,
    Typography
} from '@mui/material'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { serviceURL } from '../../services/common'
import { Products } from './ProductsList'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Container } from '@mui/system'

const Product: React.FC = () => {
    let isLoggedIn = localStorage.getItem('token') ? true : false;
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [product, setProduct] = React.useState<Products>();
    const [quantity, setQuantity] = React.useState<number>(1);

    React.useEffect(() => {
        setLoading(true);
        axios.get(`${serviceURL}/products/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    setProduct(res?.data);
                }
            })
            .catch((error) => toast.error(error.statusText))
            .finally(() => setLoading(false));
    }, [])

    const breadcrumbs = [
        <Typography key="3" color="text.primary">
            {product?.category.toUpperCase()}
        </Typography>,
        <Typography key="3" color="text.primary">
            {product?.title}
        </Typography>,
    ];

    const handleAddtoCart = (value: Products) => {
        if (isLoggedIn) {
            navigate("/cart");
        } else navigate("/login");
    }

    return (
        <React.Fragment>
            {loading ? <CircularProgress /> : (
                <Container >
                    <Grid container >
                        <Grid item xs={12}>
                            <Stack spacing={2} style={{ margin: 15 }}>
                                <Breadcrumbs
                                    separator={<NavigateNextIcon fontSize="small" />}
                                >
                                    {breadcrumbs}
                                </Breadcrumbs>
                            </Stack>
                        </Grid>
                        <Grid container item xs={12} spacing={2}>
                            <Grid item xs={6}>
                                <img src={product?.image} height="500" width="400" />
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant='h4'>
                                    {product?.title}
                                </Typography>
                                <Typography variant='h4' style={{ textAlign: "start" }}>
                                    ${product?.price}
                                </Typography>
                                <Typography variant='h5' style={{ textAlign: "start", marginTop: 5 }}>
                                    Detail Product
                                </Typography>
                                <Typography variant='body1' style={{ marginTop: 5 }}>
                                    {product?.description}
                                </Typography>
                                <Divider style={{ marginTop: 20 }} />
                                <Grid item container xs={12} style={{ marginTop: 20 }}>
                                    <Grid item xs={4}>
                                        <Typography variant='h6' >
                                            Quantity
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <ButtonGroup>
                                            <Button
                                                variant="contained"
                                                disabled={quantity === 1}
                                                onClick={() => setQuantity(quantity - 1)}
                                                endIcon={<RemoveCircleOutlineIcon />}
                                                style={{ margin: 5 }} />
                                            <Typography variant='body2' style={{ margin: 10 }}>
                                                {quantity}
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                onClick={() => setQuantity(quantity + 1)}
                                                style={{ margin: 5 }}
                                                endIcon={<ControlPointIcon />} />
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                                <Grid item container xs={12} style={{ marginTop: 20 }}>
                                    <Grid item xs={4}>
                                        <Typography variant='h6' >
                                            Total
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8} style={{ marginTop: 8 }}>
                                        ${product && (product?.price * quantity).toFixed(2)}
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{ margin: 20 }} container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    spacing={2}>
                                    <Grid item xs>

                                        <Button
                                            variant='contained'
                                            onClick={() => navigate("/")}
                                        >
                                            Back
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>

                                        <Button
                                            variant='contained'
                                            onClick={() => handleAddtoCart(product as Products)}
                                        >
                                            Add to Card
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            )}
        </React.Fragment>
    )
}

export default Product