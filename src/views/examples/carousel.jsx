import React from 'react';
import Carousel from '@/components/carousel';

// import './scss/paper';

import image1 from '@/assets/images/carousel1.jpg';
import image2 from '@/assets/images/carousel2.jpg';
import image3 from '@/assets/images/carousel3.jpg';
import image4 from '@/assets/images/carousel4.jpg';
import image5 from '@/assets/images/carousel5.jpg';

export default class CarouselExample extends React.Component {
  state = {
    images: [
      {
        image: image1,
      },
      {
        image: image2,
      },
      {
        image: image3,
      },
      {
        image: image4,
      },
      {
        image: image5,
      },
    ],
    news: [
      { title: '· 2017年诺贝尔物理学奖公布：三人因引力波获奖' },
      { title: '· 良心！诺基亚所有手机先升安卓8.0，再升安卓9.0' },
      { title: '· 消息称摩拜与ofo投资人考虑让两公司合并' },
      { title: '· 谷歌Pixel 2发布前，小细节再被曝光，小细节再被曝光' },
      { title: '· 苹果官网意外曝光iPhone X包装盒照片' },
    ],
  }

  render() {
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">Carousel</div>
          <div className="page__desc">走马灯, 轮播图, 滑块</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">基础</div>
            <div className="demo__preview__content demo__preview__content--bg" style={{ padding: '0' }}>
              <Carousel
                className="my-carousel"
                selectedIndex={1}
              >
                {
                  this.state.images.map((carouselItem, index) => {
                    const key = `carousel-${index}`;
                    return (
                      <Carousel.Item key={key} >
                        <img src={carouselItem.image} alt="" />
                      </Carousel.Item>
                    );
                  })
                }
              </Carousel>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">循环播放</div>
            <div className="demo__preview__content demo__preview__content--bg" style={{ padding: '0' }}>
              <Carousel
                className="my-carousel"
                selectedIndex={0}
                infinite
              >
                {
                  this.state.images.map((carouselItem, index) => {
                    const key = `carousel-${index}`;
                    return (
                      <Carousel.Item key={key} >
                        <img src={carouselItem.image} alt="" />
                      </Carousel.Item>
                    );
                  })
                }
              </Carousel>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">循环 + 自动播放</div>
            <div className="demo__preview__content" style={{ padding: '0' }}>
              <Carousel
                className="my-carousel"
                selectedIndex={0}
                infinite
                autoplay
              >
                {
                  this.state.images.map((carouselItem, index) => {
                    const key = `carousel-${index}`;
                    return (
                      <Carousel.Item key={key} >
                        <img src={carouselItem.image} alt="" />
                      </Carousel.Item>
                    );
                  })
                }
              </Carousel>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">垂直</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <Carousel
                className="my-carousel"
                selectedIndex={0}
                infinite
                direction="vertical"
                style={{
                  width: '6rem',
                  height: '2.33rem',
                  margin: '0 auto',
                  backgroundColor: '#fff',
                }}
              >
                {
                  this.state.images.map((carouselItem, index) => {
                    const key = `carousel-${index}`;
                    return (
                      <Carousel.Item key={key} >
                        <img src={carouselItem.image} alt="" />
                      </Carousel.Item>
                    );
                  })
                }
              </Carousel>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">滚动新闻</div>
            <div className="demo__preview__content">
              <Carousel
                className="my-carousel"
                direction="vertical"
                pagination={false}
                infinite
                autoplay
                style={{
                  height: '0.9rem',
                  backgroundColor: '#fff',
                }}
              >
                {
                  this.state.news.map((news, index) => {
                    const key = `carousel-${index}`;
                    return (
                      <Carousel.Item key={key} >
                        <p
                          className="news"
                          style={{
                            height: '0.9rem',
                            lineHeight: '0.9rem',
                            padding: '0 0.3rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >{news.title}</p>
                      </Carousel.Item>
                    );
                  })
                }
              </Carousel>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
