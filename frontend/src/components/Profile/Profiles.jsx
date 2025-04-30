
import useProfile from "../../hooks/useProfile";
import EditSection from "./EditSection";
import { Backendurl } from "../../BckendUrl";

export default function Profiles() {
  const {name, email, mobile} = useProfile()


  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Profile</h1>
          <p className="text-sm">
            View and update your profile information, including your name,
            email, and phone number. You can also update your billing address,
            or change your password.
          </p>
        </div>
        <EditSection name={name} title={"Name"} type={'name'}  placeholder={"Name"} />
        <EditSection name={email} title={"email"} type={"email"}  placeholder={"email"} />
        <EditSection name={mobile} title={"Mobile"} type={"mobile"}  placeholder={"number"} />
        <EditSection name={""} title={"Password"} type={"password"} placeholder={"Old Password"} placeholder2={"New Password"} placeholder3={"Confirm password"}  />
      </div>
    </>
  );
}
