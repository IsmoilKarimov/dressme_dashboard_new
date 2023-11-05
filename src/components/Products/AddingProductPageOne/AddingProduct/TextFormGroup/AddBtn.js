import { useState } from "react";
import { Link } from "react-router-dom";
import { CopyIcon } from "../../../../../assets/icons";
import { BiCheckDouble } from "react-icons/bi"

export default function AddBtn() {
  const [pressed, setPressed] = useState(false);

  const onClick = () => {
    setPressed(true);

    setTimeout(() => {
      setPressed(false);
    }, 1000);
  };

  return (
    <Link
      className="w-[22px]  h-[22px] rounded-[4px]  active:translate-y-[2px] flex items-center justify-end"
      onClick={onClick}
    >
      {pressed ? (
        <BiCheckDouble size={30} />
      ) : (
        <CopyIcon />
      )}
    </Link>
  );
}
