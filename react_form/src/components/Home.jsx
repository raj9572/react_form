import { useForm } from "react-hook-form"
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'

const schema = z.object({
    email:z.string().email(),
    password:z.string().min(8)
})



const Home = () => {
const {register ,setError, handleSubmit,formState:{errors,isSubmitting}} = useForm({
    defaultValues:{
        email:"test@gmail.com"
    },
    resolver:zodResolver(schema)
})

const onSubmit = async(data) =>{
   try {
     await new Promise((resolve)=>setTimeout(resolve, 1000))
     console.log(data)
     throw new Error("Something went wronge")
    } catch (error) {
    setError("root",{
        message:error.message
    })
   }
}


  return (
    <div className="formik-yup">
    <form id="Formik" onSubmit={handleSubmit(onSubmit)} >
      
       <div className="input-div">
       <input 
       type="email"
       placeholder="Enter your email"
       {...register("email")} 
        
       
        />
        {errors.email && <p style={{color:"red", margin:"0 10px", fontSize:"12px"}}>{errors.email.message}</p> }
       </div>
       <div className="input-div">
       <input 
       type="password"
       autoComplete="off"
        placeholder="Enter your password" 
        {...register("password")}
        
       
        />
        {errors.password && <p style={{color:"red", margin:"4 10px", fontSize:"12px"}}>{errors.password.message}</p> }

       </div>
       
       <button disabled={isSubmitting} type='submit' className="btn">{isSubmitting ? "Loading..." : "Submit"}</button>
        {errors.root && <p style={{color:"red", margin:"4 10px", fontSize:"12px"}}>{errors.root.message}</p> }
    </form>
 </div>
  )
}

export default Home
