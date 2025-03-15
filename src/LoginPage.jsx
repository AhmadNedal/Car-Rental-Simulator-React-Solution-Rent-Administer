import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function LoginPage() {
  const [Email,setEmail]    = useState("") ; 
  const [Password,setPassword] = useState("") ; 
  const [bool,setBool ]  = useState(true) ; 
  const [hint,setHint ]  = useState(true) ; 
  const navigate = useNavigate();



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{bool?"تسجيل الدخول كعميل":"تسجيل الدخول كأدمن "}</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">البريد الإلكتروني</label>
            <input 
            value ={Email}
            onChange={(e)=>{
                setEmail(e.target.value ) ; 
                setHint("");

            }}
              type="email" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder= {bool ? "" : "admin@admin.com"}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">كلمة المرور</label>
            <input 
            value ={Password}
            onChange={(e)=>{
                setPassword(e.target.value ) ; 
                setHint("");
            }}
              type="password" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder={bool ? "" :"admin123"}
            />
          </div>
          <button 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            
            onClick={()=> { 
              
              if ( bool ) { 
                let user = JSON.parse(localStorage.getItem("Customer")); 
                let newuser = user.filter((e)=> { 
                    if (e.Email == Email.toLocaleLowerCase().trim() && e.Password == Password.toLocaleLowerCase().trim()){
                        return true ;
                    }
                    return false ; 
                })


                if (newuser.length>0) {
                  localStorage.setItem( "UserLogin" , JSON.stringify (newuser[0])); 
                    localStorage.setItem("Login" , "Customer") ;
                    window.location.reload();
                    navigate("/"); 
                }else {
                  setHint("كلمة السر او الايميل خطأ")
                }

                
                
                // if ( Email.toLocaleLowerCase().trim() == "customer@customer.com" && Password.toLocaleLowerCase().trim() == "customer123") {
                //       localStorage.setItem("Login" , "Customer") ; 
                //       navigate("/"); 
                //   }else {
                //       setHint("كلمة السر او الايميل خطأ")
                //   }





              }else {
                if ( Email.toLocaleLowerCase().trim() == "admin@admin.com" && Password.toLocaleLowerCase().trim() == "admin123") {
                  localStorage.setItem("Login" , "Admin") ; 
                  navigate("/Admin"); 

                }else {
                    setHint("كلمة السر او الايميل خطأ")
                }
              }
            }}
          
          >

          
            تسجيل الدخول
          </button>
          <p className="text-center text-red-500 text-xs mt-3"> {hint}</p>
        <p className="text-center text-gray-600 text-sm mt-4">
         <button onClick={()=> {
          setBool(!bool); 
         }} className="text-blue-500 hover:underline">{bool ? "تسجيل الدخول كأدمن" : "تسجيل الدخول كعميل"}</button>
        </p>
        <button style={{textAlign:"center",margin:"10px" , width:"100%"}} onClick={()=>navigate("/SignUp")}>انشاء حساب </button>
      </div>
    </div>
  );
}


export default LoginPage ; 
