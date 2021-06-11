import './homepage-categories.styles.css';
import Image1 from './image1.png';
import Image2 from './image2.png';
import Image3 from './image3.png';
import Image4 from './image4.png';
import Image5 from './image5.png';

import React from 'react';

import { Card, CardActionArea, CardContent, CardMedia, Typography }
    from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const categories = [
    {
        name: 'Graphic Designing',
        description: 'Get a logo made',
        image: Image1
    },
    {
        name: 'Web Development',
        description: 'Need an ecommerce website?',
        image: Image2
    },
    {
        name: 'App Development',
        description: 'Be the CEO of the next Uber',
        image: Image3
    },
    {
        name: 'Content Writing',
        description: 'Get that article written',
        image: Image4
    },
    {
        name: 'Miscellaneous',
        description: 'Tick that odd job off the list',
        image: Image5
    }
]

const useStyles = makeStyles({
    root: {
        width: '345px',
    },
    media: {
        height: '345px',
    },
});

const HomePageCategories = () => {
    const classes = useStyles();

    return (
        <div className='homepage-categories-cards'>
            {
                categories.map((category, idx) => (
                    <Card key={idx} className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={category.image}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {category.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {category.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))
            }
        </div>
    )
}

export default HomePageCategories;