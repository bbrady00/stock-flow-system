import { useEffect } from "react";
import axios from "../api/axios";

export default function Test() {
  useEffect(() => {
    axios.get("/health").then((res) => {
      console.log(res.data);
    });
  }, []);

  return <div>Testing API...</div>;
}
