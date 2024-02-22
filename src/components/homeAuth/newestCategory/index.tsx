import styles from "@/styles/slideCategory.module.scss";
import courseService from "@/src/services/courseService";
import useSWR from "swr";
import SlideComponent from "../../common/slideComponent";
import { Container } from "reactstrap";
import PageSpinner from "../../common/pageSpinner";

const NewestCategory = function () {
  const { data, error } = useSWR("/newest", courseService.getNewestCourses);

  if (error) return error;
  if (!data) {
    return <PageSpinner />;
  }

  return (
    <>
      <Container className="d-flex flex-column py-5">
        <p className={styles.titleCategory}>LANÇAMENTOS</p>
        <SlideComponent course={data.data} />
      </Container>
    </>
  );
};

export default NewestCategory;
