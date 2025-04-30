import React from "react";
import { Link } from "react-router";

export default function StarterPage() {
  return (
    <div className="h-[80vh] bg-slate-200 my-10">
      <div className="flex flex-col items-center justify-center h-full gap-8 px-10 mx-auto ">
        <h1 className="text-6xl text-black">Explore more.</h1>
        <Link to={'/product'} className="p-3 px-10 border border-slate-50">More</Link>
      </div>
    </div>
  );
}
