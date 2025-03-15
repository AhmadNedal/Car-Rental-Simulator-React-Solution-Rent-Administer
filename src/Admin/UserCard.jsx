import React from 'react';
import { useNavigate } from "react-router-dom";


function UserCard({ user ,index ,setCustomerr }) {

  const navigate = useNavigate();

  const handleDelete = () => {
    let array = JSON.parse(localStorage.getItem("Customer"));
    let newArray = array.filter((e)=>e.id!=user.id);
    localStorage.setItem("Customer", JSON.stringify(newArray)); 
    setCustomerr(newArray);

    let AllCar =JSON.parse(localStorage.getItem("Car"));
    
    let newCar =AllCar.map((e)=>{
      if ( e.owner ==user.id) {
          let newnew = { 
            id:e.id ,
            name:e.name, 
            title:e.title,
            model:e.model, 
            price:e.price, 
            vailable:false, 
            owner:-1, 
            imageUrl:e.imageUrl
           }

           return newnew ; 
        }else {
          return e; 
        }
    })

    console.log("newCar = " , newCar);

    localStorage.setItem("Car", JSON.stringify(newCar)); 
    
  };

  const handleEdit = () => {
    
    localStorage.setItem("Edite", false);
    let ShowCar = JSON.parse(localStorage.getItem("Car"));
    let RentCustomer = ShowCar.filter(
      (e) => e.owner==user.id
    );
    localStorage.setItem("RentCustomer",JSON.stringify(RentCustomer)); 
    navigate("/EditeCustomer", {
      state: {
        user,
        RentCustomer: RentCustomer,
        indexx: index,
      },
    });

  };

  const handleViewCars = () => {
    localStorage.setItem("Edite", true);

    let ShowCar = JSON.parse(localStorage.getItem("Car"));
    let RentCustomer = ShowCar.filter(
      (e) => e.owner==user.id
    );
    localStorage.setItem("RentCustomer",JSON.stringify(RentCustomer)); 
    navigate("/EditeCustomer", {
      state: {
        user,
        RentCustomer: RentCustomer,
        indexx: index,
      },
    });

  };

  return (
    <div className="bg-white overflow-hidden p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div className="flex items-center mb-6">
      <img
          src={user.imagUrl==null ?"https://cdn-icons-png.flaticon.com/512/2919/2919600.png": user.imagUrl}
          alt={user.name}
          className="w-20 h-20 rounded-full border-4 border-gray-200 shadow-lg mr-6"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
          <p className="text-gray-500 text-xs">{user.Email}</p>
        </div>
      </div>
      <div className="flex justify-around mt-4 gap-2">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white  px-3 py-1.5 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition-all duration-200 transform hover:scale-100 h-12 text-xs w-20 font-bold"
      
    >
          حذف
        </button>
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white px-3 py-1.5 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-200 transform hover:scale-100 h-12 text-xs w-20 font-bold"
        >
          تعديل
        </button>
        <button
          onClick={handleViewCars}
          className="bg-green-500 text-white px-3 py-1.5 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transition-all duration-200 transform hover:scale-100 h-12 text-xs w-20 font-bold"
        >
          عرض 
        </button>
      </div>
    </div>
  );
}

export default UserCard;
