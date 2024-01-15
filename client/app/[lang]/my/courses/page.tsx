import Breadcrumb from "@/components/Common/Breadcrumb";
import { dictionary } from "@/locales";

const CourseCard = ({ course }) => {
  return (
    <div
      className="relative h-48 w-72 cursor-pointer overflow-hidden rounded border bg-cover bg-center transition-transform duration-200 hover:scale-105"
      style={{
        backgroundImage: `url('${course.imageUrl}')`,
      }}
    >
      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-40 p-4">
        <h3 className="text-lg font-bold text-white">{course.name}</h3>
        <div className="mt-2 flex items-center justify-between"></div>
      </div>
    </div>
  );
};

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
  ];

  const coursesLearning = [
    {
      id: 3,
      name: "Course 3",
      imageUrl: "https://source.unsplash.com/random/200x200?sig=3",
    },
    {
      id: 4,
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
          <h2 className="mb-4 text-2xl font-semibold">{dictionary[lang]?.teach}</h2>
          <div className="-mx-4 flex flex-wrap justify-center">
            {coursesTeaching.map((course) => (
              <div
                key={course.id}
                className="mb-6 w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-[30px]">
        <div className="container">
          <h2 className="mb-4 text-2xl font-semibold">{dictionary[lang]?.learn}</h2>
          <div className="-mx-4 flex flex-wrap justify-center">
            {coursesLearning.map((course) => (
              <div
                key={course.id}
                className="mb-6 w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
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
