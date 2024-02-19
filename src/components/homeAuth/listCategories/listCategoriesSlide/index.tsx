import SlideComponent from "@/src/components/common/slideComponent";
import categoryService from "@/src/services/categoryService";
import styles from "@/styles/slideCategory.module.scss";
import useSWR from "swr";

interface props {
  categoryId: number;
  categoryName: string;
}

const ListCategoriesSlide = function ({ categoryId, categoryName }: props) {
  const { data, error } = useSWR(`/categoriesCourses/${categoryId}`, () =>
    categoryService.getCourses(categoryId)
  );

  if (error) return error;
  if (!data) return <p>Loading...</p>;

  return (
    <div key={categoryId}>
      <p className={styles.titleCategory}>{categoryName}</p>
      <SlideComponent course={data.data.courses} />
    </div>
  );
};

export default ListCategoriesSlide;
