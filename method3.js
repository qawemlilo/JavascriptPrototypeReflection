/*

Este metodo no usa funciones, usa solo objetos.

Pros: 
    No hay que definir manualmente los prototypos
    No hay que definir el constructor

Contra:
    Hay que llamar al metodo init en cada instanciacion

*/


{
    //This is just to redirect console.log to a file instead of the console.
    //I put it in a brackets block only to differentiate
    //It wont work on the browser so we better check
    //It can also be disabled with this variable

    var outputInConsole = true;

    if (!outputInConsole && (typeof window === 'undefined' || this !== window) ){
        //Not in browser
        var fs = require('fs');

        process.__defineGetter__('stdout', function() { return fs.createWriteStream('output/method1_output.txt', {flags:'a'}) })
    }
}

var Person = {
    init : function(name) {
        this.name = name
    },

    sayHi : function() {
        return "Hey there, " + this.name + "!"
    }

};

var Footballer = Object.create(Person);

Footballer.init = function(name, position, team) {
    Person.init.call(this, name)
    this.position = position;
    this.team = team;
}

Footballer.shoot = function() {
    return this.name + " attempted a goal AND SCORES!!";
}

var Defender = Object.create(Footballer);

Defender.init = function(name, team) {
    Footballer.init.call(this, name, 2, team);  //  We are a super defensive team, and we know all defenders play in the number 2 position
}

Defender.tackle = function() {
    return this.name + ", player number " + this.position + " of " + this.team + ", risked a tackle and saved the ball";
}


console.log ('Inheritance (composition) method three: bare objects');
console.log ();
console.log ('>>>>>>>>>>>>>>-----------------------<<<<<<<<<<<<<<<');
console.log ('         Testing Base Objects self-reflection');
console.log ('>>>>>>>>>>>>>>-----------------------<<<<<<<<<<<<<<<');
console.log ();
console.log ('Person.isPrototypeOf(Footballer)    ', Person.isPrototypeOf(Footballer));
console.log ('Object.getPrototypeOf(Footballer) === Person    ', Object.getPrototypeOf(Footballer) === Person);

console.log ();
console.log ('Person.isPrototypeOf(Defender)    ', Person.isPrototypeOf(Defender));
console.log ('Footballer.isPrototypeOf(Defender)    ', Footballer.isPrototypeOf(Defender));
console.log ('Object.getPrototypeOf(Defender) === Person    ', Object.getPrototypeOf(Defender) === Person);
console.log ('Object.getPrototypeOf(Defender) === Footballer    ', Object.getPrototypeOf(Defender) === Footballer);


//  Instantiate the objects


var Gaston = Object.create(Person);
Gaston.init('Gaston');

var Fede = Object.create(Footballer);
Fede.init('Federico', 9, 'Newells Old Boys');

var John = Object.create(Defender)
John.init('John', 'River Plate');


console.log ();
console.log ();
console.log ('>>>>>>>>>>>>>>-----------------------<<<<<<<<<<<<<<<');
console.log ('         Testing Instantiated Objects');
console.log ('>>>>>>>>>>>>>>-----------------------<<<<<<<<<<<<<<<');

//Gaston, the Person
console.log ();
console.log ('------------');
console.log ('---Gaston---');
console.log ('------------');
console.log ();
console.log ('Gaston.__proto__ = ', Gaston.__proto__);
console.log ();
console.log ('(Gaston.constructor === Person)  ', Gaston.constructor === Person);
console.log ();
console.log ('Gaston.constructor = ', Gaston.constructor);
console.log ();
console.log ('{sayHi}', (typeof Gaston.sayHi == 'function') ? Gaston.sayHi() : 'Gaston does not know how to sayHi');
console.log ('{shoot}', (typeof Gaston.shoot == 'function') ? Gaston.shoot() : 'Gaston does not know how to shoot');
console.log ('{tackle}', (typeof Gaston.tackle == 'function') ? Gaston.tackle() : 'Gaston does not know how to tackle');

console.log ();
console.log (' >> Self reflection <<');
console.log ();


