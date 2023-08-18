import React from 'react';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { BannerImage } from '../../configs/images';
import { Link } from 'react-router-dom';

function LandingPage() { 
  return (
    <React.Fragment>
      <Header loc="landing" />
      <div className="landing-container">
        <div className="left-side">
          <div className="title">
            <p>Halo,</p>
            <h1>Explore for upcoming <br /> movies right now!</h1>
          </div>
          <div className="desc">
            kami menyediakan beberapa preview film yang akan <br /> tayang di bioskop dalam waktu dekat
          </div>
          <div className="btn-group">
            <Link to="/movie-list">
              <Button label="Movie List" />
            </Link>
            <Link to="/genres">
              <Button label="Genre" type="transparent" />
            </Link>
          </div>
        </div>
        <div className="right-side">
          <img src={BannerImage} alt="banner-img" width="490" />
        </div>
      </div>
    </React.Fragment>
  )
}

export default LandingPage;
