"use client";
import React from "react";
import CoursePlayer from "../../utils/CoursePlayer";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { useState } from "react";
import avatar from "../../images/avatar.png";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddNewReviewMutation,
  useAddReplyInReviewMutation,
} from "../../features/courses/coursesApi";
import { toast, Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { format } from "timeago.js";
import Ratings from "../../utils/Ratings";

const CourseContentMedia = ({
  data,
  reviews,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}) => {
  const [
    addNewQuestion,
    {
      isSuccess: questionSuccess,
      isLoading: questionLoading,
      error: questionError,
    },
  ] = useAddNewQuestionMutation();
  const [
    addAnswerInQuestion,
    { isSuccess: answerSuccess, isLoading: answerLoading, error: answerError },
  ] = useAddAnswerInQuestionMutation();
  const [
    addNewReview,
    { isSuccess: reviewSuccess, isLoading: reviewLoading, error: reviewError },
  ] = useAddNewReviewMutation();
  const [
    addReplyInReview,
    { isSuccess: replySuccess, isLoading: replyLoading, error: replyError },
  ] = useAddReplyInReviewMutation();
  const [activeBar, setActiveBar] = useState(0);
  const [rating, setRating] = useState(1);
  const [answer, setAnswer] = useState("");
  const [reply, setReply] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");

  const isReviewExists = data?.reviews?.find(
    (item) => item.user._id === user.__id
  );

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Асуулт хоосон байна.");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  const handleAnswerSubmit = () => {
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId,
    });
  };

  const handleReviewSubmit = () => {
    if (review.length === 0) {
      toast.error("Сэтгэгдэл хоосон байна.");
    } else {
      addNewReview({
        courseId: id,
        review,
        rating,
      });
    }
  };

  const handleReplySubmit = () => {
    addReplyInReview({
      comment: reply,
      courseId: id,
      reviewId,
    });
  };

  useEffect(() => {
    if (questionSuccess) {
      setQuestion("");
      refetch();
      toast.success("Асуулт нийтлэгдлээ");
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Хариулт нийтлэгдлээ");
    }
    if (replySuccess) {
      setReply("");
      refetch();
      toast.success("Хариулт нийтлэгдлээ");
    }
    if (reviewSuccess) {
      setReview("");
      setRating(1);
      refetch();
      toast.success("Сэтгэглэд нийтлэгдлээ");
    }
    if (questionError) {
      if ("data" in questionError) {
        const errorData = questionError.data;
        toast.error(errorData.message);
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorData = answerError.data;
        toast.error(errorData.message);
      }
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorData = reviewError.data;
        toast.error(errorData.message);
      }
    }
    if (replyError) {
      if ("data" in replyError) {
        const errorData = replyError.data;
        toast.error(errorData.message);
      }
    }
  }, [
    answerError,
    answerSuccess,
    questionError,
    questionSuccess,
    refetch,
    replyError,
    replySuccess,
    reviewError,
    reviewSuccess,
  ]);

  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <Toaster />
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`flex flex-row justify-center items-center  px-6 rounded-full  bg-[#2190ff]  text-[16px] font-Poppins font-semibold text-white  !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Өмнөх
        </div>
        <div
          className={`flex flex-row justify-center items-center  px-6 rounded-full  bg-[#2190ff]  text-[16px] font-Poppins font-semibold text-white  !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === data.length - 1 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              activeVideo === data.length - 1 ? activeVideo : activeVideo + 1
            )
          }
        >
          Дараах
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600] text-white">
        {data[activeVideo].title}
      </h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Тойм", "Хавсралт линк", "Q&A", "Сэтгэгдэл"].map((text, index) => (
          <h5
            className={`800px:text-[20px] cursor-pointer ${
              activeBar === index && "text-red-500"
            }`}
            onClick={() => setActiveBar(index)}
            key={index}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 text-white">
          {data[activeVideo]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item, index) => (
            <div className="mb-5">
              <h2 className="800px:text-[20px] 800px:inline-block text-white">
                {item.title && item.title + ": "}
              </h2>
              <a
                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
                href={item.url}
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <img
              src={user.avatar ? user.avatar.url : avatar}
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={40}
              rows={5}
              placeholder="Асуултаа үлдээнэ үү..."
              className="outline-none bg-transparent ml-3 border text-white border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
            />
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h-[45px] font-Poppins font-semibold !w-[120px] !h-[40px] text-[18px] mt-5 ${
                questionLoading && "cursor-no-drop"
              }`}
              onClick={questionLoading ? () => {} : handleQuestion}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
          <div>
            <Answer
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
            />
          </div>
        </>
      )}
      {activeBar === 3 && (
        <div className="w-full">
          <>
            {!isReviewExists && (
              <>
                <div className="flex w-full">
                  <img
                    src={user.avatar ? user.avatar.url : avatar}
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] font-[500] text-white">
                      Үнэлгээ өгнө үү...
                      <span className="text-red-500"></span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      id=""
                      cols={40}
                      rows={5}
                      placeholder="Асуултаа үлдээнэ үү..."
                      className="outline-none bg-transparent ml-3 border text-white border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
                    />
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    className={`flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h-[45px] font-Poppins font-semibold !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 false ${
                      reviewLoading && "cursor-no-drop"
                    }`}
                    onClick={reviewLoading ? () => {} : handleReviewSubmit}
                  >
                    Submit
                  </div>
                </div>
              </>
            )}
            <br />
            <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
            <div>
              <Reply
                reviews={reviews}
                reply={reply}
                setReply={setReply}
                handleReplySubmit={handleReplySubmit}
                user={user}
                setReviewId={setReviewId}
              />
            </div>
          </>
        </div>
      )}
    </div>
  );
};

const Answer = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setQuestionId,
}) => {
  const [replyActiveIndex, setReplyActiveIndex] = useState(-1);
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo]?.questions
          .slice()
          .reverse()
          .map((item, index) => (
            <QuestionItem
              key={index}
              index={index}
              setAnswer={setAnswer}
              item={item}
              answer={answer}
              setQuestionId={setQuestionId}
              handleAnswerSubmit={handleAnswerSubmit}
              replyActiveIndex={replyActiveIndex}
              setReplyActiveIndex={setReplyActiveIndex}
            />
          ))}
      </div>
    </>
  );
};

const QuestionItem = ({
  setAnswer,
  item,
  answer,
  index,
  setQuestionId,
  handleAnswerSubmit,
  replyActiveIndex,
  setReplyActiveIndex,
}) => {
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div>
            <img
              src={item.user.avatar ? item.user.avatar.url : avatar}
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </div>
          <div className="pl-3">
            <h5 className="text-[20px]">{item?.user.name}</h5>
            <p>{item?.question}</p>
            <small className="text-[#ffffff83]">
              {!item.createdAt ? "" : format(item?.createdAt)}
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="800px:pl-16 text-[#ffffff83] cursor-pointer mr-2"
            onClick={() => {
              setAnswer("");
              if (replyActiveIndex === index) {
                setReplyActiveIndex(-1);
                setQuestionId("");
              } else {
                setReplyActiveIndex(index);
                setQuestionId(item._id);
              }
            }}
          >
            {replyActiveIndex !== index
              ? item.questionReplies.length !== 0
                ? "Хариултууд"
                : "Хариулт нэмэх"
              : "Далдлах"}
          </span>
          <BiMessage size={20} className="cursor-pointer" fill="#ffffff83" />
          <span className="pl-1 mt-[-4px] cursor-pointer text-[#ffffff83]">
            {item.questionReplies.length}
          </span>
        </div>
        {replyActiveIndex === index && (
          <>
            {item.questionReplies.map((item, index) => (
              <div
                className="w-full flex 800px:ml-16 my-5 text-white"
                key={index}
              >
                <div>
                  <img
                    src={item.user.avatar ? item.user.avatar.url : avatar}
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="pl-3">
                  <div className="flex items-center">
                    <h5 className="text-[20px]">{item.user.name}</h5>
                  </div>
                  <p className="text-[#ffffff96]">{item.answer}</p>
                  <small className="text-[#ffffff83]">
                    {!item.createdAt ? "" : format(item?.createdAt)}
                  </small>
                </div>
              </div>
            ))}
            <div className="w-full flex relative text-white">
              <input
                placeholder="Хариулт..."
                className="block 800px:ml-12 mt-2 outline-none bg-transparent border-b text-white border-[#fff] p-[5px] w-[95%]"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-0 bottom-1"
                onClick={handleAnswerSubmit}
                disabled={answer === ""}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const Reply = ({
  reviews,
  reply,
  setReply,
  handleReplySubmit,
  user,
  setReviewId,
}) => {
  const [repActiveIndex, setRepActiveIndex] = useState(-1);
  return (
    <>
      <div className="w-full my-3">
        {reviews
          .slice()
          .reverse()
          .map((item, index) => (
            <ReviewItem
              key={index}
              reviews={reviews}
              index={index}
              setReply={setReply}
              item={item}
              reply={reply}
              setReviewId={setReviewId}
              handleReplySubmit={handleReplySubmit}
              repActiveIndex={repActiveIndex}
              setRepActiveIndex={setRepActiveIndex}
            />
          ))}
      </div>
    </>
  );
};

const ReviewItem = ({
  setReply,
  item,
  reply,
  index,
  setReviewId,
  handleReplySubmit,
  repActiveIndex,
  setRepActiveIndex,
}) => {
  return (
    <>
      <div className="w-full my-5 text-white" key={index}>
        <div className="w-full flex">
          <div>
            <img
              src={item?.user?.avatar ? item.user.avatar.url : avatar}
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </div>
          <div className="w-[95%] ml-2">
            <h1 className="text-[18px]">{item.user.name}</h1>
            <Ratings rating={item.rating} />
            <p>{item.comment}</p>
            <small className="text-[#ffffff83]">
              {format(item?.createdAt)}
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="800px:pl-16 text-[#ffffff83] cursor-pointer mr-2"
            onClick={() => {
              setReply("");
              if (repActiveIndex === index) {
                setRepActiveIndex(-1);
                setReviewId("");
              } else {
                setRepActiveIndex(index);
                setReviewId(item._id);
              }
            }}
          >
            {repActiveIndex !== index
              ? item.commentReplies.length !== 0
                ? "Хариултууд"
                : "Хариулт нэмэх"
              : "Далдлах"}
          </span>
          <BiMessage size={20} className="cursor-pointer" fill="#ffffff83" />
          <span className="pl-1 mt-[-4px] cursor-pointer text-[#ffffff83]">
            {item.commentReplies.length}
          </span>
        </div>
        {repActiveIndex === index && (
          <>
            {item.commentReplies.map((item, index) => (
              <div
                className="w-full flex 800px:ml-16 my-5 text-white"
                key={index}
              >
                <div>
                  <img
                    src={item.user.avatar ? item.user.avatar.url : avatar}
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="pl-3">
                  <div className="flex items-center">
                    <h5 className="text-[20px]">{item.user.name}</h5>
                  </div>
                  <p className="text-[#ffffff96]">{item.comment}</p>
                  <small className="text-[#ffffff83]">
                    {!item.createdAt ? "" : format(item?.createdAt)}
                  </small>
                </div>
              </div>
            ))}
            <div className="w-full flex relative text-white">
              <input
                placeholder="Хариулт..."
                className="block 800px:ml-12 mt-2 outline-none bg-transparent border-b text-white border-[#fff] p-[5px] w-[95%]"
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-0 bottom-1"
                onClick={handleReplySubmit}
                disabled={reply === ""}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default CourseContentMedia;
