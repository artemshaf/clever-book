import { useState } from 'react';
import { FreeMode, Thumbs, Pagination, Scrollbar, type Swiper as SwiperRefType } from 'swiper';
import { SwiperProps } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/scrollbar';
import { IClassNames } from '../../types/modules';

export const useBookSwiperSlider = (styles: IClassNames) => {
  const [swiperActiveIndex, setSwiperActiveIndex] = useState<number>(0);

  const [swiperThumbsTop, setSwiperThumbsTop] = useState<SwiperRefType | null>(null);
  const [swiperThumbsBot, setSwiperThumbsBot] = useState<SwiperRefType | null>(null);

  const slideTo = (index: number) => {
    if (swiperThumbsTop) {
      swiperThumbsTop.slideTo(index);
      swiperThumbsTop.activeIndex = index;
    }
    if (swiperThumbsBot) {
      swiperThumbsBot.slideTo(index);
      swiperThumbsBot.activeIndex = index;
    }
    setSwiperActiveIndex(index);
  };

  const bottomSwiperAttrs: SwiperProps = {
    scrollbar: {
      hide: false,
    },
    thumbs: {
      swiper: swiperThumbsTop && !swiperThumbsTop.destroy ? swiperThumbsTop : null,
    },
    onSwiper: setSwiperThumbsBot,
    threshold: 5,
    slidesPerView: 5,
    spaceBetween: 30,
    watchSlidesProgress: true,
    modules: [Thumbs, Scrollbar, FreeMode],
    wrapperTag: 'ul',
    className: styles.book__topInfo__img__list__bottom,
  };

  const topSwiperAttrs: SwiperProps = {
    pagination: {
      clickable: true,
    },
    onSwiper: setSwiperThumbsTop,
    thumbs: {
      swiper: swiperThumbsBot && !swiperThumbsBot.destroy ? swiperThumbsBot : null,
    },
    onSlideChange: (swiper) => {
      slideTo(swiper.activeIndex);
    },
    grabCursor: true,
    spaceBetween: 30,
    modules: [Thumbs, Pagination, FreeMode],
    wrapperTag: 'ul',
    className: styles.book__topInfo__img__list__top,
  };

  return { bottomSwiperAttrs, topSwiperAttrs, slideTo, swiperActiveIndex, setSwiperActiveIndex };
};
