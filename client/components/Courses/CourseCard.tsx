import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div
      className="relative h-48 w-96 cursor-pointer overflow-hidden rounded border bg-cover bg-center transition-transform duration-200 hover:scale-105"
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

export default CourseCard;
