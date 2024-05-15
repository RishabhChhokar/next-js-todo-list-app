"use server";
import connectMongoDB from "../../../libs/connect";
import Todo from "../../../models/todoModel";
import { revalidatePath } from "next/cache";
export async function addTodo(formData) {
  try {
    const description = formData.get("description");
    await connectMongoDB();
    const newTodo = await Todo.create({ description });
    console.log("Todo = ", newTodo);
    revalidatePath("/")
  } catch (error) {
    return { message: "Failed to create todo." };
  }
}

export async function updateTodo(formData) {
  try {
    const id = formData.get("id");
    const description = formData.get("description");
    await connectMongoDB();
    await Todo.findByIdAndUpdate({ _id: id }, { description }, { new: true });
    revalidatePath("/")
  } catch (error) {
    return { message: "Failed to update todo." };
  }
}

export async function deleteTodo(formData) {
  try {
    const id = formData.get("id");
    await connectMongoDB();
    await Todo.findByIdAndDelete({ _id: id });
    revalidatePath("/")
  } catch (error) {
    return { message: "Failed to delete todo." };
  }
}

