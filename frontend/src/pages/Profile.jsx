import { useEffect, useState } from "react";
import "../styles/Profile.css";

const Profile = () => {
  const [details, setDetails] = useState({});
  const [changingAddress, setChangingAddress] = useState(false);
  const [changingMediaHandles, setChangingMediaHandles] = useState(false);

  // Social Media Links
  const [mediaHandles, setMediaHandles] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
  });

  const [address, setAddress] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [newHobby, setNewHobby] = useState("");

  // Fetch user details from backend
  useEffect(() => {
    async function getUser() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await fetch(`http://localhost:5000/user/${user._id}`);
        if (!response.ok) throw new Error("Failed to fetch user details");

        const userDetails = await response.json();
        setDetails(userDetails);
        setAddress(userDetails.address || "");
        setMediaHandles(
          userDetails.mediaHandles || {
            facebook: "",
            instagram: "",
            twitter: "",
          }
        );
        setHobbies(userDetails.hobbies || []);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }

    getUser();
  }, []);

  // Update user details on backend
  const updateUser = async (updatedData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user")); 
      const response = await fetch(`http://localhost:5000/user/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        alert("Profile updated successfully!");
        setDetails(updatedUser);
      } else {
        throw new Error("Failed to update user details");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Handlers for profile updates
  const handleAddressChange = () => {
    updateUser({ ...details, address });
    setChangingAddress(false);
  };

  const handleMediaHandlesChange = () => {
    updateUser({ ...details, mediaHandles });
    setChangingMediaHandles(false);
  };

  const handleAddHobby = () => {
    const updatedHobbies = [...hobbies, newHobby];
    setHobbies(updatedHobbies);
    setNewHobby("");
    updateUser({ ...details, hobbies: updatedHobbies });
  };

  const handleDeleteHobby = (hobbyToDelete) => {
    const updatedHobbies = hobbies.filter((hobby) => hobby !== hobbyToDelete);
    setHobbies(updatedHobbies);
    updateUser({ ...details, hobbies: updatedHobbies });
  };

  return (
    <div>
      <div className="profile-container">
        <div className="profile-top-container">
          <div className="profile-top-left-container">
            <div className="profile-img w-32 h-32">
              <img
                src="src\assets\images\logo.jpg"
                className="rounded-full"
              ></img>
            </div>
            <div className="user-address">
              {changingAddress ? (
                <>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <i
                    class="fa-solid fa-floppy-disk"
                    onClick={handleAddressChange}
                  ></i>
                </>
              ) : (
                <>
                  <div className="user-address-heading">{address}</div>
                  <i
                    class="fa-solid fa-pen-to-square"
                    onClick={() => setChangingAddress(true)}
                  ></i>
                </>
              )}
            </div>
          </div>
          <div className="profile-top-right-container">
            <div className="profile-top-right-container-elements-main">
              User Name
            </div>
            <div className="profile-top-right-container-elements-main">
              Gender
            </div>
            <div className="profile-top-right-container-elements-secondary">
              {details.name}
            </div>
            <div className="profile-top-right-container-elements-secondary">
              {details.gender}
            </div>
            <div className="profile-top-right-container-elements-main">
              Phone
            </div>
            <div className="profile-top-right-container-elements-main">
              Email
            </div>
            <div className="profile-top-right-container-elements-secondary">
              {details.phoneNumber}
            </div>
            <div className="profile-top-right-container-elements-secondary">
              {details.email}
            </div>
          </div>
        </div>

        <div className="profile-bottom-container">
          <div className="profile-bottom-left-container">
            <div className="title">Media Handles </div>
            {changingMediaHandles ? (
              <>
                <div className="tiles">
                  <p>Facebook: </p>
                  <input
                    type="text"
                    value={mediaHandles.facebook}
                    onChange={(e) =>
                      setMediaHandles({
                        ...mediaHandles,
                        facebook: e.target.value,
                      })
                    }
                    placeholder="Facebook"
                  />
                </div>
                <div className="tiles">
                  <p>Instagram: </p>
                  <input
                    type="text"
                    value={mediaHandles.instagram}
                    onChange={(e) =>
                      setMediaHandles({
                        ...mediaHandles,
                        instagram: e.target.value,
                      })
                    }
                    placeholder="Instagram"
                  />
                </div>
                <div className="tiles">
                  <p>Twitter: </p>
                  <input
                    type="text"
                    value={mediaHandles.twitter}
                    onChange={(e) =>
                      setMediaHandles({
                        ...mediaHandles,
                        twitter: e.target.value,
                      })
                    }
                    placeholder="Twitter"
                  />
                </div>
                <i
                  class="fa-solid fa-floppy-disk"
                  onClick={handleMediaHandlesChange}
                ></i>
              </>
            ) : (
              <>
                <div className="tiles">
                  <p>Facebook: </p>
                  <p>{mediaHandles.facebook}</p>
                </div>
                <div className="tiles">
                  <p>Instagram: </p>
                  <p>{mediaHandles.instagram}</p>
                </div>
                <div className="tiles">
                  <p>Twitter: </p>
                  <p>{mediaHandles.twitter}</p>
                </div>
                <i
                  class="fa-solid fa-pen-to-square"
                  onClick={() => setChangingMediaHandles(true)}
                ></i>
              </>
            )}
          </div>

          <div className="profile-bottom-right-container">
            <div className="title">Interests</div>
            <div>
              <input
                type="text"
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
                placeholder="Add a hobby"
              />
              <i class="fa-solid fa-plus" onClick={handleAddHobby}></i>
              {hobbies.map((hobby, ind) => (
                <div key={ind}>
                  <p className="interests">{hobby}</p>
                  <i
                    class="fa-solid fa-trash"
                    onClick={() => handleDeleteHobby(hobby)}
                  ></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

