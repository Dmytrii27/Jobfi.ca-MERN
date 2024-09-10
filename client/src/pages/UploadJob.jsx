import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { CustomButton, JobCard, Loading } from "../components";
import { apiRequest } from "../utils";

const UploadJob = () => {
  const { user } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const [errMsg, setErrMsg] = useState("");
  const [jobType, setJobType] = useState("Full-Time");
  const [isLoading, setIsLoading] = useState(false);
  const [recentPost, setRecentPost] = useState([]);

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    setErrMsg(null);

    const newData = { ...data, jobType: jobType };
    try {
      const res = await apiRequest({
        url: "/jobs/upload-job",
        token: user?.token,
        data: newData,
        method: "POST",
      });

      if (res.status === "failed") {
        setErrMsg(res.message);
      } else {
        setErrMsg(res.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getRecentPost = async () => {
    try {
      const id = user?._id;

      const res = await apiRequest({
        url: "/companies/get-company/" + id,
        method: "GET",
      });

      setRecentPost(res?.data?.jobPosts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecentPost();
  }, []);

  return (
    <div className='container mx-auto flex flex-col md:flex-row gap-8 2xl:gap-14 bg-[#f7fdfd] px-5'>
      <div className='w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md'>
        <div>
          <p className='text-black font-semibold text-2xl'>Job Post</p>

          <form
            className='w-full mt-2 flex flex-col gap-8'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='flex flex-col'>
              <label className='text-black text-sm mb-1'>Job Title</label>
              <input
                name='jobTitle'
                placeholder='eg. Software Engineer'
                type='text'
                {...register("jobTitle", {
                  required: "Job Title is required",
                })}
                className="border-2 border-black text-black rounded p-2"
              />
              {errors.jobTitle && (
                <span className='text-xs text-red-500'>
                  {errors.jobTitle?.message}
                </span>
              )}
            </div>

            <div className='w-full flex gap-4 items-center'>
              <div className='w-1/2 mt-2'>
                <label className='text-black text-sm mb-1'>Job Type</label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="border-2 border-black text-black rounded p-2 w-full"
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  {/* Додайте інші варіанти, якщо потрібно */}
                </select>
              </div>

              <div className='w-1/2 mt-2'>
                <div className='flex flex-col'>
                  <label className='text-black text-sm mb-1'>Salary (CAD)</label>
                  <input
                    name='salary'
                    placeholder='eg. 1500'
                    type='number'
                    {...register("salary", {
                      required: "Salary is required",
                    })}
                    className="border-2 border-black text-black rounded p-2"
                  />
                  {errors.salary && (
                    <span className='text-xs text-red-500'>
                      {errors.salary?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className='w-full flex gap-4'>
              <div className='w-1/2'>
                <div className='flex flex-col'>
                  <label className='text-black text-sm mb-1'>No. of Vacancies</label>
                  <input
                    name='vacancies'
                    placeholder='vacancies'
                    type='number'
                    {...register("vacancies", {
                      required: "Vacancies is required!",
                    })}
                    className="border-2 border-black text-black rounded p-2"
                  />
                  {errors.vacancies && (
                    <span className='text-xs text-red-500'>
                      {errors.vacancies?.message}
                    </span>
                  )}
                </div>
              </div>

              <div className='w-1/2'>
                <div className='flex flex-col'>
                  <label className='text-black text-sm mb-1'>Years of Experience</label>
                  <input
                    name='experience'
                    placeholder='experience'
                    type='number'
                    {...register("experience", {
                      required: "Experience is required",
                    })}
                    className="border-2 border-black text-black rounded p-2"
                  />
                  {errors.experience && (
                    <span className='text-xs text-red-500'>
                      {errors.experience?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className='flex flex-col'>
              <label className='text-black text-sm mb-1'>Job Location</label>
              <input
                name='location'
                placeholder='eg. New York'
                type='text'
                {...register("location", {
                  required: "Job Location is required",
                })}
                className="border-2 border-black text-black rounded p-2"
              />
              {errors.location && (
                <span className='text-xs text-red-500'>
                  {errors.location?.message}
                </span>
              )}
            </div>

            <div className='flex flex-col'>
              <label className='text-black text-sm mb-1'>Job Description</label>
              <textarea
                className='border-2 border-black text-black rounded p-2 resize-none'
                rows={4}
                {...register("desc", {
                  required: "Job Description is required!",
                })}
              ></textarea>
              {errors.desc && (
                <span className='text-xs text-red-500'>
                  {errors.desc?.message}
                </span>
              )}
            </div>

            <div className='flex flex-col'>
              <label className='text-black text-sm mb-1'>Requirements</label>
              <textarea
                className='border-2 border-black text-black rounded p-2 resize-none'
                rows={4}
                {...register("requirements")}
              ></textarea>
            </div>

            {errMsg && (
              <span className='text-sm text-red-500 mt-0.5'>
                {errMsg}
              </span>
            )}

            <div className='mt-2'>
              {isLoading ? (
                <Loading />
              ) : (
                <CustomButton
                  type='submit'
                  containerStyles='inline-flex justify-center rounded-md border-2 border-black bg-black px-8 py-2 text-sm font-medium text-white hover:bg-black focus:outline-none'
                  title='Submit'
                />
              )}
            </div>
          </form>
        </div>
      </div>

      <div className='w-full md:w-1/3 2xl:2/4 p-5 mt-20 md:mt-0'>
        <p className='text-black font-semibold'>Recent Job Post</p>

        <div className='w-full flex flex-wrap gap-6'>
          {recentPost.slice(0, 4).map((job, index) => {
            const data = {
              name: user?.name,
              email: user?.email,
              logo: user?.profileUrl,
              ...job,
            };
            return <JobCard job={data} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default UploadJob;

