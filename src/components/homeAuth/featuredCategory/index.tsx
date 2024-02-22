import courseService from "@/src/services/courseService";
import styles from "@/styles/slideCategory.module.scss";
import useSWR from "swr";
import SlideComponent from "../../common/slideComponent";
import { Container } from "reactstrap";
import PageSpinner from "../../common/pageSpinner";

const FeaturedCategory = function () {
  const { data, error } = useSWR("/featured", courseService.getFeaturedCourses);

  if (error) return error;
  if (!data) {
    return <PageSpinner />;
  }

  return (
    <>
      <Container className="d-flex flex-column py-5">
        <p className={styles.titleCategory}>EM DESTAQUE</p>
        <SlideComponent course={data.data} />
      </Container>
    </>
  );
};

export default FeaturedCategory;
