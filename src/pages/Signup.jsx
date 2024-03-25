import { ImPacman } from "react-icons/im";

import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import signupImg from "../../public/signup.svg";

import { useSignup } from "../features/users/useSignup";
function Signup() {
  const [t, i18n] = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { signup, isPending } = useSignup();

  function onSubmit(data) {
    signup(data);
  }

  return (
    <div className=" h-full w-full self-start overflow-y-scroll p-4 md:grid md:grid-cols-2">
      <figure className="hidden h-full w-full items-center justify-center rounded-lg bg-purple-600 md:flex">
        <img src={signupImg} className="h-4/5" alt="" />
      </figure>
      <div className="md:p-4">
        <div className="mb-10 flex gap-2 text-purple-900 dark:text-purple-700">
          <h1 className="text-6xl  font-bold">{t("login.appname")}</h1>
          <ImPacman className=" text-6xl" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col flex-wrap gap-4 md:flex-row">
            <div className="flex flex-col md:max-w-60">
              <label
                htmlFor="firstName"
                className="text-xs font-semibold tracking-wide text-neutral-600"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="rounded-lg border-2 border-purple-300 px-4 py-2 outline-none transition-all duration-300 focus:border-purple-500 focus:outline-none"
                {...register("first_name", { required: true, minLength: 3 })}
                aria-invalid={errors.first_name ? "true" : "false"}
              />
              <p className="text-xs font-semibold text-red-800">
                {errors.first_name?.type === "required"
                  ? "This field is req"
                  : errors.first_name?.type === "minLength"
                    ? "The minimum first name length is 3 characters"
                    : ""}
              </p>
            </div>
            <div className="flex flex-col md:max-w-60">
              <label
                htmlFor="lastName"
                className="text-xs font-semibold tracking-wide text-neutral-600"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="rounded-lg border-2 border-purple-300 px-4 py-2 outline-none transition-all duration-300 focus:border-purple-500 focus:outline-none"
                {...register("last_name", { required: true, minLength: 3 })}
              />
              <p className="text-xs font-semibold text-red-800">
                {errors.last_name?.type === "required"
                  ? "This field is req"
                  : errors.last_name?.type === "minLength"
                    ? "The minimum last name length is 3 characters"
                    : ""}
              </p>
            </div>
            <div className="flex flex-col md:max-w-60">
              <label
                htmlFor="email"
                className="text-xs font-semibold tracking-wide text-neutral-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="rounded-lg border-2 border-purple-300 px-4 py-2 outline-none transition-all duration-300 focus:border-purple-500 focus:outline-none"
                {...register("email", {
                  pattern: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                  required: true,
                })}
              />
              <p className="text-xs font-semibold text-red-800">
                {errors.email?.type === "required"
                  ? "This field is req"
                  : errors.email?.type === "pattern"
                    ? "Wrong email format ex@example.example"
                    : ""}
              </p>
            </div>
          </div>
          <div className="flex flex-col flex-wrap gap-4 md:flex-row">
            <div className="flex flex-col md:max-w-60">
              <label
                htmlFor="password"
                className="text-xs font-semibold tracking-wide text-neutral-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="rounded-lg border-2 border-purple-300 px-4 py-2 outline-none transition-all duration-300 focus:border-purple-500 focus:outline-none"
                {...register("password")}
              />
              <p></p>
            </div>
            <div className="flex flex-col md:max-w-60">
              <label
                htmlFor="passwordConfirm"
                className="text-xs font-semibold tracking-wide text-neutral-600"
              >
                Password Confirm
              </label>
              <input
                type="password"
                id="passwordConfirm"
                className="rounded-lg border-2 border-purple-300 px-4 py-2 outline-none transition-all duration-300 focus:border-purple-500 focus:outline-none"
                {...register("passwordConfirm", {
                  required: true,
                  validate: (val) => {
                    if (val !== watch("password")) {
                      return "Passwords doesn't match";
                    }
                  },
                })}
              />
              <p className="text-xs font-semibold text-red-800">
                {errors.passwordConfirm?.message}
              </p>
            </div>
            <div className="flex flex-col md:max-w-60">
              <label
                htmlFor="profilePic"
                className="text-xs font-semibold tracking-wide text-neutral-600"
              >
                Profile Picture
              </label>
              <input
                type="file"
                id="profilePic"
                className="rounded-lg border-2  px-4 py-2 outline-none transition-all duration-300  focus:outline-none"
                {...register("img_url", { required: true })}
              />
              <p></p>
            </div>
          </div>
          <button className="mx-auto w-full max-w-48 rounded-md bg-purple-700 py-2 text-neutral-200 transition-all duration-300 hover:bg-purple-600 md:w-48">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
