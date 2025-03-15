import { useNavigate } from "react-router-dom";

export default function Error() {
   const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-red-600">403</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mt-2">غير مسموح بالدخول</h2>
        <p className="text-gray-600 mt-2">ليس لديك الصلاحيات للوصول إلى هذه الصفحة.</p>
        <button 
          onClick={() => {
            localStorage.setItem("Login", false) ;
            navigate("/");
          }}
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition">
          العودة إلى الصفحة الرئيسية
        </button>
      </div>
    </div>
  );
}
