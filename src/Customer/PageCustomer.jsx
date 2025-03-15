import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PageCustomer() {
  const navigate = useNavigate();
  let User = JSON.parse(localStorage.getItem("UserLogin")) ; 
  let Carsss=JSON.parse(localStorage.getItem("Car"));
  let PageCustomer = localStorage.getItem("PageCustomer"); 
  const cares = Carsss.filter((e)=>e.owner==User.id); 
  const [caress , setcaress] = useState(cares) ; 

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden p-6">
      <button 
      onClick={()=>{
        navigate("/");
      }}>الرجوع للخلف</button>
    

    {PageCustomer =="true" ? 
      <div className="flex flex-col items-center">
        <img
          src={User.imagUrl}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-gray-200 shadow-md"
        />
        <h2 className="text-2xl font-bold mt-4">{User.name}</h2>
        <p className="text-gray-500">{User.Email}</p>
      </div>

:<></> }
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center"> سيراتي</h2>
        {caress.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caress.map((car) => (
              <div key={car.id} className="p-4 border rounded-lg shadow-md bg-gray-100 text-center">
                <img src={car.imageUrl} alt={car.name} className="w-full h-32 object-cover rounded-md mb-2" />
                <h3 className="font-semibold text-lg">car.brandcar.model</h3>
                <p className="text-gray-600">سنة الصنع: {car.model}</p>

                <button className="bg-red-400 m-3 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-900"
                    onClick={()=>{ 

                        let AllCustomer = JSON.parse(localStorage.getItem("Customer"));
                        let Carrd = User.Card ; 
                        let NewCard = Carrd.filter((e)=>e!=car.id);
                        const newAll = AllCustomer.map((e)=>{
                          if (e.id==User.id){
                              return {
                                id:e.id,
                                name:e.name,
                                Email:e.Email,
                                Password:e.Password,
                                Card:NewCard,
                                imagUrl:e.imagUrl 
                              }
                          }else {
                            return e ; 
                          }
                        })
                        localStorage.setItem("Customer" , newAll ) ;

                      let AllCar = JSON.parse(localStorage.getItem("Car")) ;
                      const NewAllCar = AllCar.map((e)=>{
                        if ( e.id == car.id){
                              return { 
                                id: car.id,
                                imageUrl: car.imageUrl,
                                model: car.model,
                                name: car.name,
                                title: car.title,
                                price: car.price,
                                available:false,
                                owner: -1,
                              }
                        }else {
                          return e ; 
                        }
                      })

                      //ReaLTime 
                      localStorage.setItem("Car", JSON.stringify(NewAllCar));
                      const newnew = NewAllCar.filter((e)=>e.owner==User.id);
                      setcaress(newnew);


                    }}
                
                >ازالة</button>


                
                
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">لا يوجد لديك سيارات مسجلة.</p>
        )}
      </div>
    </div>
  );
};

export default PageCustomer;
