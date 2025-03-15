import {  useState } from "react";
import { useLocation } from "react-router-dom";
import Error from "../../Error";
import { useNavigate } from "react-router-dom";

 function EditeCustomer() {
  const location = useLocation();
  let { user, RentCustomer, indexx } = location.state;
  let [arryCarCustomer,setArryCarCustomer] = useState(JSON.parse(localStorage.getItem("RentCustomer")) ) ; 
  const navigate = useNavigate();
  
  const [formInput, setFormInput] = useState({
    name:user.name , 
    Email:user.Email, 
    Password:user.Password, 
    imagUrl:user.imagUrl
  });

  if (localStorage.getItem("Login") !== "Admin") {
    return <Error />;
  }
  
  
  localStorage.setItem("Clint","Clint"); 



  let showOrEdite = localStorage.getItem("Edite");
  showOrEdite == "true" ? (showOrEdite = true) : (showOrEdite = false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">  {showOrEdite ? "عرض المستخدم" : " تعديل على المستخدم"}</h1>
        <form>
          <div>
            <label className="block text-gray-700 font-medium">
              اسم المستخدم
            </label>
            <input
            disabled={showOrEdite}
              onChange={(e) =>
                setFormInput({ ...formInput, name: e.target.value })
              }
              value={formInput.name}
              type="text"
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="اسم المستخدم"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              ايميل المستخدم
            </label>
            <input
            disabled={showOrEdite}
              onChange={(e) =>
                setFormInput({ ...formInput, Email: e.target.value })
              }
              type="email"
              value={formInput.Email}
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="ايميل المستخدم"
            ></input>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">كلمة المرور</label>
            <input
              onChange={(e) =>
                setFormInput({ ...formInput, Password: e.target.value })
              }
              disabled={showOrEdite}
              value={formInput.Password}
              type="text"
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="كلمة المرور"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              رابط الصورة
            </label>

            <input
            disabled={showOrEdite}
              onChange={(e) =>
                setFormInput({ ...formInput, imagUrl: e.target.value })
              }
              value={formInput.imagUrl}
              type="text"
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="رابط الصورة"
            />
          </div>

          <br />
          <button
            className="w-full px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
              onClick={(e)=>{
                e.preventDefault();
                  if ( showOrEdite){
                    
                  let newUser = JSON.parse(localStorage.getItem("Customer"));
                  newUser[indexx] = {
                      Card:newUser.Card, 
                      name:formInput.name,
                      Email : formInput.Email, 
                      Password:formInput.Password , 
                      imagUrl:formInput.imagUrl,
                      id:user.id,
                  }
                  localStorage.setItem("Customer", JSON.stringify(newUser));

                  }
                  navigate("/");
              }}
        >
            {showOrEdite?"الرجوع للخلف":"تعديل"}
          </button>

            <br/><br />
              <h1 style={{textAlign:"center", fontSize:"25px" , fontWeight:"bold" , margin:"21px"}}>السيارات المملوكة </h1>
            <div className="flex flex-wrap gap-2 justify-center items-center ">
              {arryCarCustomer.map((e ,index )=>{
                  return(
                    <div className={`w-60 p-4 bg-white shadow-lg rounded-2xl flex flex-col  items-center ${showOrEdite?"opacity-60":"opacity-100"}`}>
                        <img
                          src={e.imageUrl}
                          alt="Profile"
                          className="w-24 h-24 rounded-full object-cover mb-3"
                        />
                        
                        <h2 className="text-lg font-semibold">{e.name}</h2>
                        <button className="mt-2 px-2 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-700 transition"
                          disabled={showOrEdite}
                          onClick={(ee)=>{
                            ee.preventDefault() ; 

                              // Array Car //  Id Of User // 

                              
                            

                              let newCard = user.Card.filter((ee)=>ee!=e.id);
          
                              let newUser =  {
                                id:user.id,name:user.name ,
                                Email:user.Email ,
                                Password:user.Password,
                                Card:newCard ,
                                imagUrl :user.imagUrl
                              }

                              let arr3 = JSON.parse((localStorage.getItem("Customer")));  
                              let allCustomerss = arr3.map((ee)=>{
                                if ( ee.id != user.id ){
                                  return ee ; 
                                }else {
                                  return newUser;
                                }
                              })
                              localStorage.setItem("Customer" ,JSON.stringify(allCustomerss)); 
                              
                          let arr2 =JSON.parse(localStorage.getItem("Car"));
                          
                          let ret ={
                            id:e.id,name:e.name , model:e.model, 
                            imageUrl:e.imageUrl,
                            price:e.price,
                            available:false,
                            owner:-1, 
                            title:e.title
                          }; 

                          let newArrayt = arr2.map((eee)=>{
                            if ( eee.id == e.id) {
                              return ret ;  
                            }else {
                              return eee; 
                            }
                          })
                          
                            localStorage.setItem("Car", JSON.stringify(newArrayt));
                            let newnew = JSON.parse(localStorage.getItem("Car")) ; 
                            let newnewnew = newnew.filter((e)=>e.owner==user.id);
                            setArryCarCustomer (newnewnew) ;

                          }}
                        >
                          سحب السيارة
                        </button>
                    </div>
                    
                  );
              })}
        </div>
          


              <br></br>

          

        </form>
      </div>
    </div>
);
}



export default EditeCustomer; 