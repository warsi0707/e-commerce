import { memo } from "react";
import { Link } from "react-router";

 function Navlink({link, title}) {
  return (
    <Link to={`${link}`} className="transition-all duration-300 hover:text-gray-600">{title}</Link>
  )
}
export default memo(Navlink)