"use client";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useChargeMutation } from "../../features/user/userApi";
import { useFormik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  userId: Yup.string().required("Please enter your UserId!"),
  unit: Yup.string().required("Please enter your unit"),
});

const AdminCharge = ({ userId, setOpen }) => {
  const [charge, { isSuccess, isError, error }] = useChargeMutation();
  const formik = useFormik({
    initialValues: { userId: userId, unit: 0 },
    validationSchema: schema,
    onSubmit: async ({ userId, unit }) => {
      await charge({ userId, unit });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Цэнэглэлт амжилттай");
      setOpen(false);
      window.location.reload();
    }

    if (isError) {
      if ("data" in error) {
        const errorData = error;
        toast.error(errorData.data.message);
      }
    }
  }, [error, isError, isSuccess, setOpen]);

  const { values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1
        className={`${"text-[25px] text-white font-[500] font-Poppins text-center py-2 "}`}
      >
        Данс цэнэглэх
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full mt-5 relative mb-1">
          <label className={`${"text-[16px] font-Poppins text-white "}`}>
            Хэрэглэгчийн ID
          </label>
          <input
            type="text"
            readOnly
            name="id"
            value={values.userId}
            onChange={handleChange}
            id="password"
            className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
          />
        </div>
        <div className="w-full mt-5 relative mb-1">
          <label className={`${"text-[16px] font-Poppins text-white "}`}>
            Цэнэглэх дүн
          </label>
          <input
            type="Number"
            name="unit"
            value={values.unit}
            onChange={handleChange}
            id="unit"
            className="w-full text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
          />
        </div>
        <div className="w-full mt-5">
          <input
            type="submit"
            value="Цэнэглэх"
            className={`${"flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#2100ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold text-white"}`}
          />
        </div>
      </form>
      <br />
    </div>
  );
};

export default AdminCharge;
