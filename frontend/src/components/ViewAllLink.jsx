import React from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { Link } from "react-router";

export default function ViewAllLink() {
  return (
    <Link to={"/"} className="flex gap-1 text-blue-400">
      <p>View all</p>{" "}
      <p className="mt-1">
        <FaLocationArrow />
      </p>
    </Link>
  );
}
