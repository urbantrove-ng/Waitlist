import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export default function SuccessPage() {
  return (
    <div className="lg:mt-0 px-[10rem] lg:w-[20rem] lg:px-0 grid justify-center font-inter items-center text-center">
      <div>
        <IoCheckmarkCircleOutline className="text-[10rem] flex m-auto font-[100] text-[#808000]" />
      </div>
      <div className="lg:mt-0">
        <h1 className="uppercase  text-[1.5rem] font-[600] text-[#40513B]">
          Well done 👍🏼
        </h1>
      </div>
      <div className="lg:mt-0">
        <p className="text-[#919d8d] text-[1.3rem] font-[600] mb-[0.5rem]">
          Thank you for signing up for Urban Trove's Waitlist!
        </p>
        <p className="text-[#919d8d] text-[1.3rem] font-[600]">
          You will be contacted once you have been added to our waitlist.
        </p>
      </div>
    </div>
  );
}
