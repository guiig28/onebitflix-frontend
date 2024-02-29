import styles from "@/styles/search.module.scss";
import Head from "next/head";
import HeaderAuth from "@/src/components/common/headerAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import courseService, { CourseType } from "@/src/services/courseService";
import Footer from "@/src/components/common/footer";
import { Container } from "reactstrap";
import SearchCard from "@/src/components/searchCard";
import PageSpinner from "@/src/components/common/pageSpinner";

const Search = function () {
  const router = useRouter();
  const searchName: any = router.query.name;

  const [searchResult, setSearchResult] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);

  const searchCourses = async function () {
    const res = await courseService.getSearch(searchName);

    setSearchResult(res.data.courses);
  };

  useEffect(() => {
    if (!sessionStorage.getItem("onebitflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    searchCourses();
  }, [searchName]);

  if (loading) return <PageSpinner />;

  return (
    <>
      <Head>
        <title>Onebitflix - {searchName}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <div className={styles.backgroundHeaderFooter}>
          <HeaderAuth />
        </div>
        {searchResult.length >= 1 ? (
          <Container className="d-flex flex-wrap justify-content-center gap-5 py-4">
            {searchResult?.map((course) => (
              <SearchCard course={course} key={course.id} />
            ))}
          </Container>
        ) : (
          <p className={styles.noSearchText}>Nenhum resultado encontrado!</p>
        )}
        <div className={styles.backgroundHeaderFooter}>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Search;
