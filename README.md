# AppLite - Basic JavaScript Helpers
AppLite is a library of scripts that provide basic and extensible JS functionality
similar to libraries like jQuery but focusing on abstracting more advanced tasks instead
of covering up built-in functionality unnecessarily. This library is intended to be verbose
and well documented to help users understand exactly what the code does. 

# Why? 
* The main goal of this project is to create an app library that can help with common tasks
that also has detailed documentation and does not rely on too many libraries. 

* Another consideration is app size. The compressed, slim version of jQuery is around 70 kb. 
The uncompressed source code for this library is about 27 kb & the compressed version is 16 kb. While AppLite doesn't do 
all of the things jQuery does, most people don't need all of jQuery's features. Also this app is organized into modules and
almost all of them are optional so you can easily pick and choose which to import for a very slim build. 

* The last focus for this project is to avoid obfuscating built-in classes and methods. We want to simplify complex tasks
like building XHR requests or rendering templates but there's very little benefit in convenience syntax that just accommplishes
the same thing as a built-in object like __querySelector()__ or __classList__. Using the "Vanilla" concepts whenever possible
makes it easier to try new/different libraries in the future since more of your code will be library-agnostic. 


# Current Features (Update 2021-06-01)

* **AJAX/XHR Helper & Request Class** - This helper/class combo provides some convenient GET/POST functionality using promises. 
* **Benchmark Class** - This is a very simple class for using __performance.now()__ to test your script's execution time in ms.
* **UI Helper with Modal Window** - Basic implementation of HTML-based alerts, warnings, text entry & confirmation diaglogues. 
* **Basic Template Rendering** - Load dynamic or static JSON and/or templates or partials & render them to the page using mustache.js. 
* **Basic Event Delegation** - Add functions to custom_events.js based on trigger category & they're automatically "wired" via data attributes. 
* **Basic 2-way Binding** - Extending the data context concept, setup Models and Views that are "Bound" to each other & listen for/send updates. 

All helpers and most classes are optional so you could slim down this build to suit your needs. Only templates and bindings rely on mustache.js so you can really slim down the build by excluding those. 

# To-Do List:  

* Advance the binding funtionality to allow for more complex view senders (e.g. convert <\select> control into array, etc.)
* Cleanup dependencies to make customization easier and more intuitive. 
* Add more documentation to maximize readability.
* Add more thorough examples and demos. 

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



