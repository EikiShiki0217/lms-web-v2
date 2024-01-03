import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const CourseData = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index, value) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };
  const handleAddBenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  };
  const handlePrerequisitesChange = (index, value) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };
  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };
  const nextButton = () => [setActive(active + 1)];
  const prevButton = () => [setActive(active - 1)];
  return (
    <div className="w-[80%] m-auto block">
      <div>
        <label className="text-[20px] font-Poppins text-white" htmlFor="email">
          What are the benefits for studentsin this course?
        </label>
        <br />
        {benefits.map((benefit, index) => (
          <input
            type="text"
            key={index}
            name="Benefit"
            placeholder="You will be able to builda full stack LMS Platform"
            required
            className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins my-2"
            value={benefit.title || ""}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefits}
        />
      </div>
      <div>
        <label className="text-[20px] font-Poppins text-white" htmlFor="email">
          What are the benefits for studentsin this course?
        </label>
        <br />
        {prerequisites.map((prerequisite, index) => (
          <input
            type="text"
            key={index}
            name="prerequisite"
            placeholder="You will be able to builda full stack LMS Platform"
            required
            className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins my-2"
            value={prerequisite.title || ""}
            onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisite}
        />
      </div>
      <div className="w-full flex items-center  justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => nextButton()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