console.log ('Person.isPrototypeOf(Gaston)    ', Person.isPrototypeOf(Gaston));
console.log ('Footballer.isPrototypeOf(Gaston)    ', Footballer.isPrototypeOf(Gaston));
console.log ('Defender.isPrototypeOf(Gaston)    ', Defender.isPrototypeOf(Gaston));
console.log ();
console.log ('Object.getPrototypeOf(Gaston) === Person    ', Object.getPrototypeOf(Gaston) === Person);
console.log ('Object.getPrototypeOf(Gaston) === Footballer    ', Object.getPrototypeOf(Gaston) === Footballer);
console.log ('Object.getPrototypeOf(Gaston) === Defender    ', Object.getPrototypeOf(Gaston) === Defender);

//Fede, the Footballer
console.log ();
console.log ('------------');
console.log ('---Fede---');
console.log ('------------');
console.log ();
console.log ('Fede.__proto__ = ', Fede.__proto__);
console.log ();
console.log ('(Fede.constructor === Person) ', Fede.constructor === Person);
console.log ('(Fede.constructor === Footballer) ', Fede.constructor === Footballer)
console.log ();
console.log ('Fede.constructor = ', Fede.constructor);
console.log ();
console.log ('{sayHi}', (typeof Fede.sayHi == 'function') ? Fede.sayHi() : 'Fede does not know how to sayHi');
console.log ('{shoot}', (typeof Fede.shoot == 'function') ? Fede.shoot() : 'Fede does not know how to shoot');
console.log ('{tackle}', (typeof Fede.tackle == 'function') ? Fede.tackle() : 'Fede does not know how to tackle');

console.log ();
console.log (' >> Self reflection <<');
console.log ();


console.log ('Person.isPrototypeOf(Fede)    ', Person.isPrototypeOf(Fede));
console.log ('Footballer.isPrototypeOf(Fede)    ', Footballer.isPrototypeOf(Fede));
console.log ('Defender.isPrototypeOf(Fede)    ', Defender.isPrototypeOf(Fede));
console.log ();
console.log ('Object.getPrototypeOf(Fede) === Person    ', Object.getPrototypeOf(Fede) === Person);
console.log ('Object.getPrototypeOf(Fede) === Footballer    ', Object.getPrototypeOf(Fede) === Footballer);
console.log ('Object.getPrototypeOf(Fede) === Defender    ', Object.getPrototypeOf(Fede) === Defender);

//John, the Defender
console.log ();
console.log ('------------');
console.log ('---John---');
console.log ('------------');
console.log ();
console.log ('John.__proto__ = ', John.__proto__);
console.log ();
console.log ('(John.constructor === Person) ', John.constructor === Person);
console.log ('(John.constructor === Footballer) ', John.constructor === Footballer);
console.log ('(John.constructor === Defender) ', John.constructor === Defender);
console.log ();
console.log ('John.constructor = ', John.constructor);
console.log ();
console.log ('{sayHi}', (typeof John.sayHi == 'function') ? John.sayHi() : 'John does not know how to sayHi');
console.log ('{shoot}', (typeof John.shoot == 'function') ? John.shoot() : 'John does not know how to shoot');
console.log ('{tackle}', (typeof John.tackle == 'function') ? John.tackle() : 'John does not know how to tackle');

console.log ();
console.log (' >> Self reflection <<');
console.log ();


console.log ('Person.isPrototypeOf(John)    ', Person.isPrototypeOf(John));
console.log ('Footballer.isPrototypeOf(John)    ', Footballer.isPrototypeOf(John));
console.log ('Defender.isPrototypeOf(John)    ', Defender.isPrototypeOf(John));
console.log ();
console.log ('Object.getPrototypeOf(John) === Person    ', Object.getPrototypeOf(John) === Person);
console.log ('Object.getPrototypeOf(John) === Footballer    ', Object.getPrototypeOf(John) === Footballer);
console.log ('Object.getPrototypeOf(John) === Defender    ', Object.getPrototypeOf(John) === Defender);