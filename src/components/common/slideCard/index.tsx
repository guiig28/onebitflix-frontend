import styles from "./styles.module.scss";
import { CourseType } from "@/src/services/courseService";
import Link from "next/link";

interface props {
  course: CourseType;
}

const SlideCard = function ({ course }: props) {
  return (
    <div key={course.id}>
      <Link
        href={`/courses/${course.id}`}
        className="link-underline link-underline-opacity-0"
      >
        <div className={styles.slide}>
          <img
            src={`${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl}`}
            alt={course.name}
            className={styles.slideImg}
          />
          <p className={styles.slideTitle}>{course.name}</p>
          <p className={styles.slideDescription}>{course.synopsis}</p>
        </div>
      </Link>
    </div>
  );
};

export default SlideCard;
