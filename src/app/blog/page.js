"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/navbar";
import Link from "next/link";
import axios from "axios";
import { AuthContext } from "@/components/context";
import { useContext } from "react";

const Blog = () => {
  const { isLogin, getLoginUser } = useContext(AuthContext);
  const router = useRouter();
  const [data, setData] = useState([]);
  let userDetails = isLogin();

  const fetchData = async () => {
    const getUserDetails = getLoginUser();
    let accessToken = getUserDetails.accessToken;
    const result = await axios.get(
      "https://api.virtruelguides.com/api/v1.0.0/auth/getVlogData",
      {
        headers: {
          "x-access-token": accessToken || "",
        },
      }
    );
    setData(result.data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (userDetails) {
    return (
      <>
        <Navbar />
        {data.length > 0 &&
          data.map((item, index) => (
            <Link key={index} href={`/blog/${item?.id}`} target="_blank">
              <li>id : {item?.id}</li>
              <li>name : {item?.name}</li>
              <li>title: {item?.title}</li>
            </Link>
          ))}
      </>
    );
  } else {
    return router.push("/");
  }
};

export default Blog;
