import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imagUrl, setimagUrl] = useState("");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = (password) => password.length >= 6;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">إنشاء حساب</h2>


        <form className="space-y-4">
          <input
            type="text"
            placeholder="الاسم الكامل"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="كلمة المرور"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="text"
            placeholder="رابط الصورة"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={imagUrl}
            onChange={(e) => setimagUrl(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={!name || !email || !password }
            onClick={(e)=>{
              e.preventDefault(); 
                let user = JSON.parse(localStorage.getItem("Customer")); 
                let newUsers = user; 
                let ele = {
                  id:crypto.randomUUID(),name:name ,Email:email, Password:password,Card:[]  ,
                  imagUrl :imagUrl
                }
                newUsers.push( ele ) ; 
                localStorage.setItem("Customer",JSON.stringify(newUsers)) ; 
                navigate("/");
            }
            }
          >
            تسجيل حساب
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          لديك حساب بالفعل؟{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            تسجيل الدخول
          </span>
        </p>
      </div>
    </div>
  );
}
