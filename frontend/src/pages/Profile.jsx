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
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="text" placeholder="First name" {...register("First name", {required: true, maxLength: 80})} />
              <input type="text" placeholder="Last name" {...register("Last name", {required: true, maxLength: 100})} />
              <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
              <input type="tel" placeholder="Mobile number" {...register("Mobile number", {required: true, minLength: 6, maxLength: 12})} />
              <input type="submit" />
              
            </form>
           </div>
        </div>
        <div className="profile-bottom-container">
        <div className="profile-bottom-left-container">c</div>
        <div className="profile-bottom-right-container">d</div>
        </div>
      </div>
      <h1>Profile</h1>
    </div>
  )
}

export default Profile
