import styles from "@/styles/slideCategory.module.scss";
import useSWR from "swr";
import { Container } from "reactstrap";
import categoryService, { CategoryType } from "@/src/services/categoryService";
import ListCategoriesSlide from "./listCategoriesSlide";

const ListCategories = function () {
  const { data, error } = useSWR(
    "/listCategories",
    categoryService.getCategories
  );

  if (error) return error;
  if (!data) return <p>Loading...</p>;

  return (
    <>
      {data.data.categories?.map((category: CategoryType) => (
        <div key={category.id}>
          <Container className="d-flex flex-column py-5">
            <ListCategoriesSlide
              categoryId={category.id}
              categoryName={category.name}
            />
          </Container>
        </div>
      ))}
    </>
  );
};

export default ListCategories;
