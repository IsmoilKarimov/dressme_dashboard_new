import React from "react";
import { NavbarUserIcon } from "../../assets/icons";

export default function NavbarForSetting() {
  return (
    <div className="w-full h-[80px] border border-lightBorderColor flex items-center justify-end border-l-0 bg-lightBgColor px-[40px]">
      <button className="w-[56px] h-[56px] rounded-full border border-lightBorderColor bg-white flex items-center justify-center cursor-pointer">
        <NavbarUserIcon colors={""} />
      </button>
    </div>
  );
}
