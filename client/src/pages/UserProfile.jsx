import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { HiLocationMarker } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { NoProfile } from "../assets";
import { CustomButton, Loading, TextInput } from "../components";
import { Login } from "../redux/userSlice";
import { apiRequest, handleFileUpload } from "../utils";

const UserForm = ({ open, setOpen }) => {
  const { user } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user },
  });
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState("");
  const [uploadCv, setUploadCv] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const uri = profileImage && (await handleFileUpload(profileImage));
      const newData = uri ? { ...data, profileUrl: uri } : data;

      const res = await apiRequest({
        url: "/users/update-user",
        token: user?.token,
        data: newData,
        method: "PUT",
      });

      if (res) {
        const newUserData = { token: res?.token, ...res?.user };
        dispatch(Login(newUserData));
        localStorage.setItem("userInfo", JSON.stringify(res));

        setIsSubmitting(false);
        setOpen(false); // Закриваємо модальне вікно після успішного оновлення
        document.body.style.overflow = "auto"; // Включаємо скролінг знову
      }
    } catch (error) {
      setIsSubmitting(false);
      console.log("Error updating profile:", error);
      document.body.style.overflow = "auto"; // Включаємо скролінг знову
    }
  };

  const closeModal = () => {
    setOpen(false);
    document.body.style.overflow = "auto"; // Включаємо скролінг знову
  };

  return (
    <>
      <Transition
        appear
        show={open ?? false}
        as={Fragment}
        beforeEnter={() => (document.body.style.overflow = "hidden")}
        afterLeave={() => (document.body.style.overflow = "auto")}
      >
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg max-h-auto  transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all z-50">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    Edit Profile
                  </Dialog.Title>
                  <form
                    className="w-full mt-2 flex flex-col gap-5"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="w-full flex gap-2">
                      <div className="w-1/2">
                        <TextInput
                          name="firstName"
                          label="First Name"
                          placeholder="James"
                          type="text"
                          register={register("firstName", {
                            required: "First Name is required",
                          })}
                          error={
                            errors.firstName ? errors.firstName?.message : ""
                          }
                        />
                      </div>
                      <div className="w-1/2">
                        <TextInput
                          name="lastName"
                          label="Last Name"
                          placeholder="Wagonner"
                          type="text"
                          register={register("lastName", {
                            required: "Last Name is required",
                          })}
                          error={
                            errors.lastName ? errors.lastName?.message : ""
                          }
                        />
                      </div>
                    </div>

                    <div className="w-full flex gap-2">
                      <div className="w-1/2">
                        <TextInput
                          name="contact"
                          label="Contact"
                          placeholder="Phone Number"
                          type="text"
                          register={register("contact", {
                            required: "Contact is required!",
                          })}
                          error={errors.contact ? errors.contact?.message : ""}
                        />
                      </div>

                      <div className="w-1/2">
                        <TextInput
                          name="location"
                          label="Location"
                          placeholder="Location"
                          type="text"
                          register={register("location", {
                            required: "Location is required",
                          })}
                          error={
                            errors.location ? errors.location?.message : ""
                          }
                        />
                      </div>
                    </div>

                    <TextInput
                      name="jobTitle"
                      label="Job Title"
                      placeholder="Software Engineer"
                      type="text"
                      register={register("jobTitle", {
                        required: "Job Title is required",
                      })}
                      error={errors.jobTitle ? errors.jobTitle?.message : ""}
                    />

                    <div className="w-full flex gap-2 text-sm">
                      <div className="w-1/2">
                        <label className="text-gray-600 text-sm mb-1">
                          Profile Picture
                        </label>
                        <input
                          type="file"
                          onChange={(e) => setProfileImage(e.target.files[0])}
                        />
                      </div>

                      <div className="w-1/2">
                        <label className="text-gray-600 text-sm mb-1">
                          Resume
                        </label>
                        <input
                          type="file"
                          onChange={(e) => setUploadCv(e.target.files[0])}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="text-gray-600 text-sm mb-1">
                        About
                      </label>
                      <textarea
                        className="rounded border border-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-base px-4 py-2 resize-none"
                        rows={4}
                        cols={6}
                        {...register("about", {
                          required:
                            "Write a little bit about yourself and your projects",
                        })}
                        aria-invalid={errors.about ? "true" : "false"}
                      ></textarea>
                      {errors.about && (
                        <span
                          role="alert"
                          className="text-xs text-red-500 mt-0.5"
                        >
                          {errors.about?.message}
                        </span>
                      )}
                    </div>

                    <div className="mt-4">
                      {isSubmitting ? (
                        <Loading />
                      ) : (
                        <CustomButton
                        type="submit"
                        containerStyles="inline-flex justify-center rounded-md border border-transparent bg-black px-8 py-2 text-sm font-medium text-white hover:bg-black hover:text-white focus:outline-none"
                        title={"Submit"}
                      />
        
                      )}
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const userInfo = user;

  return (
    <div className="container mx-auto flex items-center justify-center py-10">
      <div className="w-full md:w-2/3 2xl:w-2/4 bg-white shadow-lg p-10 pb-20 rounded-lg">
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <img
            src={userInfo?.profileUrl ?? NoProfile}
            className="w-40 h-40 rounded-full object-cover"
            alt="Profile"
          />
          <h1 className="text-2xl font-semibold">
            {userInfo?.firstName + " " + userInfo?.lastName ?? "No Name"}
          </h1>
          <p className="text-slate-500 text-lg">{userInfo?.jobTitle ?? "No Title"}</p>

          <div className="flex gap-4 items-center justify-center text-slate-600 text-sm">
            <p className="flex items-center gap-1">
              <AiOutlineMail /> {userInfo?.email ?? "No Email"}
            </p>
            <p className="flex items-center gap-1">
              <FiPhoneCall /> {userInfo?.contact ?? "No Contact"}
            </p>
            <p className="flex items-center gap-1">
              <HiLocationMarker /> {userInfo?.location ?? "No Location"}
            </p>
          </div>

          <p className="text-center text-sm">{userInfo?.about ?? "No About"}</p>
          <button
            onClick={() => setOpen(true)}
            className="bg-black text-white px-8 py-2 rounded-full mt-8 hover:bg-black hover:text-white"
          >
            Edit Profile
          </button>
          <UserForm open={open} setOpen={setOpen} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

