import React from 'react';
import { useForm } from 'react-hook-form';

function Main() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } } = useForm();
  
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        type="text" 
        placeholder="Name" {...register("Name", {required: true})} /><br />
        {errors.Name && (
            <span className="red">
              This field is required and with the right format
            </span>
          )}<br /><br />
      <input 
        type="search" placeholder="City" {...register("City", {required: true})} /><br />
        {errors.Name && (
            <span className="red">
              This field is required and with the right format
            </span>
          )}<br />
      <button type="submit">Enter</button>
      
    </form>

    
  );
}


export default Main;
