import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditCar from "./PageCar/EditeCar";
import CarStructure from "../Model/ObjectCar";
import allCar from "../Model/AllCar";
import { ContextAdmin } from "../App";
import allCustomers from "../Model/AllCustomers";
import ShowCustomers from "./ShowCustomers";
import EditeCar from "./PageCar/EditeCar";
import Error from "../Error";

export default function AdminDashboard() {
  let { array, setArray } = useContext(ContextAdmin);
  let ShowCustomer = JSON.parse(localStorage.getItem("Customer"));

  const navigate = useNavigate();
  let ele = localStorage.getItem("Login");
  let [active, setActive] = useState("عرض الكل");
  let [showCu, setShowCu] = useState(false);
  
  let froms = localStorage.getItem("Clint") ; 
console.log("Froms = " , froms );

  if ( froms == "Clint") {
    localStorage.setItem("Clint","false") ; 
    setShowCu(true); 
    setArray(ShowCustomer);
    setActive("عرض العملاء")
  }
  

  
  function AddnewCar() {
    if (showCu){
        navigate("AddNewCustomer");
      }else {
        navigate("AddNewCar");
      }
  }

  return (
    <>
      {ele != "Admin" ? (
        <Error />
      ) : (
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-600">
              لوحة تحكم المسؤول
            </h1>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              onClick={()=>{
                navigate("/");
                localStorage.setItem("Login", false);

              }}

            >
              تسجيل الخروج
            </button>
          </nav>
          <section className="p-8 flex flex-col items-center">
            <div className="flex justify-center gap-2 flex-wrap">
              <button
                className={` ${
                  active == "عرض العملاء" ? "bg-zinc-600" : "bg-zinc-400"
                }  text-white px-4 py-2 rounded-lg hover:bg-zinc-600 transition`}
                onClick={() => {
                  let arr = JSON.parse(localStorage.getItem("Customer"));
                  setArray(arr);
                  setShowCu(true);
                  setActive("عرض العملاء");
                }}
              >
                عرض العملاء
              </button>

              <button
                className={` ${
                  active == "المستأجرة" ? "bg-zinc-600" : "bg-zinc-400"
                }  text-white px-4 py-2 rounded-lg hover:bg-zinc-600 transition`}
                onClick={() => {

                  let arr = JSON.parse(localStorage.getItem("Car"));
                  let newArray = arr.filter((e) => (e.available) );
                  setArray(newArray);
                  setShowCu(false);
                  setActive("المستأجرة");
              
                }}
              >
                المستأجرة
              </button>

              <button
                className={` ${
                  active == "غير مستأجرة" ? "bg-zinc-600" : "bg-zinc-400"
                }  text-white px-4 py-2 rounded-lg hover:bg-zinc-600 transition`}
                onClick={() => {
                  let arr = JSON.parse(localStorage.getItem("Car"));
                  let newArray = arr.filter((e) => !e.available);
                  setArray(newArray);
                  setShowCu(false);
                  setActive("غير مستأجرة");
                }}
              >
                غير مستأجرة
              </button>

              <button
                className={` ${
                  active == "عرض الكل" ? "bg-zinc-600" : "bg-zinc-400"
                }  text-white px-4 py-2 rounded-lg hover:bg-zinc-600 transition`}
                onClick={() => {
                  setArray(allCar);
                  setShowCu(false);
                  setActive("عرض الكل");
                }}
              >
                عرض الكل
              </button>
            </div>

            {showCu ? (
              <ShowCustomers />
            ) : (
              <>
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
                  {array.map((car, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2"
                    >
                      <img
                        src={car.imageUrl}
                        alt={car.name}
                        className="w-full h-48 object-cover rounded-md"
                      />

                      <div className="flex items-center justify-between w-full ">
                        <h3 className="text-2xl font-semibold mt-4 text-gray-800">
                          {car.name}{" "}
                          <span className="text-sm text-gray-500">
                            {" "}
                            ({car.model})
                          </span>
                        </h3>
                        <img
                          className="w-7 mt-6"
                          src={
                            car.available
                              ? require("../images/sold-out.png")
                              : require("../images/available.png")
                          }
                          alt=""
                        />
                      </div>

                      <p className="text-gray-600 text-lg">
                        ${car.price} / اليوم
                      </p>
                      <div className="mt-4 flex justify-between">
                        <button
                          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                          onClick={() => {
                            localStorage.setItem("Edite", false);
                            let RentCustomer = ShowCustomer.filter(
                              (e) => e.id == car.owner
                            );
                            navigate("/EditCar", {
                              state: {
                                car,
                                RentCustomer: RentCustomer[0],
                                index: index,
                              },
                            });
                          }}
                        >
                          تعديل
                        </button>

                        <button
                          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                          onClick={() => {
                            localStorage.setItem("Edite", true);
                            let newAllCustomer =JSON.parse(localStorage.getItem("Customer")); 
                            let RentCustomer = newAllCustomer.filter(
                              (e) => e.id == car.owner
                            );

                            if ( RentCustomer.length <0) {
                                navigate("/Error");
                            }else {
                            navigate("/EditCar", {
                              state: {
                                car,
                                RentCustomer: RentCustomer[0],
                                index: index,
                              },
                            });
                          }
                          }}
                        >
                          عرض
                        </button>

                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                          onClick={() => {
                            let newArray = JSON.parse(
                              localStorage.getItem("Car")
                            ).filter((e) => e.id != car.id);
                            setArray(newArray);

                            let DeleteCustomer = JSON.parse(
                              localStorage.getItem("Customer")
                            ).filter((e) => e.id == car.owner);

                            if (
                              DeleteCustomer != null ||
                              DeleteCustomer != []
                            ) {
                              var DeleteCustomerss = JSON.parse(
                                localStorage.getItem("Customer")
                              ).map((e) => {
                                if (e.id == car.owner) {
                                  let newCard = e.Card.filter(
                                    (num) => num !== car.id
                                  );
                                  let newwArray = {
                                    id: e.id,
                                    name: e.name,
                                    Email: e.Email,
                                    Password: e.Password,
                                    Card: newCard,
                                    imageUrl: e.imageUrl,
                                  };
                                  return newwArray;
                                } else {
                                  return e;
                                }
                              });
                            }

                            localStorage.setItem(
                              "Car",
                              JSON.stringify(newArray)
                            );
                            localStorage.setItem(
                              "customer",
                              JSON.stringify(DeleteCustomerss)
                            );
                          }}
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  
                </div>
              </>
            )}
            <button
                    className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
                    onClick={AddnewCar}
                  >
                  
                  {showCu ? "إضافة مستخدم جديد" : "إضافة سيارة جديدة"}

                  </button>
          </section>
        </div>
      )}
    </>
  );
}
