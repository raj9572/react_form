import {useState} from "react";
import * as Yup from 'yup'
const FormWithYup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interests: [],
    birthDate: "",
  });

  const [errors, setErrors] = useState();
  
const validationSchema = Yup.object({
  firstName:Yup.string().required("first name is required"),
  lastName:Yup.string().required("last name is required"),
  email:Yup.string()
  .required("email is required")
  .email("inalid email format"),
  phoneNumber:Yup.string().matches(/^\d{10}$/,"phone no must be 10 digit").required(),
  password:Yup.string().required("password is required")
                        .min(8,"password must be 8 char")
                        .matches(/[!@#$%^&*(),.?":{}|<>]/,"password must be one symbol char")
                        .matches(/[0-9]/,"password must be contain one number")
                        .matches( /[A-Z]/,"password must be contain one uppercase letter ")
                        .matches( /[a-z]/,"password must be contain one lowercase letter "),
  confirmPassword:Yup.string().oneOf([Yup.ref("password")],"password must match").required("conform password must required"),
  age:Yup.number()
  .typeError("Age must be number")
  .min(18,"you must be at least 18 year old")
  .max(100,"you con not be older than 100 year old")
  .required("Age is required"),
  gender:Yup.string().required("gender is required"),
  interests:Yup.array()
            .min(1,"select at least one intrest")
            .required("select at least one"),
  birthDate:Yup.date().required("requiedjdss ")

})  
  const handleSubmit =async (e) => {
    e.preventDefault()

    // const nonParsed = {
    //   firstName:"rjali",
    //   lastName:"fdkf",
    //   email:"piyush@gami.com",
    //   phoneNumber:"489494849734",
    //   password:"fkdsk3",
    //   confirmPassword:"4jkjds",
    //   age:"18",
    //   gender:"male",
    //   interests:["cricket"],
    //   birthDate:"2024-02-12"
    // }

    // const parseUser = validationSchema.cast(nonParsed)
    // console.log(parseUser,nonParsed)

     try {
      await validationSchema.validate(formData , {abortEarly:false})
      console.log('form data',formData)
     } catch (error) {
      console.log(error.inner)
      const newError = {}

      error.inner.forEach(err => {
         newError[err.path] = err.message
      });

      setErrors(newError)
     }

  };

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const {name, checked} = e.target;
    let updatedInterests = [...formData.interests];
    if (checked) {
      updatedInterests.push(name);
    } else {
      updatedInterests = updatedInterests.filter(
        (interest) => interest !== name
      );
    }

    setFormData({
      ...formData,
      interests: updatedInterests,
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder="Enter your first name"
          onChange={handleChange}
        />
        {errors?.firstName && <div className="error">{errors?.firstName}</div>}
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          placeholder="Enter your last name"
          onChange={handleChange}
        />
        {errors?.lastName && <div className="error">{errors?.lastName}</div>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your email"
          onChange={handleChange}
        />
        {errors?.email && <div className="error">{errors?.email}</div>}
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          placeholder="Enter your phone number"
          onChange={handleChange}
        />
        {errors?.phoneNumber && (
          <div className="error">{errors?.phoneNumber}</div>
        )}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Enter your password"
          onChange={handleChange}
        />
        {errors?.password && <div className="error">{errors?.password}</div>}
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          placeholder="Confirm your password"
          onChange={handleChange}
        />
        {errors?.confirmPassword && (
          <div className="error">{errors?.confirmPassword}</div>
        )}
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          placeholder="Enter your age"
          onChange={handleChange}
        />
        {errors?.age && <div className="error">{errors?.age}</div>}
      </div>

      <div>
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors?.gender && <div className="error">{errors?.gender}</div>}
      </div>

      <div>
        <label>Interests:</label>
        <label>
          <input
            type="checkbox"
            name="coding"
            checked={formData.interests.includes("coding")}
            onChange={handleCheckboxChange}
          />
          Coding
        </label>
        <label>
          <input
            type="checkbox"
            name="sports"
            checked={formData.interests.includes("sports")}
            onChange={handleCheckboxChange}
          />
          Sports
        </label>
        <label>
          <input
            type="checkbox"
            name="reading"
            checked={formData.interests.includes("reading")}
            onChange={handleCheckboxChange}
          />
          Reading
        </label>
        {errors?.interests && <div className="error">{errors?.interests}</div>}
      </div>
      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          placeholder="Enter your date of birth"
          onChange={handleChange}
        />
        {errors?.birthDate && <div className="error">{errors?.birthDate}</div>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormWithYup;