import React, { useState, useEffect } from 'react';
import { ReactComponent as LeftArrow } from '../images/left-arrow-new.svg';
import { ReactComponent as RightArrow } from '../images/right-arrow-new.svg';

function ImageCarousel(props) {
  const [imageList] = useState(props.images);
  const [selectedImage, setSelectedImage] = useState(props.images[0]);
  const [carouselMargin, setCarouselMargin] = useState(0);
  const scrollDistance = 220;

  useEffect(() => {
    const length = (imageList.length * 220) - 660;
    if (carouselMargin < 0) {
      document.getElementById('imageCarouselLeftButton').classList.remove('disabled');
    } else {
      document.getElementById('imageCarouselLeftButton').classList.add('disabled');
    }
    if (carouselMargin <= (0 -  length)) {
      document.getElementById('imageCarouselRightButton').classList.add('disabled');
    } else  {
      document.getElementById('imageCarouselRightButton').classList.remove('disabled');
    }
  }, [carouselMargin]);

  function scrollRight() {
    setCarouselMargin(carouselMargin - scrollDistance);
  }

  function scrollLeft() {
    if (carouselMargin < (0 - scrollDistance)) {
      setCarouselMargin(carouselMargin + scrollDistance);
    } else if (carouselMargin >= (0 - scrollDistance)) {
      setCarouselMargin(0);
    }
  }

  return (
    <div className='image-carousel'>
      <div className='display-image-wrapper'>
        {selectedImage ? <img src={`https:${selectedImage.url.replace('thumb', '1080p')}`} alt={'cover art'} /> : ''}
      </div>
      <div className='thumbnail-carousel'>
        <button id='imageCarouselLeftButton' className="nav-icon disabled nav-icon--left" onClick={scrollLeft}><LeftArrow /></button>
        {imageList.map((item, idx) => <img onClick={() => setSelectedImage(item)} className="image" style={idx==0 ? {marginLeft: carouselMargin} : {}} src={`https:${item.url.replace('thumb', 'screenshot_med')}`} key={idx} />)}
        <button id='imageCarouselRightButton' className="nav-icon nav-icon--right" onClick={scrollRight}><RightArrow /></button>
      </div>
    </div>
  );
}

export default ImageCarousel;
