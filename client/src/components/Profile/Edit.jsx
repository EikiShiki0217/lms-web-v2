"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useEditProfileMutation } from "../../features/user/userApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string()
    .email("Invalid Email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(8),
});

const Edit = ({ user, setOpen }) => {
  const [editProfile, { data, error, isSuccess }] = useEditProfileMutation();
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: { name: user.name, email: user.email, password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      await editProfile({ name, email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Амжилттай шинэчилэгдлээ!";
      toast.success(message);
      window.location.reload();
    }

    if (error) {
      if ("data" in error) {
        const errorData = error;
        toast.error(errorData.data.message);
      }
    }
  }, [data?.message, error, isSuccess, setOpen]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1
        className={`${"text-[25px] text-white font-[500] font-Poppins text-center py-2 "}`}
      >
        Мэдээллээ Шинэчлэх
      </h1>
      <form onSubmit={handleSubmit}>
        <label className={`${"text-[16px] font-Poppins text-white "}`}>
          Нэр
        </label>
        <input
          type="text"
          name=""
          value={values.name}
          onChange={handleChange}
          id="name"
          placeholder="Shiki"
          className={`${
            errors.name && touched.name && "border-red-500"
          } ${"w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"}`}
        />
        {errors.name && touched.name && (
          <span className="text-red-500 pt-2 block">{errors.name}</span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label className={`${"text-[16px] font-Poppins text-white "}`}>
            Цахим хаяг
          </label>
          <input
            type="email"
            name=""
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="loginmail@gmail.com"
            className={`${
              errors.email && touched.email && "border-red-500"
            } ${"w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"}`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 pt-2 block">{errors.email}</span>
          )}
        </div>

        <div className="w-full mt-5 relative mb-1">
          <label className={`${"text-[16px] font-Poppins text-white "}`}>
            Нууц үг
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password!@%"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${"w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-2 right-2 z-4 cursor-pointer text-white"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-2 right-2 z-4 cursor-pointer text-white"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && errors.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}
        <div className="w-full mt-5">
          <input
            type="submit"
            value="Шинэчлэх"
            className={`${"flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#2100ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold text-white"}`}
          />
        </div>
      </form>
      <br />
    </div>
  );
};

export default Edit;
