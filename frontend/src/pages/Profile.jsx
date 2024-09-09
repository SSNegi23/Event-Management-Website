import "../styles/Profile.css";
import { useForm } from 'react-hook-form';


const Profile = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  return (
    <div>
      <div className="profile-container">
        <div className="profile-top-container">
           <div className="profile-top-left-container">
              <div className="profile-img w-32 h-32"><img  src="src\assets\images\logo.jpg" className="rounded-full"></img></div>
              <div className="user-address"> CURRENT ADDRESS</div>
           </div>
           <div className="profile-top-right-container">
              <div className="profile-top-right-container-elements-main">First Name</div>
              <div className="profile-top-right-container-elements-main">Second Name</div>
              <div className="profile-top-right-container-elements-secondary">John</div>
              <div className="profile-top-right-container-elements-secondary">Doe</div>
              <div className="profile-top-right-container-elements-main">Phone</div>
              <div className="profile-top-right-container-elements-main">Email</div>
              <div className="profile-top-right-container-elements-secondary">9811111111</div>
              <div className="profile-top-right-container-elements-secondary">abc@gmail.com</div>
           </div>

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
          <div className="title">Media Handles</div>
          <div className="tiles">
            <p>Facebook: </p>
            <p>john</p>
          </div>
          <div className="tiles">
            <p>Instagram: </p>
            <p>john</p>
          </div>
          <div className="tiles">
            <p>Twitter: </p>
            <p>john</p>
          </div>
        </div>
        <div className="profile-bottom-right-container">
          <div className="title">
            Interests
          </div>
          <div>
            <p className="interests">Cricket</p>
            <p className="interests">Football</p>
            <p className="interests">Fitness</p>
            <p className="interests">Gaming</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
