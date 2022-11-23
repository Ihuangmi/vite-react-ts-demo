import React from "react";
import { deleteContact } from "@/api/contacts";
import { redirect } from "react-router-dom";

export async function action({ params }) {
  console.log("🚀 ~ file: index.tsx ~ line 6 ~ action ~ params", params);
  //   throw new Error("oh dang!");

  await deleteContact(params.id);
  return redirect(`/`);
}
