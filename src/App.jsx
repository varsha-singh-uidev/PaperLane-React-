import React from "react";
import LandPage from "./Components/LandPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PopupPage from "./Components/PopupPage";
import MainPage from "./Components/MainPage";


function App() {
  const router = createBrowserRouter([
    {path : "/", element : <LandPage/>},
    {path : "/popup", element : <PopupPage/>},
    {path : "/mainpage", element : <MainPage/>}
  ])
  return (
    <div style={{fontFamily: "Inter"}}>
    <RouterProvider router={router}/>
    </div>
  )
}

export default App
