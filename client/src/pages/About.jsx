import React from "react";
import { JobImg } from "../assets";

const About = () => {
  return (
    <div className='container mx-auto flex flex-col gap-8 2xl:gap-14 py-6 '>
      <div className='w-full flex flex-col-reverse md:flex-row gap-10 items-center p-5'>
        <div className='w-full md:2/3 2xl:w-2/4'>
          <h1 className='text-3xl text-black-600 font-bold mb-5'>About Us</h1>
          <p className='text-justify leading-10'>
            Welcome to Jobfi.ca – the premier job search platform dedicated to connecting talented individuals with their ideal career opportunities. Our platform is designed to make job hunting easier, more efficient, and tailored to your unique career aspirations.

            Our mission is to bridge the gap between job seekers and employers. At Jobfi.ca, we believe that finding a job should be simple, efficient, and tailored to your career goals. Whether you’re looking for a full-time position, part-time work, or freelance gigs, we’ve got you covered. Our easy-to-use platform helps you filter opportunities based on your preferences, making the job search process smoother and more intuitive.
          </p>
        </div>
        <img src={JobImg} alt='About' className='w-auto h-[350px] ' />
      </div>

      <div className='leading-10 px-5 text-justify -mt-14'> {/* Підняв абзац ближче до першого */}
        <p>
          For job seekers, we offer a comprehensive platform where you can explore a wide range of job opportunities tailored to your skills and preferences. Whether you're seeking a full-time role, a part-time position, or freelance work, our user-friendly website helps you find positions that align with your career aspirations. We focus on providing relevant and up-to-date job listings to help you stay ahead in your job search.

          Employers also benefit from using Jobfi.ca. Our platform is designed to streamline the hiring process, allowing you to post job openings, manage applications, and connect with qualified candidates efficiently. We aim to simplify recruitment, making it easier for you to find the right talent for your organization.

          

          Thank you for choosing Jobfi.ca. We’re excited to assist you in finding your next job or the perfect candidate for your company.
        </p>
      </div>
    </div>
  );
};

export default About;



