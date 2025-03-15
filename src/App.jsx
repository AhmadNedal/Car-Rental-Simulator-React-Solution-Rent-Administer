import React, { useContext, useState } from "react";
import LoginPage from "./LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customer from "./Customer/Customer";
import AdminPage from "./Admin/AdminPage";
import { createContext } from "react";
import allCar from "./Model/AllCar";
import EditeCar from "./Admin/PageCar/EditeCar";
import allCustomers from "./Model/AllCustomers";
import AddNewCar from "./Admin/PageCar/AddNewCar";
import AddNewCustomer from "./Admin/PagCustomer/AddNewCustomer";
import EditeCustomer from "./Admin/PagCustomer/EditeCustomer";
import Guarantee from "./Customer/Guarantee";
import PageCustomer from "./Customer/PageCustomer";
import CarSearch from "./Customer/Search";
import SignUp from "./Customer/SignUp";

let ContextAdmin = createContext();

function App() {
  

  
  
  if ( JSON.parse( localStorage.getItem( "UserLogin") ==null )) {
      localStorage.setItem( "UserLogin" , JSON.stringify (
    {
      id:2,name:"Sara" ,Email:"Sara@Sara.com" , Password:"Sara22",Card:[2]  ,
      imagUrl :"https://cdn-icons-png.flaticon.com/512/2919/2919600.png"
    }
  )); 
  }


  if (JSON.parse(localStorage.getItem("Car")==null)) {

    localStorage.setItem(
      "Car",
      JSON.stringify([
        {
          id: 1,
          imageUrl: "https://th.bing.com/th/id/OIP.HrDaBrXEv89QNvlkliBK0QHaFj?w=922&h=691&rs=1&pid=ImgDetMain",
          model: 32,
          name: "fsdf",
          title: "Tilfnjfngb",
          price: 32,
          available:false,
          owner: -1,
        },
        {
          id: 2,
          imageUrl:"https://th.bing.com/th/id/R.52a2e5a49ab355e842ea3d72c77a1d30?rik=BB41QFsr0jV4qg&pid=ImgRaw&r=0",
          model: 1999,
          name: "newnew",
          title: "Tilfnjfngb",
          price: 33,
          available: true, // True يعني مستأجرة
          owner: 2,
        },

        {
          id: 3,
          imageUrl: "https://tse3.mm.bing.net/th?id=OIP.sD2epIkmivNT3J0ElgMuDQHaE6&pid=Api&P=0&h=220",
          model: 32,
          name: "mercedes",
          title: "newnew",
          price: 2400,
          available: false,
          owner: -1,
        },


        {
          id: 4,
          imageUrl: "https://purepng.com/public/uploads/large/red-edition-audi-luxury-car-jdc.png",
          model: 2018,
          name: "Odeee",
          title: "newnew",
          price: 2600,
          available: false,
          owner: -1,
        },


        {
          id: 5,
          imageUrl: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Desktop-car-pictures-and-wallpapers.jpg",
          model: 2020,
          name: "Jprje",
          title: "newnew",
          price: 1900,
          available: false,
          owner: -1,
        },

    {
          id: 6,
          imageUrl: "https://purepng.com/public/uploads/large/purepng.com-bmw-carcarsbmw-961524670123dgp13.png",
          model: 2021,
          name: "BMW",
          title: "newnew",
          price: 1600,
          available: false,
          owner: -1,
        },

      ])
  );

  
  
  } 
  
  
    if (localStorage.getItem("Login") == null ) {
          localStorage.setItem("Login", false);
    }
    let Log = localStorage.getItem("Login");

    if ( JSON.parse(JSON.parse(localStorage.getItem("Customer" ))==null)) {
          localStorage.setItem("Customer", JSON.stringify(allCustomers));
    }

  const [array, setArray] = useState(JSON.parse(localStorage.getItem("Car")));


  return (
    <div>
      {/* <LoginPage/> */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              Log == "Admin" ? (
                <ContextAdmin.Provider
                  value={{ array, setArray }}
                >
                  <AdminPage />
                </ContextAdmin.Provider>
              ) : Log == "Customer" ? (
                <Customer />
              ) : (
                <LoginPage />
              )
            }
          />

          <Route
            path="/Admin"
            element={
              <ContextAdmin.Provider value={{ array, setArray }}>
                <AdminPage />
              </ContextAdmin.Provider>
            }
          />
          <Route path="/Customer" element={<Customer />} />
          <Route path="/EditCar" element={
              <ContextAdmin.Provider value={{ array, setArray }}>
                  <EditeCar />
              </ContextAdmin.Provider>}
          />
          <Route path="/AddNewCar" element={<AddNewCar />} />
          <Route path="/AddNewCustomer" element={<AddNewCustomer />} />
          <Route path="/EditeCustomer" element={<EditeCustomer />}/>
          <Route path="/Guarantee" element={<Guarantee />}/>
          <Route path="/PageCustomer" element={<PageCustomer />}/>
          <Route path="/CarSearch" element={<CarSearch />}/>
          <Route path="/SignUp" element={<SignUp />}/>


        </Routes>
      </Router>
    </div>
  );
}

export default App;
export { ContextAdmin };
