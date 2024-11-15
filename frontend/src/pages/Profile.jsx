import { useEffect, useState } from "react";
import "../styles/Profile.css";

const Profile = () => {
  const [details, setDetails] = useState([]);
  const [address, setaddress] = useState("Add Address");
  const [changingaddress, setchangingaddress] = useState(false);
  const [changemediahandles, setchangemediahandles] = useState(false);
  const [Facebooklink, setFacebooklink] = useState("Link your Facebook");
  const [Instagramlink, setInstagramlink] = useState("Link your Instagram");
  const [Twitterlink, setTwitterlink] = useState("Link your Twitter");
  const [Hobbies, setHobbies] = useState(["cricket", "hockey"]);
  const [newHobby, setnewHobby] = useState("");

  useEffect(() => {
    async function getUser() {
      let user = localStorage.getItem("user");
      user = JSON.parse(user);
      // console.log("user: ", user);
      // console.log("user id: ", user._id);
      try {
        const response = await fetch(
          `http://localhost:5000/signup/${user._id}`,
          {
            method: "GET",
          }
        );
        const userDetails = await response.json();
        setDetails(userDetails);
        console.log(userDetails);
      } catch (error) {
        console.log(error);
      }
    }

    getUser();
  }, []);

  const changeaddress = () => {
    setchangingaddress(!changingaddress);
  };

  const saveaddress = (e) => {
    setaddress(e.target.value);
  };

  const changingmediahandles = () => {
    setchangemediahandles(!changemediahandles);
  };

  const changefacebook = (e) => {
    setFacebooklink(e.target.value);
  };

  const changeinstagram = (e) => {
    setInstagramlink(e.target.value);
  };

  const changetwitter = (e) => {
    setTwitterlink(e.target.value);
  };

  const changehobby = (e) => {
    setnewHobby(e.target.value);
  };
  const addhobby = (e) => {
    setHobbies([...Hobbies, newHobby]);
    setnewHobby("");
  };

  const deleteHobby = (hobbyToDelete) => {
    setHobbies(Hobbies.filter((hobby) => hobby !== hobbyToDelete));
    console.log(Hobbies);
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
              {changingaddress ? (
                <>
                  <input type="text" onChange={saveaddress}></input>
                  <i
                    class="fa-solid fa-floppy-disk"
                    onClick={changeaddress}
                  ></i>
                </>
              ) : (
                <>
                  <div className="user-address-heading">{address}</div>
                  <i
                    class="fa-solid fa-pen-to-square"
                    onClick={changeaddress}
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
          {/* user {user._id} */}

          {/* 
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="text" placeholder="First name" {...register("First name", {required: true, maxLength: 80})} />
              <input type="text" placeholder="Last name" {...register("Last name", {required: true, maxLength: 100})} />
              <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
              <input type="tel" placeholder="Mobile number" {...register("Mobile number", {required: true, minLength: 6, maxLength: 12})} />
              <input type="submit" />
            </form>
            */}
        </div>
        <div className="profile-bottom-container">
          <div className="profile-bottom-left-container">
            <div className="title">Media Handles </div>
            {changemediahandles ? (
              <>
                <div className="tiles">
                  <p>Facebook: </p>
                  <input type="text" onChange={changefacebook}></input>
                </div>
                <div className="tiles">
                  <p>Instagram: </p>
                  <input type="text" onChange={changeinstagram}></input>
                </div>
                <div className="tiles">
                  <p>Twitter: </p>
                  <input type="text" onChange={changetwitter}></input>
                </div>
                <i
                  class="fa-solid fa-floppy-disk"
                  onClick={changingmediahandles}
                ></i>
              </>
            ) : (
              <>
                <div className="tiles">
                  <p>Facebook: </p>
                  <p>{Facebooklink}</p>
                </div>
                <div className="tiles">
                  <p>Instagram: </p>
                  <p>{Instagramlink}</p>
                </div>
                <div className="tiles">
                  <p>Twitter: </p>
                  <p>{Twitterlink}</p>
                </div>
                <i
                  class="fa-solid fa-pen-to-square"
                  onClick={changingmediahandles}
                ></i>
              </>
            )}
          </div>
          <div className="profile-bottom-right-container">
            <div className="title">Interests</div>
            <div>
              <input
                type="text"
                onChange={changehobby}
                value={newHobby}
              ></input>
              <i class="fa-solid fa-plus" onClick={addhobby}></i>
              {Hobbies.map((hobby, ind) => {
                return (
                  <div key={ind}>
                    <p className="interests">{hobby}</p>
                    <i
                      class="fa-solid fa-trash"
                      onClick={() => deleteHobby(hobby)}
                    ></i>
                  </div>
                );
              })}
              {/* (ind) => {delete Hobbies[ind]}
             <p className="interests">Cricket</p>
            <p className="interests">Football</p>
            <p className="interests">Fitness</p>
            <p className="interests">Gaming</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
