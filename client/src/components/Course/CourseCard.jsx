import { Link } from "react-router-dom";
import { AiOutlineUnorderedList } from "react-icons/ai";
import Ratings from "../../utils/Ratings";

const CourseCard = ({ item, isProfile }) => {
  return (
    <Link to={`/course/${item._id}`}>
      <div className="w-full min-h-[35vh] h-[46vh] bg-slate-500 bg-opacity-20 backdrop-blur border border-[#ffffff1d] shadow-[bg-slate-700] rounded-lg p-3 shadow-sm">
        <img
          src={item.thumbnail.url}
          className="rounded w-full h-[200px] object-cover object-center"
          alt=""
        />
        <br />
        <h1 className="font-Poppins text-[16px] text-[#fff]">{item.name}</h1>
        <div className="w-full flex items-center justify-between pt-2">
          <Ratings rating={item.rating} />
          <h5 className={`text-[#fff] ${isProfile && "hidden 800px:inline"}`}>
            {item.purchased} Students
          </h5>
        </div>
        <div className="w-full flex items-center justify-between pt-3">
          <div className="flex">
            <h3 className="text-[#fff]">
              {item.price === 0 ? "Free" : item.price + "₮"}
            </h3>
            <h5 className="pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-[#fff]">
              {item.estimatedPrice}₮
            </h5>
          </div>
          <div className="flex items-center pb-3">
            <AiOutlineUnorderedList size={20} fill="#fff" />
            <h5 className="pl-2 text-[#fff]">
              {item.courseData?.length} Lectures
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
