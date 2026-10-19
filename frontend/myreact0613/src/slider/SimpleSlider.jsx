// rafce
import React from 'react'
//https://github.com/akiran/react-slick/
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Slider from 'react-slick';

const SimpleSlider = () => {

    const settings = {
        dots: true, //슬라이더에 하단에 있는 점 메뉴
        infinite: true, // 무한 반복 
        speed: 500,
        slidesToShow: 1, //한번에 보여줄 슬라이드 수
        slidesToScroll: 1, // 한번에 넘길 때 몇개식 넘길 수
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className="slider-container" style={{ textAlign: 'center', backgroundColor: 'orange', marginBottom: '30px' }}>
            <Slider {...settings}>
                <div>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
                <div>
                    <h3>5</h3>
                </div>
                <div>
                    <h3>6</h3>
                </div>
            </Slider>
        </div>
    )
}

export default SimpleSlider