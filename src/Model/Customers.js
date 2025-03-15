import allCar from "./AllCar";

class CustomersModel{

  constructor (id,name,Email,Password,Card,imagUrl) { 
      this.id = id ; 
      this.name = name ; 
      this.Email = Email ; 
      this.Password = Password ; 
      this.Card = Card ; 
      this.imagUrl = imagUrl; 
  }
  
  static Save () {
      if ( this.id == null ) { 
        allCar.push(this); 
        localStorage.setItem("Car" , JSON.stringify(allCar)) ; 
      }else {
          const idx=allCar.indexOf(this) ;
          allCar[idx] = this; 
      }
  }

  


}
export default CustomersModel ; 

