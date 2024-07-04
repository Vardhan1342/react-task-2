import React from "react";
import { TbMoodEmpty } from "react-icons/tb";
const EmptyProfile = () => {
  return (
    <div className="min-w-md mx-auto mt-20">
      <TbMoodEmpty size="200" className="opacity-20" />

      <p className="text-lg text-center text-slate-600">
        Select a profile to see details
      </p>
    </div>
  );
};

export default EmptyProfile;
