import {useFormik} from 'formik'
import * as Yup from 'yup'


const signupSchema = Yup.object({
  name:Yup.string().min(3).max(25).required("please enter your name"),
  email:Yup.string().email().required("please enter your email"),
  password:Yup.string().min(6).required("please enter password"),
  confirm_password:Yup.string().required("please enter confirm_password")
                      .oneOf([Yup.ref("password"),null],"password must match"),

})

const FormikYup = () => {

  const initialValues = {
    name:"",
    email:"",
    password:"",
    confirm_password:""
  }



  const {values,errors,touched,handleBlur,handleSubmit,handleChange} = useFormik({
                        initialValues:initialValues,
                         validationSchema:signupSchema,
                        onSubmit : (values,action) =>{
                          console.log('values',values)
                          action.resetForm()
                        },
                        
                       
                      })
    // console.log("errors",errors)


  return (
    <div className="formik-yup">
       <form id="Formik" action="" onSubmit={handleSubmit}>
          <div className="input-div">
          <input 
          type="text"
          name="name"
           placeholder="Enter your name" 
           value={values.name}
           onChange={handleChange}
           onBlur={handleBlur}
           />
           {errors.name && touched.name ? <p style={{color:"red",fontSize:"14px",margin:"0px 10px"}}>{errors.name}</p> : ""}
          </div>
          <div className="input-div">
          <input 
          type="text"
          name="email"
           placeholder="Enter your email" 
           value={values.email}
           onChange={handleChange}
           onBlur={handleBlur}
          
           />
             {errors.email && touched.email ? <p style={{color:"red",fontSize:"14px",margin:"0px 10px"}}>{errors.email}</p> : ""}
          </div>
          <div className="input-div">
          <input 
          type="password"
          name="password"
          autoComplete="off"
           placeholder="Enter your password" 
           value={values.password}
           onChange={handleChange}
           onBlur={handleBlur}
           />
            {errors.password && touched.password ? <p style={{color:"red",fontSize:"14px",margin:"0px 10px"}}>{errors.password}</p> : ""}
          </div>
          <div className="input-div">
          <input 
          type="password"
          name="confirm_password"
          autoComplete="off"
           placeholder="Enter your confirm password" 
           value={values.confirm_password}
           onChange={handleChange}
           onBlur={handleBlur}
           />
             {errors.confirm_password && touched.confirm_password ? <p style={{color:"red",fontSize:"14px",margin:"0px 10px"}}>{errors.confirm_password}</p> : ""}
          </div>
          <button type='button' className="btn">Register</button>
       </form>
    </div>
  )
}

export default FormikYup
