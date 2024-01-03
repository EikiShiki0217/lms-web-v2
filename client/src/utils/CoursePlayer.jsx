import React from "react";
import ReactPlayer from "react-player";

const CoursePlayer = ({ videoUrl, title }) => {
  return (
    <div className="pt-[53%] relative">
      <ReactPlayer
        className="absolute top-0 left-0"
        controls={true}
        width="100%"
        height="100%"
        url={videoUrl}
      />
    </div>
  );
};

export default CoursePlayer;
