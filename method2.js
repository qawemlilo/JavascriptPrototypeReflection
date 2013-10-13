/*

This file also uses classic inheritance, but all methods and properties are (kind of) defined inside the constructor,
despite we still reap the benefits of prototypal inheritance in terms of performance and in flexibility: changes made to the constructor
are reflected in instance objects even if the changes are made after the instantiation of said objects.

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

var Person = (function(){

    function Person(name) {
        this.name = name;
    };

    Person.prototype.sayHi = function() {
        return "Hey there, " + this.name + "!";
    }

    return Person;
})();



var Footballer = (function() {

    function Footballer(name, position, team) {
        Person.call(this, name);
        this.position = position;
        this.team = team;        
    }

    Footballer.prototype = Object.create(Person.prototype);
    Footballer.prototype.constructor = Footballer;

    Footballer.prototype.shoot = function() {
        return this.name + " attempted a goal AND SCORES!!";
    };

    return Footballer;
})();



var Defender = (function() {

    function Defender(name, team) {
        Footballer.call(this, name, 2, team);   //  We are a super defensive team, and we know all defenders play in the number 2 position
    }

    Defender.prototype = Object.create(Footballer.prototype);
    Defender.prototype.constructor = Defender;

    Defender.prototype.tackle = function() {
        return this.name + ", player number " + this.position + " of " + this.team + ", risked a tackle and saved the ball";
    }    

    return Defender;
})();


console.log ('Inheritance (composition) method two: constructor pattern alternative');
console.log ();
console.log ('>>>>>>>>>>>>>>-----------------------<<<<<<<<<<<<<<<');
console.log ('         Testing Base Objects self-reflection');
console.log ('>>>>>>>>>>>>>>-----------------------<<<<<<<<<<<<<<<');
console.log ();
console.log ('Footballer.prototype instanceof Person    ', Footballer.prototype instanceof Person);
console.log ('Object.getPrototypeOf(Footballer.prototype) === Person.prototype    ', Object.getPrototypeOf(Footballer.prototype) === Person.prototype);
console.log ();
console.log ('Defender.prototype instanceof Person    ', Defender.prototype instanceof Person);
console.log ('Defender.prototype instanceof Footballer    ', Defender.prototype instanceof Footballer);
console.log ('Object.getPrototypeOf(Defender.prototype) === Person.prototype    ', Object.getPrototypeOf(Defender.prototype) === Person.prototype);
console.log ('Object.getPrototypeOf(Defender.prototype) === Footballer.prototype    ', Object.getPrototypeOf(Defender.prototype) === Footballer.prototype);


//  Instantiate the objects


var Gaston = new Person('Gaston');
var Fede = new Footballer('Federico', 9, 'Newells Old Boys');
var John = new Defender('John', 'River Plate');



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
console.log ('(Gaston.constructor === Person) ', Gaston.constructor === Person);
console.log ();
console.log ('Gaston.constructor = ', Gaston.constructor);
console.log ();
console.log ('{sayHi}', (typeof Gaston.sayHi == 'function') ? Gaston.sayHi() : 'Gaston does not know how to sayHi');
console.log ('{shoot}', (typeof Gaston.shoot == 'function') ? Gaston.shoot() : 'Gaston does not know how to shoot');
console.log ('{tackle}', (typeof Gaston.tackle == 'function') ? Gaston.tackle() : 'Gaston does not know how to tackle');

console.log ();
console.log (' >> Self reflection <<');
console.log ();


console.log ('Gaston instanceof Person    ', Gaston instanceof Person);
console.log ('Gaston instanceof Footballer    ', Gaston instanceof Footballer);
console.log ('Gaston instanceof Defender    ', Gaston instanceof Defender);
console.log ();
console.log ('Object.getPrototypeOf(Gaston) === Person.prototype    ', Object.getPrototypeOf(Gaston) === Person.prototype);
console.log ('Object.getPrototypeOf(Gaston) === Footballer.prototype    ', Object.getPrototypeOf(Gaston) === Footballer.prototype);
console.log ('Object.getPrototypeOf(Gaston) === Defender.prototype    ', Object.getPrototypeOf(Gaston) === Defender.prototype);


//Fede, the Footballer
console.log ();
console.log ('------------');
console.log ('---Fede---');
console.log ('------------');
console.log ();
console.log ('Fede.__proto__ = ', Fede.__proto__);
console.log ();
console.log ('(Fede.constructor === Person) ', Fede.constructor === Person);
console.log ('(Fede.constructor === Footballer) ', Fede.constructor === Footballer);
console.log ();
console.log ('Fede.constructor = ', Fede.constructor);
console.log ();
console.log ('{sayHi}', (typeof Fede.sayHi == 'function') ? Fede.sayHi() : 'Fede does not know how to sayHi');
console.log ('{shoot}', (typeof Fede.shoot == 'function') ? Fede.shoot() : 'Fede does not know how to shoot');
console.log ('{tackle}', (typeof Fede.tackle == 'function') ? Fede.tackle() : 'Fede does not know how to tackle');

console.log ();
console.log (' >> Self reflection <<');
console.log ();


console.log ('Fede instanceof Person    ', Fede instanceof Person);
console.log ('Fede instanceof Footballer    ', Fede instanceof Footballer);
console.log ('Fede instanceof Defender    ', Fede instanceof Defender);
console.log ();
console.log ('Object.getPrototypeOf(Fede) === Person.prototype    ', Object.getPrototypeOf(Fede) === Person.prototype);
console.log ('Object.getPrototypeOf(Fede) === Footballer.prototype    ', Object.getPrototypeOf(Fede) === Footballer.prototype);
console.log ('Object.getPrototypeOf(Fede) === Defender.prototype    ', Object.getPrototypeOf(Fede) === Defender.prototype);


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


console.log ('John instanceof Person    ', John instanceof Person);
console.log ('John instanceof Footballer    ', John instanceof Footballer);
console.log ('John instanceof Defender    ', John instanceof Defender);
console.log ();
console.log ('Object.getPrototypeOf(John) === Person.prototype    ', Object.getPrototypeOf(John) === Person.prototype);
console.log ('Object.getPrototypeOf(John) === Footballer.prototype    ', Object.getPrototypeOf(John) === Footballer.prototype);
console.log ('Object.getPrototypeOf(John) === Defender.prototype    ', Object.getPrototypeOf(John) === Defender.prototype);