// "use client";
import Navbar from "@/components/navbar";
import React from "react";
import axios from "axios";

async function getBlog(blogid) {
  // Wait for the playlists
  const accessToken =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userDetailsStorage") || "{}")
          .accessToken
      : "";
  const row = await axios.get(
    `https://api.virtruelguides.com/api/v1.0.0/auth/getVlogData?id=${blogid}`,
    {
      headers: {
        "x-access-token": accessToken,
      },
    }
  );
  const res = row.data.data;
  return res;
}
const SingleBlog = async (request) => {
  const { blogId } = request.params;
  let data = await getBlog(blogId);

  return (
    <>
      <Navbar />
      <h1>Id:{data.id}</h1>
      <h1>Name: {data.name}</h1>
      <h1>Title: {data.title}</h1>
    </>
  );
};

export default SingleBlog;
