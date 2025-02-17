import React, { useContext, useEffect, useState } from 'react'
import fetchData from '../../../Utils/fetchData'
import { AuthContext } from '../../../Utils/AuthContext'

const Tasks = () => {
  const {token}=useContext(AuthContext)
  const [tasks,setTasks]=useState([])
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      setTasks(data?.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useEffect(()=>{
    fetchTasks()
  },[token])

  const items = tasks?.map((e) => {
  return <h2>{e?.title}</h2>
  }
  )
  return (
    <>
    {console.log(items)}
      {items}
    </>
  )
}

export default Tasks
