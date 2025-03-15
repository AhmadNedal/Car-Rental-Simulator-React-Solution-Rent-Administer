import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function Guarantee() {

  let User = JSON.parse(localStorage.getItem("UserLogin")); 
  const location = useLocation();
  const navigate = useNavigate(); 
  let [ShowImage  , setShowImage ] = useState(false); 

  let car = location.state;

  function ShowGuarantee() {
    return  (
      <div className='flex flex-col justify-center items-center gap-7'>
      <div className="p-6 mt-16 max-w-xl mx-auto bg-white shadow-lg rounded-lg" dir="rtl">
        <h1 className="text-right text-xl font-semibold mb-6">سند تعهد وكفالة</h1>
        <div className="mb-4 text-right">
          <p><strong>اسم صاحب السيارة:</strong> {User ? User.name : "غير متوفر"}</p>
          <p><strong>رقم الحساب:</strong> {User ? User.id : "غير متوفر"}</p>
          <p><strong>تاريخ التعهد:</strong> {new Date().toLocaleDateString()}</p>
        </div>
  
        <h2 className="text-right text-lg font-semibold mb-4">تفاصيل السيارة:</h2>
        <div className="mb-4 text-right">
          <p><strong>اسم السيارة:</strong> {car.name}</p>
          <p><strong>وصف السيارة:</strong> {car.title}</p>
          <p><strong>سنة الصنع:</strong> {car.model}</p>
          <p><strong>رقم اللوحة:</strong> {car.id}</p>
          <p><strong>السعر لليوم الواحد:</strong> <span style={{color:"red", fontWeight:"bold"}}>${car.price} </span></p>
          <p><strong>صورة السيارة:</strong> <button onClick={()=>{
            setShowImage(!ShowImage) ;
          }} style={{textDecoration:"underline" , cursor:"pointer" }}>اضغط هنا</button></p>
        </div>
  
        <div className="text-right mt-6">
          <p>أتعهد بتعهد وكفالة هذه السيارة وفقاً للشروط والأحكام.</p>
        </div>
  
      </div>
  
      
            <button className='bg-red-500 hover:bg-red-900 rounded-lg px-5 py-2 text-white duration-300'
              onClick={()=> {
                  let AllCarr = JSON.parse(localStorage.getItem("Car")); 
                  let Caa = {
                    id:car.id , 
                    title:car.title,
                    name:car.name ,
                    model:car.model, 
                    imageUrl:car.imageUrl, 
                    price:car.price ,
                    available:true, 
                    owner :User.id
                  }; 
                  
                  let newAllCar = AllCarr.map((e)=> {
                      if ( e.id == car.id ) {
                          return Caa ;

                      }else {
                          return e ;
                      }
                  });
                  localStorage.setItem("Car", JSON.stringify(newAllCar)); 

                  let AllUsers = JSON.parse(localStorage.getItem("Customer")); 
                  let newAllUsers = AllUsers.map((e)=> {
                      if ( e.id == User.id ) {
                        let newC= e.Card; 
                        newC.push(car.id) ; 
                        return {
                          id:User.id , 
                          name:User.name ,
                          Email:User.Email, 
                          Password :User.Password,
                          Card : newC, 
                          imageUrl:car.imageUrl, 
                          };
                      }else {
                          return e ;
                      }
                  });
                  console.log ("newAllUser = " , newAllUsers )
                  localStorage.setItem("Customer", JSON.stringify(newAllUsers)); 
                  
                  navigate("/");
                }}
            
            >
            تأكيد الحجز
            </button>
              
    </div>

    );
  }




  return (
    <>
    {ShowImage? <FunctionShowImage/> : <ShowGuarantee/> }
    </>
  );


  
function FunctionShowImage() { 
  return (
    <div className='flex flex-col justify-center items-center'>
    
      <img src={car.imageUrl}/>
      
      <button className='bg-red-500 hover:bg-red-900 mb-10 rounded-lg px-5 py-2 text-white duration-300'
        onClick={()=> {
          setShowImage(!ShowImage) ;
        }}
      >
          الرجوع لسند الكفالة
      </button>
    </div>
  )
}


}

export default Guarantee;
