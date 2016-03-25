class Marker {                         
  constructor(x, y, info, kuva) {          
    this.x = x;
    this.y = y;
	this.info = info;
	this.kuva = kuva;
	this.mInfo = muutaInfo;
	this.mKoordit = muutaKoordit;
  }
 
  get area() {                          //Tavallaan metodi m‰‰rittely, katso alempaa esimerkkikutsu
    return this.calcArea();
  }
  
  get info() {
	return this.info();
  }
  
  muutaInfo(teksti) {
	this.info = teksti;
  }
  
  muutaKoordit(x, y) {
	this.x = x;
	this.y = y;
  }
 
  calcArea() {                          //perus metodi (eli johonkin objectiin kiinnittynyt funktio)
    return this.x * this.y;
  }
}                                       //T‰h‰n p‰‰ttyy luokkarakenne