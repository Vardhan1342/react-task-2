import Image from "next/image";

const Profile = ({ selectedUser }) => {
  return (
    <div className=" mx-auto w-fit mt-8 rounded-lg shadow-xl   bg-white">
      <div className="flex flex-col space-y-4 items-center p-8 pb-1">
        <Image
          width="150"
          height="40"
          className=" rounded-full object-contain border-2 border-black aspect-square"
          src={selectedUser.avatar}
          alt="profile"
        />
        <h2 className="text-2xl font-bold">{selectedUser.profile.username}</h2>
        <Details label="FullName">
          {selectedUser.profile.firstName} {" " + selectedUser.profile.lastName}
        </Details>
        <Details label="Job Title"> {selectedUser.jobTitle}</Details>
        <Details label="Email"> {selectedUser.profile.email}</Details>
        <Details label="Bio"> {selectedUser.Bio}</Details>
        <Details label="Joined On">
          {" "}
          {selectedUser.createdAt.substring(0, 10)}
        </Details>
      </div>
    </div>
  );
};

export default Profile;

function Details({ children, label }) {
  return (
    <p className="text-slate-800 tracking-wide ">
      <span className="font-semibold text-black text-lg font-serif tracking-normal mr-1">
        {label}:{" "}
      </span>{" "}
      {children}
    </p>
  );
}
