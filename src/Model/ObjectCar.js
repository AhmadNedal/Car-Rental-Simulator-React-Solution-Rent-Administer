import allCar from "./AllCar";

class CarStructure{

  constructor (id,title,name,model,imageUrl,price,available,owner) { 
      this.id = id ; 
      this.title=title;
      this.name = name ; 
      this.model = model ; 
      this.imageUrl = imageUrl ; 
      this.price = price ; 
      this.available = available ; 
      this.owner = owner ; 
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
export default CarStructure ; 

