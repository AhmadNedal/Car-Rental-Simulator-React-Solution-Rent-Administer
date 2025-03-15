import { useState } from "react";
import { useLocation } from "react-router-dom";
import Error from "./Error";
import { useNavigate } from "react-router-dom";



function AddNewCar() {

  const navigate = useNavigate();

  const [formInput, setFormInput] = useState({
    title:  "",
    name:  "",
    model: "",
    imageUrl:  "",
    price:  "",
    available:  false, 
    owner:-1
  });



  if (localStorage.getItem("Login") !== "Admin") {
    return <Error />;
  }




  function AddCar(e) { 
    e.preventDefault();

    let arr =JSON.parse(localStorage.getItem("Car"));
    let EleAdd = {
      id:crypto.randomUUID(),
      name:formInput.name , model:formInput.model, 
      imageUrl:formInput.imageUrl,
      price:formInput.price,
      available:formInput.available,
      owner:formInput.owner, 
      title:formInput.title

    }
    arr.push(EleAdd); 
    console.log ("arrayyy yAfter Add = " , arr ) ;
      localStorage.setItem("Car", JSON.stringify(arr)); 

      navigate("/"); 
  }


  return (
    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">اضافة سيارة</h1>
        <form>
          <div>
            <label className="block text-gray-700 font-medium">اسم السيارة</label>
            <input
              onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
              value={formInput.name}
              type="text"
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="اسم السيارة"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">وصف السيارة</label>
            <textarea
              onChange={(e) => setFormInput({ ...formInput, title: e.target.value })}
              value={formInput.title}
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="وصف السيارة"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">السعر</label>
            <input
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
              onChange={(e) => setFormInput({ ...formInput, imageUrl: e.target.value })}
              value={formInput.imageUrl}
              type="text"
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="رابط الصورة"/>
          </div>

        <br />  
          <button className="w-full px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
            onClick={AddCar}
          >
          
           اضافة
          </button>
        </form>
      </div>
    </div>
  

  )
}

export default AddNewCar
