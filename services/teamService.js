import axios from "axios";

export const publicRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const createTeam = async (data) => {
  try {
    const respone = await publicRequest.post(`/api/team`, data);
    return respone.data;
  } catch (error) {
    console.log("failed to add new team", error);
  }
};

export const getSingleTeam = async (tid) => {
  try {
    const response = await publicRequest.get(`/api/team/${tid}`);
    return response.data;
  } catch (error) {
    console.log("fetch error", error);
  }
};
export const getAllTeams = async () => {
  try {
    const respone = await publicRequest.get(`/api/team`);
    return respone.data;
  } catch (error) {
    console.log("fetch error", error);
  }
};

export const updateTeam = async (tid, data) => {
  try {
    const response = await publicRequest.put(`/api/team/${tid}`, data);
    return response.data;
  } catch (error) {
    console.log("failed to update", error);
  }
};

export const deleteTeam = async (tid) => {
  try {
    const response = await publicRequest.delete(`/api/team/${tid}`);
    return response.data;
  } catch (error) {
    console.log("failed to delete", error);
  }
};
