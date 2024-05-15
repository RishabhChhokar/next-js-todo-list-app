"use client"
import { useRouter } from "next/navigation";
import { updateTodo } from "../../serverActions/actions";

const Page = ({ params, searchParams }) => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedTodo = formData.get("description").trim();

    if (!updatedTodo) {
      alert("Please enter a valid todo description."); 
      return;
    }
    await updateTodo(formData);
    router.push("/");
  };

  return (
    <div className="addTodo">
      <form onSubmit={handleSubmit}>
        <span>Current Todo = {searchParams.description}</span>
        <input
          type="text"
          name="description"
          placeholder="Enter updated todo"
        />
        <input type="hidden" name="id" value={params.id} readOnly />
        <button type="submit" className="update">
          Update Todo
        </button>
      </form>
    </div>
  );
};

export default Page;
