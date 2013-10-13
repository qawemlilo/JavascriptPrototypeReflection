** PULL REQUESTS ARE WELCOME **

A simple comparisson between different JavaScript inheritance (composition) approaches with 
extensive testing of the results.

If you are familiar with JavaScript prototype chain feature but yet have to grasp it internally, this is for you. If you look at the source code and their corresponding output you can gain insight in how the prototype chain is formed and how to test objects against each other.

For a visual representation, check the "Visual Representation" section of this file

For a list of *some* of the insights that you can get from this code, check the "Conclusions" section of this file.

# What's in the .js files

As of now, the repository consists of 3 main JavaScript files:

1. **method1.js**: Classical Inheritance. Constructor Pattern. This means that objects are instantiated with the `new` keyword, and they
    are instantiated with a function known as *constructor*.
2. **method2.js**: Classical Inheritance. Constructor Pattern. The result is the **same as method1.js**, except that all the properties and methods of the constructor are defined inside said constructor (not exactly inside the constructor, but effectively inside it in readibility terms), while still taking advantage of JavaScript's prototype chain features.
    
    I prefer this alternative, but added method1.js in case someone is not familiar, although it should be easy to understand.
3. **method3.js**: Pure objects. No constructors. Objects are not instantiated with a function, they are created with
    `Object.create(prototypeObject)`.

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

To visualize the objects of this repository, follow these instructions:

1. Open the Inheritance Method file you want to test. For example, method1.js

2. Copy all the base objects and the object instantiations. For example, in method1.js you should copy

        var Person = function(name) {
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

Under construction...