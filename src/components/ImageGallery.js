import React from 'react';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images,
      galleryId: props.galleryId,
      targetId: 0
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  imageSelect(id) {
    this.setState({
      targetId: id
    });
    document.getElementById(this.state.galleryId).classList.add('show');
    document.querySelectorAll(`#${this.state.galleryId} .image`)[id].classList.add('show');
  }

  closeGallery() {
    document.getElementById(this.state.galleryId).classList.remove('show');
    const images = document.querySelectorAll(`#${this.state.galleryId} .image`);
    for (let i = 0; i < images.length; i++) {
      images[i].classList.remove('show');
    }
  }

  next() {
    const limit = this.state.images.length - 1;
    const id = this.state.targetId === limit ? 0 : this.state.targetId + 1;
    document.querySelectorAll(`#${this.state.galleryId} .image`)[this.state.targetId].classList.remove('show');
    this.imageSelect(id);
  }

  previous() {
    const id = this.state.targetId === 0 ? this.state.images.length - 1 : this.state.targetId - 1;
    document.querySelectorAll(`#${this.state.galleryId} .image`)[this.state.targetId].classList.remove('show');
    this.imageSelect(id);
  }

  render() {

    const screenshots = this.state.images
      ? this.state.images.map((item, idx) => <img onClick={() => this.imageSelect(idx)} className="image" src={`https:${item.url.replace('thumb', 'screenshot_med')}`} key={idx} />)
      : '';

    const gallery = this.state.images
    ? this.state.images.map((item, idx) => <img onClick={() => this.closeGallery()} className="image" src={`https:${item.url.replace('thumb', '720p')}`} key={idx} />)
    : '';

    return <>
      <div className="gallery-thumbnails">
        {screenshots}
      </div>
      <div id={this.props.galleryId} className="gallery">
        <button className="gallery-nav prev" onClick={this.previous}>&#8592;</button>
        {gallery}
        <button className="gallery-nav next" onClick={this.next}>&#8594;</button>
        <button className="gallery-nav close" onClick={() => this.closeGallery()}>X</button>
      </div>
    </>;
  }
}

export default ImageGallery;
