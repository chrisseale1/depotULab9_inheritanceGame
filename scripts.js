var allVehicles = new Array();


// var posx = (Math.random() * ($(gameRoad).width() - divsize)).toFixed();
// var posy = (Math.random() * ($(gameRoad).height() - divsize)).toFixed();

var Vehicle = function() {
    var gameRoad = document.getElementById("game-road");
    this.beginPoints = 10;
    this.div = document.createElement('div');
    this.div.className = 'vehicle';
    this.div.style.top = String(Math.floor((Math.random() * 925) + 1)) + 'px';
    this.div.style.left = String(Math.floor((Math.random() * 925) + 1)) + 'px';
    this.damage();
    this.totaled();
    this.damageValue = 0;
    this.maxDamage = 0;  //maybe add damage up until it reaches max damage variable of each subtype
    this.speed = 0; //update this
    gameRoad.appendChild(this.div);
}


Vehicle.prototype.damage = function() {     
    var damageValue = 0;
    damageValue++;
    return damageValue;
}

Vehicle.prototype.totaled = function() {
    if (this.damageValue >= this.maxDamage) {
        this.Vehicle.removeChild(this);
    }
}


var Car = function() {
    Vehicle.call(this);
    this.maxDamage = 2;
    this.div.classList.add("car");
    this.reverse();
     
}
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;
Car.prototype.move = function() {
        $(this.div).animate({ 
            left: "-=1100px",
        }, 
        8000,function() {
          $(this.div).css({right: 0});
          this.move();
      }.bind(this));
}
Car.prototype.reverse = function() {}

var CopCar = function() {
    Car.call(this);
    this.div.classList.remove('car');
    this.div.classList.add("cop-car");
    this.maxDamage = 3;
    this.blinker();
}
CopCar.prototype = Object.create(Car.prototype);
CopCar.prototype.constructor = CopCar;
CopCar.prototype.move = function() {
    $(this.div).animate({ 
        top: "+=1100px"
      },
      8000,
      function() {
          $(this.div).css({top: 0});
          this.move();
      }.bind(this));
}
CopCar.prototype.blinker = function() {
    $(".cop-car").fadeOut(250);
    $(".cop-car").fadeIn(250);
}
var blinker = function blinker () {
    $(".cop-car").fadeOut(250);
    $(".cop-car").fadeIn(250);
}
setInterval(blinker, 1000);

var Cycle = function() {
     Vehicle.call(this);
     this.div.classList.add('cycle');
     this.maxDamage = 1;
}
Cycle.prototype = Object.create(Vehicle.prototype);
Cycle.prototype.constructor = Cycle;
Cycle.prototype.move = function() {
    $(this.div).animate({left: '-=1100', top: '-=1100'}, 4000, $(this.div).animate({ 
        top: "+=1100px"
      },
      4000,
      function() {
          $(this.div).css({top: 0});
          this.move();
      }.bind(this)));
}
var Tank = function() {
    Vehicle.call(this);
    this.div.classList.add('tank');
    this.maxDamage = 10;
}
Tank.prototype = Object.create(Vehicle.prototype);
Tank.prototype.constructor = Car;
Tank.prototype.move = function() {
    var move = function move() {
$(".tank").animate({left: '-=1100', top: '+=1100'}, 16000).animate({left: '+1100', top: '-100'}, 0);
}
    setInterval(move, 0);
}
document.addEventListener('DOMContentLoaded',function() {
     document.getElementById('add-car').addEventListener('click', addCar);
        function addCar () {
            var c = new Car();
            c.move();
            allVehicles.push(c);
        }
     document.getElementById('add-cop').addEventListener('click', addCop);
        function addCop () {
            var cc = new CopCar();
            cc.move();
            allVehicles.push(cc);
        }
     document.getElementById('add-motorcycle').addEventListener('click', addCycle);
        function addCycle () {
            var motorcycle = new Cycle();
            motorcycle.move();
            allVehicles.push(m);
        }
     document.getElementById('add-tank').addEventListener('click', addTank);
        function addTank () {
            var t = new Tank();
            t.move();
            allVehicles.push(t);
        }
});