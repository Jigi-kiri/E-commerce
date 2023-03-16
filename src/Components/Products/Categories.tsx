import { Button, CircularProgress, Grid } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { toast } from 'react-toastify';
import { serviceURL } from '../../services/common';

interface CategoryProps {
    selectedCategory: any;
}
const Categories: React.FC<CategoryProps> = ({ selectedCategory }) => {
    const [categories, setCategories] = React.useState<Array<string>>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        setLoading(true);
        axios.get((`${serviceURL}/products/categories`))
            .then((res) => {
                if (res.status === 200) {
                    let category = ["ALL"];
                    res?.data?.forEach((cat: any) => {
                        category?.push(cat);
                    })
                    setCategories(category);
                } else setCategories([])
            })
            .catch((error) => toast.error(error.statusText))
            .finally(() => setLoading(false));
    }, [])

    return (
        <React.Fragment>
            {loading && <CircularProgress />}
            <Grid container spacing={2} style={{ margin: 15 }}>
                {categories?.map((category: string, index: number) => (
                    <Grid item xs={2} key={index}>
                        <Button
                            variant="text"
                            color='info'
                            onClick={() => selectedCategory(category)}
                        >
                            {category.toUpperCase()}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    )
}

export default Categories