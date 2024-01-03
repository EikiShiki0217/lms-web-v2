import React, { useEffect, useState } from "react";
import { useLoadUserQuery } from "../../app/api/apiSlice";
import avatarIcon from "../../images/avatar.png";
import { AiOutlineCamera } from "react-icons/ai";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "../../features/user/userApi";
import { Toaster, toast } from "react-hot-toast";

const ProfileInfo = ({ user }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfileMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const imageHandler = async (e) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };

    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
    }
    if (error || updateError) {
      console.log(error);
    }
    if (isSuccess) {
      toast.success("Profile updated");
    }
  }, [error, isSuccess, success, updateError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({
        name: name,
      });
    }
  };

  return (
    <>
      <Toaster />
      <div className="w-full flex justify-center">
        <div className="relative">
          <img
            src={user?.avatar ? user.avatar.url : avatarIcon}
            alt=""
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png, image/jpg, image/jpeg, image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className=" w-[100%]">
              <label className="block pb-2">Full Name</label>
              <input
                className="w-full bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins !w-[95%] mb-4 800px:mb-0"
                required=""
                type="text"
                name="name"
                defaultValue={user.name}
              />
            </div>
            <div className=" w-[100%] pt-2">
              <label className="block pb-2">Email Address</label>
              <input
                className="w-full bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins !w-[95%] mb-1 800px:mb-0"
                required=""
                type="email"
                readOnly
                value={user.email}
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

export default ProfileInfo;
