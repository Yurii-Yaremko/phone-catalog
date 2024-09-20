import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Mousewheel } from 'swiper/modules';
import SwiperCore from 'swiper';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { FC, useRef, useState } from 'react';

import styles from './Slider.module.scss';
import classnames from 'classnames';
import { ButtonRounded } from '../buttons';
import { Direction } from '../../enums/Direction';
import React from 'react';

interface Settings {
  slidesPerView: number;
  spaceBetween: number;
  delay: number;
  breakpoints?: {
    640: {
      slidesPerView: number;
    };
    1200: {
      slidesPerView: number;
    };
  };
}

interface SliderProps {
  sliders: JSX.Element[] | string[];
  settings: Settings;
  sliderHeader?: {
    title: string;
  };
  width?: boolean;
}

interface Props {
  slider: SliderProps;
}

export const Slider: FC<Props> = ({ slider }) => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { sliders, settings, sliderHeader, width } = slider;
  const { slidesPerView, spaceBetween, breakpoints, delay } = settings;

  const handleSwiperInit = (swiper: SwiperCore) => {
    swiperRef.current = swiper;
    setActiveIndex(swiper.realIndex);
  };

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setActiveIndex(swiperRef.current.realIndex);
    }
  };

  const handleButtonPrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleButtonNext = () => {
    swiperRef.current?.slideNext();
  };

  const goToSlide = (index: number) => {
    swiperRef.current?.slideTo(index);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.sliderWrapper}>
        {sliderHeader && (
          <div className={styles.sliderHeader}>
            <h3 className={styles.title}>{sliderHeader.title}</h3>

            <div className={styles.buttons}>
              <ButtonRounded onClick={handleButtonPrev} />

              <ButtonRounded rotate={Direction.right} onClick={handleButtonNext} />
            </div>
          </div>
        )}
        <Swiper
          onSwiper={handleSwiperInit}
          onSlideChange={handleSlideChange}
          modules={[Navigation, Autoplay, Mousewheel]}
          loop
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
          mousewheel={true}
          breakpoints={{
            640: {
              slidesPerView: breakpoints?.['640'].slidesPerView ?? 1,
            },
            1200: {
              slidesPerView: breakpoints?.['1200'].slidesPerView ?? 1,
            },
          }}
          autoplay={{
            delay: delay,
            disableOnInteraction: false,
          }}
          className={classnames(styles.responsiveSwiper, {
            [styles.width]: width,
          })}
        >
          {sliders.map((slide, index) => (
            <SwiperSlide key={index}>
              {typeof slide === 'string' ? (
                <div className={styles.img}>
                  <img src={slide} alt="slide" />
                </div>
              ) : (
                slide
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {!sliderHeader && (
          <div className={styles.customPagination}>
            {sliders.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={classnames(styles.paginationButton, {
                  [styles.active]: index === activeIndex,
                })}
              />
            ))}
          </div>
        )}

        {!sliderHeader && (
          <>
            <button className={classnames(styles.button, styles.prev)} onClick={handleButtonPrev} />
            <button className={classnames(styles.button, styles.next)} onClick={handleButtonNext} />
          </>
        )}
      </div>
    </div>
  );
};
