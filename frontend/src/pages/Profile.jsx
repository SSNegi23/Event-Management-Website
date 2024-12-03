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

// import { useEffect, useState } from "react";
// import "../styles/Profile.css";

// const Profile = () => {
//   const [details, setDetails] = useState([]);
//   const [changingaddress, setchangingaddress] = useState(false);
//   const [changemediahandles, setchangemediahandles] = useState(false);
//   const [Facebooklink, setFacebooklink] = useState("Link your Facebook");
//   const [Instagramlink, setInstagramlink] = useState("Link your Instagram");
//   const [Twitterlink, setTwitterlink] = useState("Link your Twitter");
//   const [Hobbies, setHobbies] = useState(["cricket", "hockey"]);
//   const [newHobby, setnewHobby] = useState("");
//   const [address, setaddress] = useState("");

//   useEffect(() => {
//     async function getUser() {
//       let user = localStorage.getItem("user");
//       user = JSON.parse(user);
//       console.log("user: ", user);
//       // console.log("user id: ", user._id);
//       try {
//         const response = await fetch(
//           `http://localhost:5000/user/${user._id}`,
//           {
//             method: "GET",
//           }
//         );
//         const userDetails = await response.json();
//         setDetails(userDetails);
//         setaddress(userDetails.address);
//         console.log(userDetails);
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     getUser();
//   }, []);

//   console.log("address: ", address);

//   const updateUser = async () => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     const updatedData = {
//       address,
//       mediaHandles: {
//         facebook: Facebooklink,
//         instagram: Instagramlink,
//         twitter: Twitterlink,
//       },
//       interests: Hobbies,
//     };

//     try {
//       const response = await fetch(`http://localhost:5000/user/${user._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedData),
//       });

//       if (response.ok) {
//         const updatedUser = await response.json();
//         console.log("User updated:", updatedUser);
//         alert("Profile updated successfully!");
//       } else {
//         console.error("Failed to update user");
//       }
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   const changeaddress = () => {
//     setchangingaddress(!changingaddress);
//   };

//   const saveaddress = (e) => {
//     setaddress(e.target.value);
//     updateUser(); // Save immediately or after a "Save" button is clicked
//   };

//   const changingmediahandles = () => {
//     setchangemediahandles(!changemediahandles);
//     if (!changemediahandles) {
//       updateUser(); // Save when the user finishes editing
//     }
//   };

//   const changefacebook = (e) => {
//     setFacebooklink(e.target.value);
//   };

//   const changeinstagram = (e) => {
//     setInstagramlink(e.target.value);
//   };

//   const changetwitter = (e) => {
//     setTwitterlink(e.target.value);
//   };

//   const changehobby = (e) => {
//     setnewHobby(e.target.value);
//   };

//   const addhobby = () => {
//     setHobbies([...Hobbies, newHobby]);
//     setnewHobby("");
//     updateUser(); // Save new hobbies to the backend
//   };

//   const deleteHobby = (hobbyToDelete) => {
//     setHobbies(Hobbies.filter((hobby) => hobby !== hobbyToDelete));
//     console.log(Hobbies);
//   };

//   return (
//     <div>
//       <div className="profile-container">
//         <div className="profile-top-container">
//           <div className="profile-top-left-container">
//             <div className="profile-img w-32 h-32">
//               <img
//                 src="src\assets\images\logo.jpg"
//                 className="rounded-full"
//               ></img>
//             </div>
//             <div className="user-address">
//               {changingaddress ? (
//                 <>
//                   <input type="text" value={address} onChange={(e) => setaddress(e.target.value)}></input>
//                   <i
//                     class="fa-solid fa-floppy-disk"
//                     onClick={changeaddress}
//                   ></i>
//                 </>
//               ) : (
//                 <>
//                   <div className="user-address-heading">{address}</div>
//                   <i
//                     class="fa-solid fa-pen-to-square"
//                     onClick={changeaddress}
//                   ></i>
//                 </>
//               )}
//             </div>
//           </div>
//           <div className="profile-top-right-container">
//             <div className="profile-top-right-container-elements-main">
//               User Name
//             </div>
//             <div className="profile-top-right-container-elements-main">
//               Gender
//             </div>
//             <div className="profile-top-right-container-elements-secondary">
//               {details.name}
//             </div>
//             <div className="profile-top-right-container-elements-secondary">
//               {details.gender}
//             </div>
//             <div className="profile-top-right-container-elements-main">
//               Phone
//             </div>
//             <div className="profile-top-right-container-elements-main">
//               Email
//             </div>
//             <div className="profile-top-right-container-elements-secondary">
//               {details.phoneNumber}
//             </div>
//             <div className="profile-top-right-container-elements-secondary">
//               {details.email}
//             </div>
//           </div>
//           {/* user {user._id} */}

//           {/*
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <input type="text" placeholder="First name" {...register("First name", {required: true, maxLength: 80})} />
//               <input type="text" placeholder="Last name" {...register("Last name", {required: true, maxLength: 100})} />
//               <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
//               <input type="tel" placeholder="Mobile number" {...register("Mobile number", {required: true, minLength: 6, maxLength: 12})} />
//               <input type="submit" />
//             </form>
//             */}
//         </div>
//         <div className="profile-bottom-container">
//           <div className="profile-bottom-left-container">
//             <div className="title">Media Handles </div>
//             {changemediahandles ? (
//               <>
//                 <div className="tiles">
//                   <p>Facebook: </p>
//                   <input type="text" value={Facebooklink} onChange={(e) => setFacebooklink(e.target.value)}></input>
//                 </div>
//                 <div className="tiles">
//                   <p>Instagram: </p>
//                   <input type="text" value={Instagramlink} onChange={(e) => setInstagramlink(e.target.value)}></input>
//                 </div>
//                 <div className="tiles">
//                   <p>Twitter: </p>
//                   <input type="text" value={Twitterlink} onChange={(e) => setTwitterlink(e.target.value)}></input>
//                 </div>
//                 <i
//                   class="fa-solid fa-floppy-disk"
//                   onClick={changingmediahandles}
//                 ></i>
//               </>
//             ) : (
//               <>
//                 <div className="tiles">
//                   <p>Facebook: </p>
//                   <p>{Facebooklink}</p>
//                 </div>
//                 <div className="tiles">
//                   <p>Instagram: </p>
//                   <p>{Instagramlink}</p>
//                 </div>
//                 <div className="tiles">
//                   <p>Twitter: </p>
//                   <p>{Twitterlink}</p>
//                 </div>
//                 <i
//                   class="fa-solid fa-pen-to-square"
//                   onClick={changingmediahandles}
//                 ></i>
//               </>
//             )}
//           </div>
//           <div className="profile-bottom-right-container">
//             <div className="title">Interests</div>
//             <div>
//               <input
//                 type="text"
//                 onChange={changehobby}
//                 value={newHobby}
//               ></input>
//               <i class="fa-solid fa-plus" onClick={addhobby}></i>
//               {Hobbies.map((hobby, ind) => {
//                 return (
//                   <div key={ind}>
//                     <p className="interests">{hobby}</p>
//                     <i
//                       class="fa-solid fa-trash"
//                       onClick={() => deleteHobby(hobby)}
//                     ></i>
//                   </div>
//                 );
//               })}
//               {/* (ind) => {delete Hobbies[ind]}
//              <p className="interests">Cricket</p>
//             <p className="interests">Football</p>
//             <p className="interests">Fitness</p>
//             <p className="interests">Gaming</p> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
