import Footer from "@/src/components/common/footer";
import HeaderAuth from "@/src/components/common/headerAuth";
import courseService, { CourseType } from "@/src/services/courseService";
import styles from "@/styles/coursePage.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CoursePage = function () {
  const router = useRouter();
  const { id } = router.query;

  const [course, setCourse] = useState<CourseType>();

  const getCourse = async function () {
    if (typeof id !== "string") return;

    const res = await courseService.getEpisodes(id);

    if (res.status === 200) {
      setCourse(res.data);
    }
  };

  useEffect(() => {
    getCourse();
  }, [id]);

  return (
    <>
      <Head>
        <title>Onebitflix - {course?.name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderAuth />
        <p>{course?.name}</p>
        <Footer />
      </main>
    </>
  );
};

export default CoursePage;
