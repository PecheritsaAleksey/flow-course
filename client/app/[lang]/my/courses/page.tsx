import Breadcrumb from "@/components/Common/Breadcrumb";
import CourseCard from "@/components/Courses/CourseCard";
import { dictionary } from "@/locales";
import Link from "next/link";

const Courses = ({ params: { lang } }) => {
  const coursesTeaching = [
    {
      id: 1,
      name: "Course 1",
      imageUrl: "https://source.unsplash.com/random/200x200?sig=1",
    },
    {
      id: 2,
      name: "Course 2",
      imageUrl: "https://source.unsplash.com/random/200x200?sig=2",
    },
    {
      id: 3,
      name: "Course 3",
      imageUrl: "https://source.unsplash.com/random/200x200?sig=3",
    },
  ];

  const coursesLearning = [
    {
      id: 4,
      name: "Course 3",
      imageUrl: "https://source.unsplash.com/random/200x200?sig=3",
    },
    {
      id: 5,
      name: "Course 4",
      imageUrl: "https://source.unsplash.com/random/200x200?sig=4",
    },
  ];

  return (
    <>
      <Breadcrumb
        pageName={dictionary[lang]?.coursesBreadcrumb}
        description={dictionary[lang]?.coursesBreadcrumbDescription}
      />

      <section className="pt-[10px]">
        <div className="container">
          <h2 className="mb-4 text-2xl font-semibold">
            {dictionary[lang]?.teach}
          </h2>
          <div className="-mx-4 flex flex-wrap justify-around">
            {coursesTeaching.map((course) => (
              <div key={course.id} className="mb-6 px-4">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
          <div className="mx-4 my-8 flex items-center">
            <Link href={"/my/course/new"}>
              <button className="rounded-full bg-primary px-8 py-6 font-bold text-white hover:bg-opacity-80">
                {dictionary[lang]?.addNewCourse}
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="pt-[30px]">
        <div className="container">
          <h2 className="mb-4 text-2xl font-semibold">
            {dictionary[lang]?.learn}
          </h2>
          <div className="-mx-4 flex flex-wrap justify-around">
            {coursesLearning.map((course) => (
              <div key={course.id} className="mb-6 px-4">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Courses;
