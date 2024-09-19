"use client";
import { useFormState } from "react-dom";
import { addCategory, getCategories } from "./action";
import { ActionState } from "../util";
import { useActionState } from "react";

export default function CategoryPage() {
  // const categories = await getCategories();
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    addCategory,
    { error: "" }
  );

  return (
    <div className="rounded-lg p-8 bg-slate-600">
      {/* {JSON.stringify(categories)} */}
      <h1>Title</h1>
      <form className="space-y-6 " action={formAction}>
        <div className="flex gap-2">
          <label htmlFor="namee">namee</label>
          <input
            name="namee"
            id="namee"
            className="rounded-lg text-black"
          ></input>
        </div>
        {/* <label htmlFor="username">Username</label>
        <input className="ml-2 rounded-lg" name="username" id="username" /> */}
        <button
          type="submit"
          className="px-3 py-1 rounded-lg bg-black"
          disabled={pending}
        >
          Add
        </button>
      </form>
      {/* <p>{JSON.stringify(state)}</p>
      <p>{JSON.stringify(pending)}</p> */}
    </div>
  );
}
