"use client";

import { dictionary } from "@/locales";
import React, { FormEvent, useState } from "react";

import { useCreateCourseMutation } from "@/store/services/courses";
import { transliterate } from "@/helpers/transliterate";

const NewCourse = ({ lang }) => {
  const [createCourse, { isLoading }] = useCreateCourseMutation();
  const [courseUrlName, setCourseUrlName] = useState("");

  const onCreateCourseHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    await createCourse(data).unwrap();
  };

  const onNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrlName = transliterate(e.target.value)
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
    setCourseUrlName(newUrlName);
  };

  const onUrlInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredValue = e.target.value.replace(/[^a-zA-Z-]/g, "");
    setCourseUrlName(filteredValue);
  };

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container flex justify-center">
        <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
          <div
            className="wow fadeInUp mb-12 rounded-md bg-primary/[3%] px-8 py-11 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
            data-wow-delay=".15s
          "
          >
            <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
              {dictionary[lang]?.createYourNewCourse}
            </h2>
            <p className="mb-12 text-base font-medium text-body-color">
              {dictionary[lang]?.createYourNewCourseDescription}
            </p>
            <form onSubmit={onCreateCourseHandler}>
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4">
                  <div className="mb-8">
                    <label
                      htmlFor="name"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      {dictionary[lang]?.courseName}
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder={dictionary[lang]?.courseNamePlaceholder}
                      required
                      onChange={onNameChangeHandler}
                      className="w-full rounded-md border border-transparent px-6 py-3 text-base placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="description"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      {dictionary[lang]?.courseDescription}
                    </label>
                    <input
                      type="text"
                      name="description"
                      placeholder={
                        dictionary[lang]?.courseDescriptionPlaceholder
                      }
                      className="w-full rounded-md border border-transparent px-6 py-3 text-base placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    />
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="mb-8">
                    <label
                      htmlFor="name"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      {dictionary[lang]?.courseUrlName}
                    </label>
                    <input
                      type="text"
                      name="urlName"
                      required
                      value={courseUrlName}
                      onChange={onUrlInputChangeHandler}
                      placeholder={dictionary[lang]?.courseUrlNamePlaceholder}
                      className="w-full rounded-md border border-transparent px-6 py-3 text-base placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    />
                  </div>
                </div>

                <div className="w-full px-4">
                  <button
                    disabled={isLoading}
                    className="rounded-md bg-primary px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                  >
                    {isLoading ? (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                    ) : (
                      dictionary[lang]?.createCourse
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewCourse;
