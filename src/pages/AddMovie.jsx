import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './AddMovie.css';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  year: yup
    .number()
    .typeError('Year must be a number')
    .integer('Year must be an integer')
    .min(1900, 'Year must be >= 1900')
    .max(new Date().getFullYear(), 'Year cannot be in the future')
    .required('Year is required'),
  description: yup.string(),
}).required();

export default function AddMovie({ onAdd }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    onAdd(data);
    alert('Movie added!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <h2>Add New Movie</h2>

      <div className="form-group">
        <label>Title</label>
        <input {...register('title')} />
        <p className="error">{errors.title?.message}</p>
      </div>

      <div className="form-group">
        <label>Year</label>
        <input {...register('year')} />
        <p className="error">{errors.year?.message}</p>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea {...register('description')} />
        <p className="error">{errors.description?.message}</p>
      </div>

      <button type="submit">Add Movie</button>
    </form>
  );
}
