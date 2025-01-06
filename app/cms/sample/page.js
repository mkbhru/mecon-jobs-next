'use client'
import {  toast } from "react-toastify";

export default function App() {
  const notify = () => toast("Wow so easy !");

  return (
    <div className="grid place-items-center h-dvh bg-zinc-900/15">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={notify}>Notify !</button>
    </div>
  );
}
