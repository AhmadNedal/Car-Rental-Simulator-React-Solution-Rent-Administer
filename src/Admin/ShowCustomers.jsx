import React, { useContext, useState } from 'react';
import UserCard from './UserCard';

function ShowCustomers() {

    let [customerr,setCustomerr] = useState(JSON.parse((localStorage.getItem("Customer"))) );  
  return (
    <div className="min-h-screen  bg-gray-50 p-6 sm:p-8">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-10">قائمة المستخدمين</h1>
      <div className="grid grid-cols-1 w-full h=full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ">
        {customerr.map((user,index) => (
        <UserCard key={user.id} user={user} setCustomerr={setCustomerr} index={index}/>
        ))}
      </div>
    </div>
  );
}

export default ShowCustomers;
