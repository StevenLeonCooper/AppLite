# AppLite - Just some simple JavaScript helpers. 
The point of this is to just provide some basic, lightweight functionality that
is a little cleaner than pure vanilla JS and a lot smaller/simpler than jQuery. 

# Why? 
Really the point here is to expose the vanilla JS alternatives to jQuery. 
Trying to figure out how stuff works using the uncompressed jQuery source is
frustrating because it's a pretty big and complex script. This app aims to be
just as useful for a lot of basic tasks but organized in logical ES6 modules
with easy-to-understand code and detailed documentation. 

# There's More
I'm also planning to integrate templating, which is outside of the scope of jQuery. 
I will likely use mustache.js for logic-less templating since it's a reasonably-sized
library and there's no point in reinventing the wheel for 1 specific task but I will
include non-engine templating using the <template> tag and node cloning. 

# Classes and Helpers
This app is organized into 4 categories: app, classes, helpers and custom. 

**App** - This is the root module that starts the chain of module imports. The basic document-level
event listeners and "onload" listener for the body are here. 

**Classes** - The classes for this app are organized like a C# library of classes. Since JavaScript classes
are just syntactical sugar (for the most part) these are utilized mostly for readability and organization. 
All classes represent _reusable_ types that make the most sense for multiple instances on a single app/page/website. 
These are things you'll instantiate over and over and utilize a lot. 

**Helpers** - The helper modules do not use the JS class syntax. These represent objects and functions that only really need
to be instantiated once and don't require a class/factory pattern. These objects and functions are intended to simplify access 
to fields and methods on classes that might be a little verbose or inconvenient otherwise. If you want to obsess over performance, bundle and minify this app for production. The code is verbose and descriptive intentionally to help newer developers understand what's happening in the code. 

**Custom** - The custom prefix denotes a helper that is unique to an individual's implementation of the app. While you might use
all the other classes and helpers without modifying any of the code, you'll almost definitely modify __custom_events.js__ since
those are the event handlers that make things happen on your page. The __app.js__ file technically belongs to this category as well. 

# Current Features (Update 2021-06-01)

* **AJAX/XHR Helper & Request Class** - This helper/class combo provides some convenient GET/POST functionality using promises. 
* **Benchmark Class** - This is a very simple class for using performance.now() to test your script's execution time in ms.
* **UI Helper with Modal Window** - Basic implementation of HTML-based alerts, warnings, text entry & confirm yes/no diaglogues. 
* **Basic Template Rendering** - Load dynamic or static JSON and/or templates or partials & render them to the page using mustache.js. 
* **Basic Event Delegation** - Add functions to custom_events.js based on trigger category & they're automatically "wired" via data attributes. 
* **Basic 2-way Binding** - Extending the data context concept, setup Models and Views that are "Bound" to eachother & listen for/send updates. 

All helpers and most classes are optional so you could slim down this build to suit your needs. Only templates and bindings rely on mustache.js so you can really slim down the build by excluding those. 

# To-Do List:  

* Advance the binding funtionality to allow for more complex view senders (e.g. convert <select> control into array, etc.)
* Cleanup dependencies to make customization easier and more intuitive. 
* Add more documentation to maximize readability. 
* Add more thorough examples and demos. 

