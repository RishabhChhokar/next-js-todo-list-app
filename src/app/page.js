import Link from "next/link";
import EditIcon from "./components/EditIcon";
import Delete from "./components/Delete";
import PlusIcon from "./components/PlusIcon";
import connectMongoDB from "../../libs/connect";
import Todo from "../../models/todoModel";

async function getTodos() {
  try {
    await connectMongoDB();
    const todos = await Todo.find({});
    if (!todos) {
      throw new Error("Couldn't fetch the todos.");
    }
    console.log(todos);
    return todos;
  } catch (error) {
    console.log("Error while fetching the todos.", error);
  }
}

export default async function Home() {
  const data = await getTodos();
  return (
    <div className="wrapper">
      <div className="container">
        <h1>Todo App</h1>
        <span className="plusbtn">
          <Link href="/addTodo">
            <PlusIcon className="icon plus" />
          </Link>
        </span>
        {data.length > 0 && (
          <div className="todo-list">
            {data.map((todo) => (
              <div className="list" key={todo._id}>
                <li>{todo.description}</li>
                <div className="iconWrapper">
                  <Delete id={todo._id.toString()} />
                  <span>
                    <Link
                      href={{
                        pathname: `/update/${todo._id}`,
                        query: { description: todo.description },
                      }}
                    >
                      <EditIcon className="icon" />
                    </Link>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
