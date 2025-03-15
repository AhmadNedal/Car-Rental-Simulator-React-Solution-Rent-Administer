import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import Error from "./Error";
import { useNavigate } from "react-router-dom";
import { ContextAdmin } from "../../App";

export default function EditCar() {
  const location = useLocation();
  const {car , RentCustomer , index }  = location.state;
  let Car = car; 
  let [DeleteO , setDeleteO] =useState(false);
    let { array, setArray} = useContext(ContextAdmin);
  const navigate = useNavigate();

  const [formInput, setFormInput] = useState({
    title: Car?.title || "",
    name: Car?.name || "",
    model: Car?.model || "",
    imageUrl: Car.imageUrl || "",
    price: Car?.price || "",
    available: Car?.available || false, 
    owner: Car?.owner|| "غير مستأجرة"
  });


  let showOrEdite  =localStorage.getItem("Edite") ;
  showOrEdite=="true"?showOrEdite=true : showOrEdite=false ;
  if (localStorage.getItem("Login") !== "Admin" || !Car) {
    return <Error />;
  }


  function SaveEdite(hh){ 
    if ( !showOrEdite){
      hh.preventDefault();
      console.log ("Deleteo = " , DeleteO ) ;
      if (DeleteO) {
            let newCard = RentCustomer.Card.filter((e)=>e!=Car.owner);
            let newUser =  {
              id:RentCustomer.id,name:RentCustomer.name ,
              Email:RentCustomer.Email ,
               Password:RentCustomer.Password,
               Card:newCard ,
              imagUrl :RentCustomer.imagUrl
          
            }
            let arr = JSON.parse((localStorage.getItem("Customer")));  
            let allCustomerss = arr.map((e)=>{
              if ( e.id !=Car.owner ){
                return e ; 
              }else {
                return newUser;
              }
             })
            localStorage.setItem("Customer" ,JSON.stringify(allCustomerss)); 
            
        let arr2 =JSON.parse(localStorage.getItem("Car"));
        
        let ret ={
          id:Car.id,name:formInput.name , model:formInput.model, 
          imageUrl:formInput.imageUrl,
          price:formInput.price,
          available:false,
          owner:-1, 
          title:formInput.title
        }; 

        let newArrayt = arr2.map((eee)=>{
          console.log ( "eee.id  = " , eee.id , "  Car.id = ",Car.id)
          if ( eee.id == Car.id) {
            return ret ;  
          }else {
            return eee; 
          }
        })
        
          localStorage.setItem("Car", JSON.stringify(newArrayt)); 
          setArray(newArrayt);

        }else {
      
          let arr2 =JSON.parse(localStorage.getItem("Car"));
          let ret ={
            id:Car.id,name:formInput.name , model:formInput.model, 
            imageUrl:formInput.imageUrl,
            price:formInput.price,
            available:false,
            owner:-1, 
            title:formInput.title
          }; 
  
          let newArrayt = arr2.map((eee)=>{
            console.log ( "eee.id  = " , eee.id , "  Car.id = ",Car.id)
            if ( eee.id == Car.id) {
              return ret ;  
            }else {
              return eee; 
            }
          })
            localStorage.setItem("Car", JSON.stringify(newArrayt)); 
            setArray(newArrayt);

        }
          
      

        navigate("/") ;

    }else {
      navigate("/")
    }

  }

  function EditRentCar(){
    return (

      
      <div className="pb-6 pt-8 flex flex-row-reverse justify-center items-center w-full gap-10 overflow-hidden">
          <h1> { Car.owner!=-1&&car.available&&RentCustomer.Card!=null ?" : مستأجرة لصالح":"غير مستأجرة"}</h1>
      <h1>Hello Every One </h1>



       {Car.owner!=-1&&car.available&&RentCustomer.Card!=null  ? 
        
        <div className={`bg-white shadow-lg rounded-2xl p-4 flex items-center space-x-4 ${DeleteO?"opacity-30":"opacity-100"}`}>
          <img
            src={RentCustomer.imagUrl}
            alt="User Avatar"
            className="w-16 h-16 rounded-full border-2 border-gray-300"/>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{RentCustomer.name}</h2>
            <p className="text-gray-500 text-sm">{RentCustomer.Email}</p>
          </div>
      </div>
            :<></> 
            
          }
    

       
    {(!showOrEdite) && (Car.owner!=-1&&car.available&&RentCustomer.Card!=null ) ?
            <buttom className={`${DeleteO?"bg-green-500":"bg-red-500" } text-white px-3 py-1 rounded-lg hover:bg-red-600 transition cursor-pointer`}
            onClick={()=>{setDeleteO(!DeleteO);}} > {DeleteO ? "تم السحب " :"سحب السيارة" } </buttom>:<></> }
     

      </div>
)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{showOrEdite ?"عرض السيارة": " تعديل على سيارة" }</h1>
        <form>
          <div>
            <label className="block text-gray-700 font-medium">اسم السيارة</label>
            <input
              onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
              value={formInput.name}
              type="text"
              disabled={showOrEdite}
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="اسم السيارة"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">وصف السيارة</label>
            <textarea
              disabled={showOrEdite}
              onChange={(e) => setFormInput({ ...formInput, title: e.target.value })}
              value={formInput.title}
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="وصف السيارة"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">السعر</label>
            <input
              disabled={showOrEdite}
              onChange={(e) => setFormInput({ ...formInput, price: e.target.value })}
              value={formInput.price}
              type="number"
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="السعر"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">تاريخ الصنع</label>
            <input
              disabled={showOrEdite}
              onChange={(e) => setFormInput({ ...formInput, model: e.target.value })}
              value={formInput.model}
              min="1900"
              max="2100"
              type="number"
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="تاريخ الصنع"
            />
          </div>
          <div>

            <label className="block text-gray-700 font-medium">رابط الصورة</label>
            
            <input
              disabled={showOrEdite}
              onChange={(e) => setFormInput({ ...formInput, imageUrl: e.target.value })}
              value={formInput.imageUrl}
              type="text"
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="رابط الصورة"/>
          </div>
      {car.owner!=-1&&car.available&&RentCustomer.Card!=null&&RentCustomer.Card.length>0? <EditRentCar/>: <h1>لا يوجد سيارات</h1>}
      
        <br />  
          <button
            className="w-full px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
            onClick={SaveEdite}
          >
          {showOrEdite?"الرجوع للخلف" :"  حفظ التعديلات"}

          
          </button>
        </form>
      </div>
    </div>
  );
}