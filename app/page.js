"use client";
import { useState } from "react";
import CreateForm from "./components/CreateForm";
import ShowTeams from "./components/ShowTeams";

export default function Home() {
  const [changing, setChanging] = useState(false);

  return (
    <div className="flex justify-center items-center gap-4 min-h-screen">
      <CreateForm changing={changing} setChanging={setChanging} />
      <ShowTeams changing={changing} setChanging={setChanging} />
    </div>
  );
}
