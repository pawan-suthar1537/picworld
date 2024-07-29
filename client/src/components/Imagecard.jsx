const Imagecard = ({ id, img, title, price, author, ic1, ic2 }) => {
  return (
    <div>
      <div className="rounded-lg bg-white shadow-lg p-2 h-fit">
        <div className="w-full h-[200px] overflow-hidden rounded-3xl">
          <img
            src={img}
            className="w-full h-full hover:scale-105 ease-linear duration-300 transform cursor-pointer "
            alt="img"
          />
        </div>
        <p className="font-semibold text-white  bg-black w-fit rounded-full text-sm mt-3 px-2 py-1">
          @{author}
        </p>
        <div className="flex justify-between items-center mt-2">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-gray-500">Price: ${price}</p>
          </div>
          <div className="flex gap-5 justify-center items-center cursor-pointer">
            {ic1}
            {ic2}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Imagecard;
