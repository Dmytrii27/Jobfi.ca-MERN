import React from "react";
import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { HeroImage } from "../assets";
import CustomButton from "./CustomButton";

// Оновлений компонент пошуку
const SearchInput = ({ placeholder, icon, value, setValue, styles }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const clearInput = () => setValue("");

  return (
    <div className={`flex w-full md:w-1/3 items-center ${styles}`}>
      {icon}

      <input
        value={value}
        onChange={(e) => handleChange(e)}
        type="text"
        className="w-full md:w-64 p-2 outline-none bg-transparent text-base text-black placeholder:text-black"
        placeholder={placeholder}
      />

      <AiOutlineCloseCircle
        className="hidden md:flex text-black text-xl cursor-pointer"
        onClick={clearInput}
      />
    </div>
  );
};

const Header = ({
  title,
  type,
  handleClick,
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
  isCompanyPage, // Новий пропс для сторінки компаній
}) => {
  // Функція для обробки натискання на популярний запит
  const handlePopularSearchClick = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="bg-[#f7fdfd] relative">
      <div
        className={`container mx-auto px-5 ${type ? "h-[450px]" : "h-[300px]"} flex items-center relative`}
        style={{
          paddingTop: isCompanyPage ? "0px" : "10px", // Збільшуємо відступ для сторінки "Find Job"
        }}
      >
        <div className="w-full z-10 mt-40">
          <div className="mb-6">
            <p className="text-black font-extrabold text-4xl">
              {isCompanyPage
                ? "Find Your Dream Company!" // Заголовок для сторінки "Companies"
                : "Find Opportunities That Suit You Best!"} {/* Заголовок для сторінки "Find Job" */}
            </p>
          </div>

          {/* Пошуковий блок */}
          <div className="w-full flex items-center justify-around bg-white px-2 md:px-5 py-2.5 md:py-6 shadow-2xl rounded-full border-2 border-black mt-8">
            <SearchInput
              placeholder="Job Title or Keywords"
              icon={<AiOutlineSearch className="text-black text-xl" />}
              value={searchQuery}
              setValue={setSearchQuery}
            />
            <SearchInput
              placeholder="Add Country or City"
              icon={<CiLocationOn className="text-black text-xl" />}
              value={location}
              setValue={setLocation}
              styles={"hidden md:flex"}
            />

            <div>
              <CustomButton
                onClick={handleClick}
                title="Search"
                containerStyles={
                  "text-white py-2 md:py-3 px-3 md:px-10 focus:outline-none bg-black rounded-full md:rounded-md text-sm md:text-base"
                }
              />
            </div>
          </div>

          {/* Популярні пошукові запити */}
          {type && (
            <div className="w-full lg:1/2 flex flex-wrap gap-3 md:gap-6 py-6 md:py-9 mb-7">
              {[
                "Software Engineer",
                "Full-Stack Developer",
                "Office Assistant",
                "Project Manager",
                "UI/UX Designer",
                "QA Engineer",
                "Content Creator",
                "Business Analyst",
                "Marketing Specialist",
                "Product Manager",
                "Graphic Designer",
              ].map((search, index) => (
                <button
                  key={index}
                  className="bg-black text-white py-1 px-2 rounded-full text-sm md:text-base cursor-pointer"
                  onClick={() => handlePopularSearchClick(search)} // Додаємо подію для натискання
                >
                  {search}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Картинка */}
        <div
          className={`w-[340px] h-[340px] ${
            isCompanyPage ? "absolute mt-5" : " absolute mb-40"
          } right-[8%]`}
        >
          <img src={HeroImage} className="object-contain w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Header;


