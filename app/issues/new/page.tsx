"use client"
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createIssueSchema } from "@/app/api/issues/validationSchemas";
import {z} from 'zod';
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {register, control, handleSubmit, formState: { errors, isLoading}} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const[error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);




  const handleFormSubmit = handleSubmit(async(data) => {
    try{
      setIsSubmitting(true);
      let response = await axios.post('/api/issues', data);
      router.push('/issues');

    } catch(err){
      setIsSubmitting(false);
      setError("Unexpected error occured!");
      
    }
    setIsSubmitting(false);
   
  });
  return (
    <div className="max-w-xl">
      {
      error &&
      <Callout.Root color="red" className="mb-5">
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>
      }
    <form className='space-y-3' onSubmit={handleFormSubmit}>
        <TextField.Root>
            <TextField.Input placeholder='Title of the issue' {...register('title')}/>
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        {errors.title && <Text color="red" as="p"></Text>}
        <Controller
          name="description"
          control={control}
          render={({field}) => <SimpleMDE placeholder="Description" {...field}/>}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner/>}</Button>
    </form>
    </div>
  )
}

export default NewIssuePage 