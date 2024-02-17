import { deleteTeam, getAllTeams } from "@/services/teamService";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ShowTeams({ changing, setChanging }) {
  const [teams, setTeams] = useState([]);

  //   delete team
  const handleDelete = async (id) => {
    setChanging(true);
    const deleted = await deleteTeam(id);
    if (deleted) {
      toast.error("ลบทีมสำเร็จ");
      setChanging(false);
    }
  };

  //   fetch team
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getAllTeams();
        setTeams(response);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, [changing]);

  return (
    <div className="border p-12">
      <h1 className="border-b-4">All Teams</h1>
      {teams &&
        teams.map((team) => (
          <div
            key={team.id}
            className="flex gap-2 justify-center items-center border p-2"
          >
            <h1>{team.schools}</h1>
            <h1>{team.provinces}</h1>
            <h1>{team.regions}</h1>
            <button
              className="bg-red-500 p-2 rounded-md"
              onClick={changing ? () => {} : () => handleDelete(team.id)}
            >
              delete
            </button>
            <Link href={`/team/${team.id}`}>แก้ไข</Link>
          </div>
        ))}
    </div>
  );
}
