"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import Profile from "./Profile";
import EmptyProfile from "./EmptyProfile";
import ClipLoader from "react-spinners/ClipLoader";
import { RxCross1 } from "react-icons/rx";

const Sidebar = () => {
  let arr = Array.from("0".repeat(10));
  const [profiles, setProfiles] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoadingTwo] = useState(true);
  const [query, setQuery] = useState("");

  const filteredProfiles = profiles.filter((profile) =>
    profile.profile.username.toLowerCase().includes(query.toLowerCase())
  );

  const changeUser = (currentUser) => {
    setLoading(true);
    setSelectedUser(currentUser);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const clearSelectedUser = () => {
    setSelectedUser(null);
  };

  const fetchProfiles = async () => {
    try {
      const res = await fetch(
        "https://602e7c2c4410730017c50b9d.mockapi.io/users"
      );
      const users = await res.json();
      setProfiles(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoadingTwo(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  if (loading2) {
    return (
      <div className="h-[100vh] bg-gray-200 p-4 flex flex-col gap-y-6">
        {arr.map((_, index) => (
          <Loader key={index} />
        ))}
      </div>
    );
  }

  return (
    <section className="bg-gray-200">
      <div className="md:grid md:grid-cols-3">
        <div className="md:h-[100vh] md:overflow-y-scroll md:touch-pan-y relative">
          <div className="md:fixed w-full md:w-[29.5rem] backdrop-blur-sm p-2 ">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              className="rounded-full md:w-72 p-2 md:ml-6  bg-gray-100 hover:bg-white focus:outline-none border-2 border-gray-500 w-full"
              placeholder="Search.."
            />
          </div>
          <div className="flex flex-col md:mt-10 p-4 mb-14">
            {filteredProfiles.map((item, index) => (
              <div
                key={index}
                onClick={() => changeUser(item)}
                className="flex flex-col space-y-2 hover:bg-gray-100 px-4 py-2 rounded-md cursor-pointer"
              >
                <div className="flex gap-x-4">
                  <div>
                    <Image
                      width="60"
                      height="40"
                      className="rounded-full object-contain border-2 border-black"
                      src={
                        item.avatar ||
                        "https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
                      }
                      alt="profile"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <h3 className="text-lg">{item.profile.username}</h3>
                    <p className="text-xs text-gray-500">{item.jobTitle}</p>
                  </div>
                </div>
                <div className="md:hidden">
                  {selectedUser &&
                    selectedUser.profile.username === item.profile.username && (
                      <div className="flex flex-col w-full">
                        <Profile className="" selectedUser={selectedUser} />
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:flex h-[100vh] overflow-y-hidden bg-gray-100 col-span-2 p-4">
          {loading ? (
            <ClipLoader
              loading={loading}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : selectedUser ? (
            <div className="flex flex-col w-full">
              <button
                onClick={clearSelectedUser}
                className="border-[1.5px] p-2 w-fit border-gray-300 rounded-md hover:scale-105"
              >
                <RxCross1 size="20" />
              </button>
              <Profile selectedUser={selectedUser} />
            </div>
          ) : (
            <EmptyProfile />
          )}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
