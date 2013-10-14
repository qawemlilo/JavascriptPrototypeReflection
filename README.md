# Javascript Prototypal Inheritance Techniques and Objects reflection 

![Iroxtion](http://i.imgur.com/owiQ4go.png)

[http://iroxtion.com](http://iroxtion.com)

**PULL REQUESTS ARE WELCOME AND ENCOURAGED**

---------

Comparisson between two popular JavaScript inheritance approaches with 
extensive testing of the results. **The main goal of this repository is to better your understanding of JavaScript prototypal inheritance and its inner workings by showing you how different inheritance techniques are coded and how objects produced by these techniques compare to each other.**

The second goal of this repository is that, if you ever get confused in how should you approach inheritance or how to compare relationships between objects, you can refresh your knowledge with a simple look at the source code and the output it generates. Comparing different techniques and their outputs in a text diff tool is particularly useful for this.


---------

**NOTE:** *This is NOT intended to be a basic JavaScript prototypal inheritance lesson. Some knowledge, like the use of `Function.call(thisContext, params)`, is assumed*

If you are familiar with JavaScript prototype chain feature but yet have to grasp it internally, this is for you. If you look at the source code and their corresponding output you can gain insight in how the prototype chain is formed and how to test objects against each other.

For a **visual representation**, check the "Visual Representation" section of this file

For a list of *some* of the insights that you can get from this code, as well as practical examples, **be sure to check the "Conclusions" section of this file.**

Although it may seem to be unnecesarily extensive testing and with some repetitions, you have to hammer this in your head, specially if you come from a class based Object Oriented Programming Language.

# What's in the .js files

Inheritance achieved by two techniques:

* Constructor Pattern (i.e. using a function)
* Only Objects

The inheritance chain is simple, and in plain English language its as follows: there is a `Person` object that has a `name` and knows how to `sayHi()`. There is also a `Footballer` object, which inherits from `Person`, but it also can `shoot()` the ball, and as a professional footballer it's part of a `team` and has a `position`. Last but not least, there is also a `Defender` object, which inherits from `Footballer` but also knows how to `tackle()` to defend his `team`.
We are presented with three `Person`s: Gaston, Fede and John. Of those three, Fede and John are `Footballer`s but only John is a `Defender`

As of now, the repository consists of 3 main JavaScript files:

1. **method1.js**: Classical Inheritance. Constructor Pattern. This means that objects are instantiated with the `new` keyword, and they
    are instantiated with a function known as *constructor*.
2. **method2.js**: Classical Inheritance. Constructor Pattern. The result is the **same as method1.js**, except that all the properties and methods of the constructor are defined inside said constructor (not exactly inside the constructor, but effectively inside it in readibility terms), while still taking advantage of JavaScript's prototype chain features.
    
    I prefer this alternative, but added method1.js in case someone is not familiar, although it should be easy to understand.
3. **method3.js**: Pure objects. No constructors. Objects are not instantiated with the `new` keyword, they are created with
    `Object.create(prototypeObject)`.

# Where's the output?

You can find the output of each technique in the `output/` folder in this repository. Alternatively, you can...

#Test it by Yourself

**Requirements**

* a web browser or,
* node.js

### Clone the git repository


    git clone https://github.com/Iroxtion/JavascriptInheritanceReflection.git

### Using the browser

#### Create an html file and put this inside:

    <script src="method1.js"></script>

Open the file in the Browser and open the Browser console. Change the filename inside the script tag to test other methods

### Using node
#### Go to the repository folder and execute the desired file with Node


    node method1.js
    ....
    node method2.js
    ....
    node method3.js

#### If you want to save the output instead of printing it in the console

In all methodX.js files, change this:

    var outputInConsole = true;

to this:

    var outputInConsole = false;


# Visual Representation

### ObjectPlayground diagrams

ObjectPlayground.com is a great website to visualize relationships between JavaScript objects.

If you dont want to clone the repository, here are the diagrams of each technique:

* [method1.js](https://raw.github.com/Iroxtion/JavascriptPrototypeReflection/master/diagrams/method1.png)
* [method2.js](https://raw.github.com/Iroxtion/JavascriptPrototypeReflection/master/diagrams/method2.png)
* [method3.js](https://raw.github.com/Iroxtion/JavascriptPrototypeReflection/master/diagrams/method3.png)

If you want to test for yourself visualize the objects of this repository, follow these instructions:

1. Open the inheritance technique file you want to test. For example, method1.js

2. Copy all the constructors/base objects and the object instantiations. For example, in method1.js you should copy

        function Person(name) {
            this.name = name;
        };
        ....
        all the other base object constructors...
        ....

        //  Instantiate the objects

        var Gaston = new Person('Gaston');
        var Fede = new Footballer('Federico', 9, 'Newells Old Boys');
        var John = new Defender('John', 'River Plate');

3. Go to http://www.objectplayground.com

4. In the text box, paste the code

5. Add this at the bottom of the code:

        this.Gaston = Gaston;
        this.Fede = Fede;
        this.John = John;

6. Press the "Click to evaluate" button

# Conclusions

## Reference

* To **check if an Object has another Object *ANYWHERE* in the prototype chain**, you should do, according to the pattern you use:

        // Constructor pattern
        childObject instanceof  parentObject

        parentObject instanceof superParentObject

        childObject instanceof  superParentObject

        // Objects only
        parentObject.isPrototypeOf(childObject)

        superParentObject.isPrototypeOf(parentObject)

        superParentObject.isPrototypeOf(childObject)

    All of those will return true. But these will all return false:

        // Constructor pattern
        parentObject instanceof childObject

        superParentObject instanceof childObject
        superParentObject instanceof parentObject

        // Objects only
        childObject.isPrototypeOf(parentObject)

        parentObject.isPrototypeOf(superParentObject)

        childObject.isPrototypeOf(superParentObject)

* To **check if an Object has another Object as *DIRECT PROTOTYPE* in the prototype chain**, you should do, according to the pattern you use:

        //Constructor pattern
        Object.getPrototypeOf(childObject) === parentObject.prototype
        Object.getPrototypeOf(parentObject) === superParentObject.prototype

        //Objects only
        Object.getPrototypeOf(childObject) === parentObject
        Object.getPrototypeOf(parentObject) === superParentObject

    Will all return true. But these will all return false:

        //Constructor pattern
        Object.getPrototypeOf(childObject) === superParentObject.prototype

        //Objects only
        Object.getPrototypeOf(childObject) === superParentObject

## Practical example

Lets do another example to clear things up. For this example, lets say we have four objects:

1. ObjectA
2. ObjectB
3. ObjectC
4. ObjectD

`ObjectD` inherits from `ObjectC`. `ObjectC` inherits from `ObjectB`. `ObjectB` inherits from `ObjectA`.

#### How to check if `ObjectD` has other objects in any part of it's prototype chain

**If using the constructor Pattern**

    ObjectD instanceof ObjectB      // true
    ObjectB instanceof ObjectD      // false -> does ObjectB contain ObjectD in its prototype chain? No it does not. ObjectB only contains ObjectA

    ObjectD instanceof ObjectC      // true
    ObjectD instanceof ObjectA      // true

**If using only objects**

    ObjectB.isPrototypeOf(ObjectD)      // true
    ObjectD.isPrototypeOf(ObjectB)      // false -> does ObjectB contain ObjectD in its prototype chain? No it does not. ObjectB only contains ObjectA

    ObjectC.isPrototypeOf(ObjectD)      // true
    ObjectA.isPrototypeOf(ObjectD)      // true

#### How to check if `ObjectD` has any of the other objects as direct link in it's prototype chain

**If using the constructor pattern**

    Object.getPrototypeOf(ObjectD) === ObjectC.prototype    // true
    Object.getPrototypeOf(ObjectD) === ObjectB.prototype    // false
    Object.getPrototypeOf(ObjectD) === ObjectA.prototype    // false

**If using only objects**

    Object.getPrototypeOf(ObjectD) === ObjectC    // true
    Object.getPrototypeOf(ObjectD) === ObjectB    // false
    Object.getPrototypeOf(ObjectD) === ObjectA    // false