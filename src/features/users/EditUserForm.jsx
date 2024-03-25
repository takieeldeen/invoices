import { useForm } from "react-hook-form";

import { FaPen, FaPhone } from "react-icons/fa6";
import { AiOutlineUser } from "react-icons/ai";
import { GrUserAdmin } from "react-icons/gr";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { useSpecificUser } from "./useSpecificUser";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { useUpdateUser } from "./useUpdateUser";
import OverlaySpinner from "../../ui/OverlaySpinner";
import { useTranslation } from "react-i18next";

function EditUserForm({ id = "b1f7a3e3-9996-48f2-a539-5335899487ef", close }) {
  // Initate translation variable
  const [t, i18n] = useTranslation();
  const { isLoading, user } = useSpecificUser(id);
  const userInfo = user?.user;
  const values = {
    email: userInfo?.email,
    first_name: userInfo?.user_metadata.first_name,
    last_name: userInfo?.user_metadata.last_name,
    img_url: userInfo?.user_metadata.img_url,
    role: userInfo?.user_metadata.role,
    phone: userInfo?.phone,
  };
  const { updateUser, isUpdating } = useUpdateUser();
  // Initialize useForm hook
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {},
    values,
  });
  //Capture the current Image
  function onSubmit(data) {
    data["id"] = userInfo.id;
    console.log(data);
    updateUser(data);
  }
  // Storing the current img in a state variable
  const currentImg = watch("img_url");
  const [currentDisplayedImg, setCurrentDisplayedImg] = useState("");
  //Effect to display the img
  useEffect(() => {
    if (typeof currentImg === "object") {
      const newImg = currentImg[0];
      const reader = new FileReader();
      reader.onload = () => {
        setCurrentDisplayedImg(reader.result);
      };
      reader.readAsDataURL(newImg);
    } else if (typeof currentImg === "string") {
      setCurrentDisplayedImg(() => currentImg);
    }
  }, [currentImg, currentDisplayedImg]);
  return (
    // Overlay layer
    <div className="absolute left-0 top-0 z-20 flex h-screen w-full items-center justify-center backdrop-blur-sm">
      <div className="relative h-[80dvh]  w-4/5  max-w-[50rem] overflow-hidden rounded-lg bg-neutral-100 p-2 py-8 drop-shadow-xl dark:bg-dark">
        {(isLoading || isUpdating) && <OverlaySpinner />}
        {/* Input form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex h-full flex-col items-center gap-8 overflow-hidden overflow-y-scroll pb-7"
        >
          <button
            className="absolute right-2 dark:text-neutral-100"
            onClick={close}
          >
            <FaTimes />
          </button>
          <h2 className=" px-2 text-xl font-semibold uppercase text-neutral-800 dark:text-neutral-200">
            {t("updateUser.title")}
          </h2>
          {/* Picture Input */}
          <figure className="relative">
            <img
              src={currentDisplayedImg}
              className="h-24 w-24 rounded-full drop-shadow-md"
              alt=""
            />
            <input
              type="file"
              id="profilePic"
              hidden
              name="img_url"
              {...register("img_url")}
            />
            <label htmlFor="profilePic" className="">
              <div className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-purple-700 drop-shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-purple-800">
                <FaPen className="text-neutral-100" />
              </div>
            </label>
          </figure>
          <div className="divide-neutral-400 md:flex  md:divide-x-2 [&:lang(ar)]:divide-x-0">
            {/* Form Inputs */}
            <div className="flex flex-col gap-2 px-2">
              {/* Input text */}
              <div className="relative">
                <input
                  type="text"
                  name="first_name"
                  placeholder={t("updateUser.firstName")}
                  aria-invalid={errors.first_name ? "true" : "false"}
                  className="peer rounded-md border-2 border-neutral-400 bg-transparent px-6 py-2 outline-none transition-all duration-300 focus:border-neutral-600 focus:outline-none dark:border-neutral-100 dark:text-neutral-100"
                  {...register("first_name", {
                    required: true,
                    minLength: 3,
                  })}
                />
                <figure className="absolute left-3 top-5 -translate-x-1/2 -translate-y-1/2 text-neutral-500 transition-all duration-300 peer-focus:text-neutral-700 dark:text-neutral-100 [&:lang(ar)]:left-auto [&:lang(ar)]:right-0">
                  <AiOutlineUser />
                </figure>
                <p className="mx-3 w-full text-wrap text-xs font-bold text-red-700">
                  {errors.first_name?.type === "required"
                    ? "This field is required"
                    : errors.first_name?.type === "minLength"
                      ? "The minimum length for first name field is 3 chars"
                      : ""}
                </p>
              </div>
              {/* Input text */}

              <div className="relative">
                <input
                  type="text"
                  name={t("updateUser.lastName")}
                  aria-invalid={errors.last_name ? "true" : "false"}
                  placeholder="Last Name"
                  className="peer rounded-md border-2 border-neutral-400 bg-transparent px-6 py-2 outline-none transition-all duration-300 focus:border-neutral-600 focus:outline-none dark:border-neutral-100 dark:text-neutral-100"
                  {...register("last_name", {
                    required: true,
                    minLength: 3,
                  })}
                />
                <figure className="absolute left-3 top-5 -translate-x-1/2 -translate-y-1/2 text-neutral-500 transition-all duration-300 peer-focus:text-neutral-700 [&:lang(ar)]:left-auto [&:lang(ar)]:right-0">
                  <AiOutlineUser />
                </figure>
                <p className="mx-3 w-full text-wrap text-xs font-bold text-red-700">
                  {errors.last_name?.type === "required"
                    ? "This field is required"
                    : errors.last_name?.type === "minLength"
                      ? "The minimum length for last name field is 3 chars"
                      : ""}
                </p>
              </div>
              {/* Input text */}

              <div className="relative">
                <input
                  type="email"
                  placeholder={t("updateUser.email")}
                  aria-invalid={errors.email ? "true" : "false"}
                  name="email"
                  className="peer rounded-md border-2 border-neutral-400 bg-transparent px-6 py-2 outline-none transition-all duration-300 focus:border-neutral-600 focus:outline-none dark:border-neutral-100 dark:text-neutral-100"
                  {...register("email", {
                    required: true,
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                  })}
                />
                <figure className="absolute left-3 top-5 -translate-x-1/2 -translate-y-1/2 text-neutral-500 transition-all duration-300 peer-focus:text-neutral-700 [&:lang(ar)]:left-auto [&:lang(ar)]:right-0">
                  <MdAlternateEmail />
                </figure>
                <p className="mx-3 text-xs font-bold text-red-700">
                  {errors.email?.type === "required"
                    ? "This field is required"
                    : errors.email?.type === "pattern"
                      ? "wrong email format Ex: example@example.example"
                      : ""}
                </p>
              </div>
              {/* Input text */}

              <div className="relative">
                <input
                  type="text"
                  name="phone"
                  placeholder={t("updateUser.phone")}
                  className="peer rounded-md border-2 border-neutral-400 bg-transparent px-6 py-2 outline-none transition-all duration-300 focus:border-neutral-600 focus:outline-none dark:border-neutral-100 dark:text-neutral-100"
                  {...register("phone", {
                    required: true,
                    pattern: /^\+?[0-9]+(?:[\s-][0-9]+)*$/,
                  })}
                />
                <figure className="absolute left-3 top-5 -translate-x-1/2 -translate-y-1/2 text-neutral-500 transition-all duration-300 peer-focus:text-neutral-700 [&:lang(ar)]:left-auto [&:lang(ar)]:right-0">
                  <FaPhone />
                </figure>
                <p className="mx-3 w-full text-wrap text-xs font-bold text-red-700">
                  {errors.phone?.type === "required"
                    ? "This field is required"
                    : errors.phone?.type === "pattern"
                      ? "Wrong phone number format"
                      : ""}
                </p>
              </div>
            </div>
            {/* Form radio Button */}
            <div className="flex flex-col justify-center px-2">
              {/* radio Button */}
              <label
                htmlFor="userOption"
                className=" group cursor-pointer select-none text-transparent transition-all duration-300 "
              >
                <input
                  type="radio"
                  name="role"
                  value="user"
                  id="userOption"
                  className="peer h-0 w-0"
                  {...register("role")}
                />
                <div className="[&:lang(ar)]:pr-auto group flex items-center gap-4 rounded-md border-2 border-neutral-600 px-4   py-1 group-checked:bg-red-500 peer-checked:border-blue-700 peer-checked:text-blue-700 dark:border-neutral-200 [&:lang(ar)]:pl-12">
                  <figure className="text-3xl text-neutral-500 dark:text-neutral-200">
                    <GrUserAdmin />
                  </figure>

                  <div>
                    <p className="font-bold text-neutral-900 dark:text-neutral-50">
                      {t("updateUser.role.user")}
                    </p>
                    <p className="text-xs font-bold text-neutral-600 dark:text-neutral-400">
                      {t("updateUser.role.userDesc")}
                    </p>
                  </div>
                  <FaCheckCircle className="" />
                </div>
              </label>
              {/* radio Button */}
              <label
                htmlFor="adminOption"
                className=" group cursor-pointer select-none text-transparent transition-all duration-300"
              >
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  id="adminOption"
                  className="peer h-0 w-0"
                  {...register("role")}
                />
                <div className="[&:lang(ar)]:pr-auto group flex items-center gap-4 rounded-md border-2 border-neutral-600 px-4   py-1 group-checked:bg-red-500 peer-checked:border-blue-700 peer-checked:text-blue-700 [&:lang(ar)]:pl-12">
                  <figure className="text-3xl text-neutral-500  dark:text-neutral-200">
                    <CiUser />
                  </figure>

                  <div>
                    <p className="font-bold text-neutral-900  dark:text-neutral-50">
                      {t("updateUser.role.admin")}
                    </p>
                    <p className="text-xs font-bold text-neutral-600 dark:text-neutral-400">
                      {t("updateUser.role.adminDesc")}
                    </p>
                  </div>
                  <FaCheckCircle className="" />
                </div>
              </label>
            </div>
          </div>
          <div className="fixed bottom-0 right-0 flex w-full justify-end gap-2 bg-neutral-200 px-4 py-2 drop-shadow-md dark:bg-tertiary">
            <button
              className="rounded bg-red-700 px-2 py-2 text-neutral-100 transition-all duration-300 hover:bg-red-800 "
              onClick={(e) => {
                e.preventDefault();
                close();
              }}
            >
              {t("updateUser.cancelBtn")}
            </button>
            <button className="rounded bg-purple-700 px-2 py-2 text-neutral-100 transition-all duration-300 hover:bg-purple-800 ">
              {t("updateUser.updateBtn")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserForm;
