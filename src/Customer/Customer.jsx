import { useState } from "react";
import Error from "../Error";
import { useNavigate } from "react-router-dom";


export default function CarRentalHome() {

  const [selectedOption, setSelectedOption] = useState('مميزة');
  const [cars,setCars] = useState(JSON.parse(localStorage.getItem("Car")));
  const [HowshowCar , setHowshowCar] = useState(true); 
  const navigate = useNavigate();


  if ( HowshowCar ){ 
    let newCars = cars.filter((e , index)=> {
      return (index%2 && !e.available);
    })
    setCars(newCars); 
    setHowshowCar(false);
  }

  const handleChange = (event) => {
    if ( event.target.value.trim() == "مميزة") {
      let newCars = JSON.parse(localStorage.getItem("Car")).filter((e , index)=> {
        return (index%2 && !e.available);
      })
      setCars(newCars); 
    }else if ( event.target.value.trim() == "عرض الكل") {
      setCars(JSON.parse(localStorage.getItem("Car")));
    }else if ( event.target.value.trim() == "متاحة") { 
      let newCars=JSON.parse(localStorage.getItem("Car")).filter((e,index)=>{ 
        return (!e.available);
      })
      setCars(newCars); 
    }
    setSelectedOption(event.target.value);
  };

  let User = JSON.parse(localStorage.getItem("UserLogin")) ; 
    if(localStorage.getItem("Login")!="Customer" || User==null ) { 
      return <Error/>
    }


  
    

    
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Car Rental</h1>
        
        <div className="flex flex-row-reverse gap-2 items-center space-x-4">

            <img onClick={()=>{
              let ele = document.getElementById("ShowNav") ; 
              if (ele.style.display=="flex" ){
                ele.style.display= "none"; 
              }else {
              ele.style.display="flex";
              } 
            }} src={User.imagUrl} alt="User" className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer" />
            <button className="bg-white text-blue-600 text-sm px-2 py-1 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={()=>{
                localStorage.setItem("Login", false) ;
                window.location.reload();
                navigate("/");

              }}
            >
              تسجيل الخروج
            </button>
          </div>
      </nav>

    {/* ShowNav */}
      
    <div id="ShowNav" style={{position:"absolute" ,  display:"none",flexDirection:"column", gap:"10px" ,  top:"70px " , borderRadius:"7px", right:"10px" , background:"white" , padding:"10px"}}>
            <button 
              onClick={()=>{
                  localStorage.setItem("PageCustomer" , "true") ; 
                  navigate("/PageCustomer");
              }}
            > عرض  الملف الشخصي </button>
            
            <button
              onClick={()=>{
                localStorage.setItem("PageCustomer" , "false") ; 
                navigate("/PageCustomer");
              }}
            > سياراتي </button>
      </div>

      {/* قسم العنوان */}
      
      <header className="text-center py-20 bg-blue-500 text-white">
        <h2 className="text-4xl font-bold mb-4">استأجر سيارتك بكل سهولة!</h2>
        <p className="text-lg mb-6">ابحث عن السيارة المناسبة لاحتياجاتك بأسعار مميزة.</p>
        <button 
          onClick={()=>{
            navigate("/CarSearch")
          }}
        className="bg-white text-blue-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200">
          ابحث عن سيارة
        </button>
      </header>


      




      <section className="p-8">
        <div className="flex mb-10 gap-1 items-center w-full flex-row-reverse flex-wrap mr-64 justify-center">

        <h3 className="text-2xl font-bold text-center mb-6">السيارات المميزة</h3>
        <div className="w-44">
        <select
          id="option"
          value={selectedOption}
          onChange={handleChange}
          className="block w-full px-4 py-2 border rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="مميزة">مميزة</option>
          <option value="متاحة">متاحة</option>
          <option value="عرض الكل">عرض الكل</option>

        </select>
      </div>


        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cars.map((car, index) => (
            <div key={index} className={`bg-white p-4 rounded-lg shadow-md ${car.available?"opacity-55":"opacity-100"}`}>
              <img src={car.imageUrl} alt={car.name} className="w-full h-40 object-cover rounded-md" />
              <h4 className="text-xl font-semibold mt-3">{car.name}</h4>
              <p className="text-gray-600">{car.price} / اليوم</p>
              <button disabled={car.available} className={`mt-3  text-white px-4 py-2 rounded-lg ${car.available?"opacity-55 bg-red-500":"hover:bg-blue-600 bg-blue-500"}`}
                  onClick={()=>{
                  navigate("Guarantee", { state : car });
                  }}
              
              >
               {car.available?"مستأجرة" :" احجز الآن"}
              </button>
            </div>
          ))}
        </div>
      </section>




      <section className="p-8 bg-white">
        <h3 className="text-2xl font-bold text-center mb-6"> الأسئلة الشائعة</h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold">{faq.question}</h4>
              <p className="text-gray-600 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

    
      <section className="p-8 bg-gray-200 text-center">
        <h3 className="text-2xl font-bold mb-4">📞 تواصل معنا</h3>
        <p>📧 البريد الإلكتروني: ahmadnedall80@shop.com</p>
      </section>
    </div>
  );
}



const faqs = [
  { question: "كيف يمكنني استئجار سيارة؟", answer: "يمكنك البحث عن السيارة المناسبة ثم النقر على 'احجز الآن' لإتمام العملية." },
  { question: "ما هي طرق الدفع المتاحة؟", answer: "نوفر الدفع عن طريق البطاقات الائتمانية والتحويل البنكي." },
  { question: "هل يمكنني إلغاء الحجز؟", answer: "نعم، يمكنك إلغاء الحجز قبل 24 ساعة من موعد الاستلام بدون رسوم." } ,
  { question: "شو وضع البنزين ؟", answer: "يجب اعادة السبارة فل بنزين مثل ما كانت ." }
];
