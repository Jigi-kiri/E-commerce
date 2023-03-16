import * as React from 'react';
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    CircularProgress,
    Divider,
    Grid,
    IconButton,
    Tooltip,
    Typography
} from '@mui/material';
import StreetviewIcon from '@mui/icons-material/Streetview';
import axios from 'axios';
import { toast } from 'react-toastify';
import { serviceURL } from '../../services/common';
import Categories from './Categories';
import { useNavigate } from 'react-router-dom';

interface Rate {
    rate: number;
    count: number;
}

export interface Products {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: Rate;
    title: string;
}

const ProductsList: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [products, setProducts] = React.useState<Products[]>([]);

    React.useEffect(() => {
        setLoading(true);
        axios.get(`${serviceURL}/products?sort=desc`)
            .then((res: any) => {
                if (res.status === 200) {
                    setProducts(res.data);
                } else setProducts([])
            })
            .catch((error) => toast.error(error.statusText))
            .finally(() => setLoading(false))
    }, []);

    const OnCategorySelect = React.useCallback((category: string) => {
        setLoading(true);
        if (category === "ALL") {
            axios.get(`${serviceURL}/products?sort=desc`)
                .then((res: any) => {
                    if (res.status === 200) {
                        setProducts(res.data);
                    } else setProducts([])
                })
                .catch((error) => toast.error(error.statusText))
                .finally(() => setLoading(false))
        } else {
            axios.get(`${serviceURL}/products/category/${category}`)
                .then((res) => {
                    if (res.status === 200) {
                        setProducts(res.data);
                    } else setProducts([])
                })
                .catch((error) => toast.error(error.statusText))
                .finally(() => setLoading(false))
        }
    }, [products])

    return (
        <React.Fragment>
            {loading ? <CircularProgress /> : (
                <>
                    <Divider />
                    <div style={{ margin: 15 }}>
                        <Categories selectedCategory={OnCategorySelect} />
                    </div>
                    <Divider />
                    <Grid container spacing={2} style={{ margin: 15 }}>
                        {products.map((product: Products, index: number) => (
                            <Grid item xs={4} key={index}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardHeader
                                        subheader={product?.category.toUpperCase()}
                                    />
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={product?.image}
                                        alt="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {product?.title}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton onClick={() => navigate(`product/${product.id}`)}>
                                            <Tooltip title={"Product Details"}>
                                                <StreetviewIcon fontSize='large' color='primary' />
                                            </Tooltip>
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </React.Fragment>
    )
}

export default ProductsList