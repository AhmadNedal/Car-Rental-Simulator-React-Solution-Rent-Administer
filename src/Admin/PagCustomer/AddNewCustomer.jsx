import { useState } from "react";
import Error from "../PageCar/Error";
import { useNavigate } from "react-router-dom";

function AddNewCustomer() {

  const navigate = useNavigate();

  const [formInput, setFormInput] = useState({
    name:"" , 
    Email:"", 
    Password:"", 
    imagUrl:""
  });

  if (localStorage.getItem("Login") !== "Admin") {
    return <Error />;
  }

  function AddCar(e) {
    e.preventDefault();

    let arr = JSON.parse(localStorage.getItem("Customer"));
    let EleAdd = {
      id: crypto.randomUUID(),
      name: formInput.name,
      imagUrl: formInput.imagUrl,
      Email: formInput.Email,
      Password: formInput.Password,
      Card:[]
    };
    arr.push(EleAdd);
    localStorage.setItem("Customer", JSON.stringify(arr));
    navigate("/");

  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">اضافة مستخدم جديد</h1>
        <form>
          <div>
            <label className="block text-gray-700 font-medium">
              اسم المستخدم
            </label>
            <input
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
              value={formInput.Password}
              type="password"
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="كلمة المرور"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              رابط الصورة
            </label>

            <input
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
            onClick={AddCar}
          >
            اضافة
          </button>
        </form>
      </div>
    </div>
  );
  
}

export default AddNewCustomer;
