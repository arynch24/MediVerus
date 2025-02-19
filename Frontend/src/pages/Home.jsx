import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
"use client";
import React from "react";
import { SparklesCore } from "../components/ui/sparkles";
import Button from "../components/ui/Button";

function Home() {
  return (
    // <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-center p-10'>
    //   <h1 className='text-4xl font-bold text-blue-600'>Misinformation Detection</h1>
    //   <p className='mt-4 text-lg'>Verify information authenticity with AI.</p>
    //   <Link to='/analyze' className='mt-5 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg'>Get Started</Link>
    // </motion.div>
    <div className='h-screen bg-black'>

      <div
        className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h1
          className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
          MediVerus.ai
        </h1>
        <p className='mt-4 text-lg text-gray-100 mb-5'>Verify information authenticity with AI.</p>

        <div className="w-[40rem] h-40 relative">
          {/* Gradients */}
          <div
            className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div
            className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div
            className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div
            className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF" />

          {/* Radial Gradient to prevent sharp edges */}
          <div
            className="absolute flex justify-center inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]">
          </div>
          <Link
            to='/analyze'
            className='absolute ml-65 -mt-25 '>
            <Button className={``} />
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Home;