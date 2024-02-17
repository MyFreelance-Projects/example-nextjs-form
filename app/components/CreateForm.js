"use client";

import { useState } from "react";

// CRUD functions
import { createTeam } from "@/services/teamService";

// Notification
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

import { regions } from "@/data/regions";

export default function TeamForm({ changing, setChanging }) {
  const [inputs, setInputs] = useState({
    school: "",
    province: "",
    region: "default",
  });
  const [selected, setSelected] = useState("default");

  // **********************************************************************
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);

    const index = regions.findIndex(
      (reg) => reg.reg_province === event.target.value
    );
    const { reg_province, reg_type } = regions[index];

    setInputs((values) => ({
      ...values,
      ["province"]: reg_province,
      ["region"]: reg_type,
    }));
  };

  let options = null;
  if (selected !== "default") {
    const index = regions.findIndex((reg) => reg.reg_province === selected);
    const region = regions[index];
    options = (
      <option value={inputs.region || region.reg_type} key={region.reg_id}>
        {region.reg_type}
      </option>
    );
  }

  //   create team
  const handleSubmit = async (e) => {
    e.preventDefault();
    setChanging(true);
    try {
      const createdProduct = await createTeam(inputs);

      if (createdProduct) {
        toast.success("เพิ่มทีมใหม่สำเร็จ");
        setChanging(false);

        // Clear form fields
        setInputs({
          school: "",
          province: "",
          region: "default",
        });
        setSelected("default");
      }
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด!");
      console.error("Error creating team:", error);
    }
  };

  return (
    <form
      onSubmit={changing ? () => {} : handleSubmit}
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
          onChange={handleChange}
          required
        />
        {/* Dependent dropdown */}
        <select
          value={selected}
          name="province"
          onChange={changeSelectOptionHandler}
          className="border border-orange-500 p-1 rounded-md"
        >
          <option value="default" disabled>
            เลือกจังหวัด
          </option>
          {regions.map((reg) => (
            <option key={reg.reg_id} value={reg.reg_province}>
              {reg.reg_province}
            </option>
          ))}
        </select>
        <select
          name="region"
          value={inputs.region}
          onChange={handleChange}
          className="border border-orange-500 p-1 rounded-md"
        >
          <option value="default" disabled>
            เลือกภาค
          </option>
          {options}
        </select>
      </div>
      <button
        className="w-full p-2 bg-gradient-to-r from-amber-500 to-amber-400 opacity-90 hover:opacity-80 rounded-md text-white"
        type="submit"
      >
        บันทึก
      </button>
    </form>
  );
}
