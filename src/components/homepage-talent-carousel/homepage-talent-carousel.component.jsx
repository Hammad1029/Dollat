import './homepage-talent-carousel.styles.css';

import React from 'react';

import Carousel from 'react-material-ui-carousel';

const talented = [
    {
        name: 'Hammad',
        skill: 'Web Developer',
        image: 'hammad.jpg'
    },
    {
        name: 'Rahim Chomu',
        skill: 'Being hot',
        image: 'rahim.jpg'
    }
]

const TalentCarousel = () => {
    return (
        <Carousel interval={30000}>
            {
                talented.map((talent, idx) =>
                    <div key={idx} className='homepage-carousel-item'>
                        <img alt={talent.name} src={talent.image} />
                        <div className='homepage-talent-info'>
                            <i>Our Talent</i>
                            <div className='homepage-talent-info-details'>
                                <p className='homepage-talent-name'>{talent.name}</p>
                                <p className='homepage-talent-skill'>{talent.skill}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </Carousel>
    )
}

export default TalentCarousel