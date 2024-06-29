import React from "react";

const HeroSection = () => {
  return (
    <div className="sm:w-[60vw] h-[20vh] overflow-clip sm:rounded-3xl mx-auto flex justify-center items-center">
      <form className="absolute flex justify-center items-center">
        <input
          type="search"
          placeholder="Search..."
          id="search"
          className="py-5 px-2 w-[80vw] sm:w-[40vw] text-xl sm:text-3xl mx-auto outline-none border-b-2"
        />
      </form>
    </div>
  );
};

export default HeroSection;
