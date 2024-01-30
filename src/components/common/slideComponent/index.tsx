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
        <Swiper loop slidesPerView={4} pagination={false}>
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
