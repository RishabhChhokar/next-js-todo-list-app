"use client";
import { useState } from "react";
import { addTodo } from "../serverActions/actions";
import {useRouter} from "next/navigation";
const Page = () => {
  const [description, setDescription] = useState("");
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("description", description);
    await addTodo(formData);
    setDescription(""); 
    router.push("/");
  };

  return (
    <div className="addTodo">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          className="form-input"
          placeholder="Enter your todo"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default Page;
