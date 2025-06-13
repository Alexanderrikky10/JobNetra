import React from "react";

const TeamCard = (props) => {
  const { name, image, role, description } = props;
  return (
    <div className="flex flex-col gap-2 items-center bg-white px-4 py-10 rounded-3xl">
      <div className="  rounded-full overflow-hidden w-8/12">
        <img src={image} className="h-full w-full object-cover" alt="" />
      </div>
      <p className="text-center text-2xl font-semibold">{name}</p>
      <p className="text-center text-[var(--secondary-color)] font-semibold">
        {role}
      </p>
      <p className="text-center text-gray-500">{description}</p>
    </div>
  );
};

export default TeamCard;
