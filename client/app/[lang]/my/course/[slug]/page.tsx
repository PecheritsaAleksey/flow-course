import NewCourse from "@/components/Courses/NewCourse";

const CoursePage = ({
  params: { slug, lang },
}: {
  params: { slug: string; lang: string };
}) => {
  if (slug === "new") {
    return <NewCourse lang={lang} />;
  }
  return <p>Course: {slug}</p>;
};

export default CoursePage;
