// Swiper imports:
import { register } from "swiper/element/bundle";
register();
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { CourseType } from "@/src/services/courseService";
import SlideCard from "../slideCard";

interface props {
  course: CourseType[];
}

const SlideComponent = function ({ course }: props) {
  return (
    <>
      <div>
        <Swiper
          loop
          pagination={false}
          navigation
          centre
          style={{
            // @ts-ignore
            "--swiper-navigation-color": "#ff0044",
          }}
          breakpoints={{
            250: { slidesPerView: 1 },
            768: {
              slidesPerView: 2,
              spaceBetween: 48,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 48,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 78,
            },
            1400: {
              slidesPerView: 4,
              spaceBetween: 58,
            },
          }}
        >
          {course?.map((course) => (
            <SwiperSlide key={course.id}>
              <SlideCard course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default SlideComponent;
