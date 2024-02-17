"use client";

import { getSingleTeam, updateTeam } from "@/services/teamService";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// Notification
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

export default function Edit({ params }) {
  const router = useRouter();
  const [inputs, setInputs] = useState({});

  // **********************************************************************
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  //   update team
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = await updateTeam(params.tid, inputs);
      console.log("respone", updatedProduct);

      if (updatedProduct) {
        toast.success("บันทึกการเปลี่ยนแปลงสำเร็จ");
        router.push("/");
      }
    } catch (error) {
      console.error("Error updating team:", error);
    }
  };

  //   fetch team
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getSingleTeam(params.tid);
        const { schools, provinces, regions } = response[0];
        console.log(response[0]);
        setInputs({
          school: schools,
          province: provinces,
          region: regions,
        });
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, [params.tid]);

  return (
    <div className="flex justify-center items-center gap-4 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-sm flex flex-col gap-4 p-2 justify-center items-center"
      >
        <Toaster />
        <div className="flex flex-col gap-3">
          <label>ชื่อโรงเรียน</label>
          <input
            className="border border-orange-500 p-1 rounded-md"
            type="text"
            name="school"
            value={inputs.school || ""}
            onChange={(e) =>
              setInputs({
                ...inputs,
                school: e.target.value,
              })
            }
            required
          />
          <label>จังหวัด</label>
          <input
            className="border border-orange-500 p-1 rounded-md"
            type="text"
            name="province"
            value={inputs.province || ""}
            onChange={handleChange}
            required
          />
          <label>ภาค</label>
          <input
            className="border border-orange-500 p-1 rounded-md"
            type="text"
            name="region"
            value={inputs.region || ""}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="p-2 bg-gradient-to-r from-amber-500 to-amber-400 opacity-90 hover:opacity-80 rounded-md text-white"
          type="submit"
        >
          บันทึก
        </button>
      </form>
    </div>
  );
}
