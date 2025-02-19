"use client";
import React from "react";

export default function Button({ className }) {
    return (
        <div className={`${className}`}>
            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-0 animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-6 py-2 text-sm font-medium text-white backdrop-blur-3xl">
                    Get Started
                </span>
            </button>
        </div>


    )
};