import React, { useEffect, useState } from 'react';
import img1 from '../../assets/Slider_image-01.jpg';
import img2 from '../../assets/Slider_image-01.jpg';
import img3 from '../../assets/Slider_image-02.jpg';
import img4 from '../../assets/Slider_image-02.jpg';
import img5 from '../../assets/Slider_image-03.jpg';
import img6 from '../../assets/Slider_image-03.jpg';
import img7 from '../../assets/Slider_image-04.jpg';
import img8 from '../../assets/Slider_image-04.jpg';
import img9 from '../../assets/Slider_image-05.jpg';
import useTitle from '../../hooks/useTitle';

const Slider = () => {
    useTitle('Home');
    const [selectedImage, setSelectedImage] = useState(0);
    const [allImages, setAllImages] = useState([img1,img2,img3,img4,img5,img6,img7,img8,img9]);
    useEffect(() => {
        setInterval(() => {
            setSelectedImage(selectedImage => selectedImage < 9 ? selectedImage + 1 : 0);
        },3000)
    },[])
    return (
        <div className='max-w-7xl mx-auto'>
            {/* <p>{selectedImage}</p> */}
            <img src={allImages[selectedImage]} alt=""/>
        </div>
    );
};

export default Slider;