import { getLangCookie, setLangCookie } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LANG_LIST = [
  { name: "Русский", code: "ru" },
  { name: "English", code: "en" },
];

const LangToggler = () => {
  const router = useRouter();

  const [langListOpen, setLangListOpen] = useState(false);
  const [currentLangCode] = useState(getLangCookie());

  const langChangeHandler = (lang: string) => () => {
    setLangCookie(lang);
    router.refresh();
  };

  const hangleLangListOpen = () => {
    setLangListOpen((prev) => !prev);
  };

  return (
    <div className="group relative">
      <a
        onClick={hangleLangListOpen}
        className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
      >
        {LANG_LIST.find(
          (lang) => lang.code === currentLangCode
        )?.code.toUpperCase()}
        <span className="pl-3">
          <svg width="15" height="14" viewBox="0 0 15 14">
            <path
              d="M7.81602 9.97495C7.68477 9.97495 7.57539 9.9312 7.46602 9.8437L2.43477 4.89995C2.23789 4.70308 2.23789 4.39683 2.43477 4.19995C2.63164 4.00308 2.93789 4.00308 3.13477 4.19995L7.81602 8.77183L12.4973 4.1562C12.6941 3.95933 13.0004 3.95933 13.1973 4.1562C13.3941 4.35308 13.3941 4.65933 13.1973 4.8562L8.16601 9.79995C8.05664 9.90933 7.94727 9.97495 7.81602 9.97495Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </a>
      <div
        className={`submenu relative rounded-md bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute  lg:block lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible  ${
          langListOpen ? "block" : "hidden"
        }`}
      >
        {LANG_LIST.filter((lang) => lang.code !== currentLangCode).map(
          (lang) => (
            <button
              key={lang.code}
              onClick={langChangeHandler(lang.code)}
              className="block rounded py-2.5 text-sm text-dark hover:opacity-70 dark:text-white lg:px-3"
            >
              {lang.name}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default LangToggler;
