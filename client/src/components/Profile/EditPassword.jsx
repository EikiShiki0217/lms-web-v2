import React, { useEffect, useState } from "react";
import { useUpdatePasswordMutation } from "../../features/user/userApi";
import { Toaster, toast } from "react-hot-toast";

const EditPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password Changed");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error;
        toast.error(errorData.data.message);
      }
    }
  }, [error, isSuccess]);

  return (
    <>
      <Toaster />
      <div className="w-full pl-6 800px:pl-10">
        <div className="block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-[#fff] pb-2">
          Change Password
        </div>
        <form onSubmit={passwordChangeHandler}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className=" w-[100%]">
              <label className="block pb-2">Old Password</label>
              <input
                className="bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins !w-[95%] mb-4 800px:mb-0"
                required=""
                type="password"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className=" w-[100%] pt-2">
              <label className="block pb-2">New Password</label>
              <input
                className="bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins !w-[95%] mb-1 800px:mb-0"
                required=""
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className=" w-[100%] pt-2">
              <label className="block pb-2">Confirm Password</label>
              <input
                className="bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins !w-[95%] mb-1 800px:mb-0"
                required=""
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <input
              className="w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center text-[#fff] rounded-[3px] mt-8 cursor-pointer"
              required=""
              type="submit"
              value="Update"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditPassword;
