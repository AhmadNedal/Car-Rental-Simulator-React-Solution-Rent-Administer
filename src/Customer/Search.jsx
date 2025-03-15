import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CarSearch() {
  const navigate = useNavigate() ;
  const ele =JSON.parse(localStorage.getItem("Car")) ;  
  let [AllCar,setAllCar] = useState(ele);
  let [InputContent ,setInputContent] = useState(""); 
  

  function seacrr (value) { 
    
    const  AllCar2 =JSON.parse(localStorage.getItem("Car"));

    const newAll = AllCar2.filter((e)=>{
        if(e.name.includes(value)) {
          return true ;
        }else {
          return false ; 
        }
    }); 
    setAllCar(newAll); 
  }


  return (
    <div class="min-h-screen bg-gray-100 p-8">
      <div class="bg-white p-6 shadow-md rounded-lg mb-8">

            <h2 class="text-2xl font-bold text-center mb-4">البحث عن سيارة</h2>
        
        <div class="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="... ابحث عن اسم السيارة"
            class="border p-3 rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-blue-500"
            value={InputContent}
            onChange={(e)=>{
              setInputContent(e.target.value) ;
              seacrr(e.target.value) ;
            }}
          />




        </div>
      </div>

<div style={{display:"flex" ,flexDirection:"column" , justifyContent:"center" ,alignItems:"center", flexWrap:"wrap"
}}>
  
  
  <section style={{width:"100%" , display:"flex" , justifyContent:"center" , alignItems:"center" , flexDirection:"column"}}>
      <h3 class="text-2xl font-bold mb-4">نتائج البحث</h3>

      <div style={{display:"flex",gap:"10px" ,  justifyContent:"center" , alignItems:"center" ,flexWrap:"wrap" , width:"100%"}}>
      {AllCar.map((car)=> {
        return ( 
          <div style={{width:"300px"}} className={`${car.available?"opacity-55":"opacity-100"}`} >
        <div class="bg-white p-4 rounded-lg shadow-md transition">
          <img src={car.imageUrl} alt="Car Name" class="w-full h-40 object-cover rounded-md" />
          <h4 class="text-xl font-semibold mt-3">{car.name}</h4>
          <p class="text-gray-600">{car.price} $ / اليوم</p>
          <button disabled={car.available} 
          
          className={`mt-3  text-white px-4 py-2 rounded-lg ${car.available?"opacity-55 bg-red-500":"hover:bg-blue-600 bg-blue-500"}`}

              onClick={()=> {
                navigate("/Guarantee", { state : car });

              }}

          >
            احجز الآن
      </button>
    </div>

  </div>
    )
  })}

  </div>
</section>


      </div>

</div>
    
  );
}
