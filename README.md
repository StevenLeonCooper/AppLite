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
to fields and methods on classes that might be a little verbose or inconvenient otherwise. If you want to obsess over performance, bundle and minify this app for production. The code is verbose and description intentionally to help newer developers understand what's happening in the code. 

**Custom** - The custom prefix denotes a helper that is unique to an individual's implementation of the app. While you might use
all the other classes and helpers without modifying any of the code, you'll almost definitely modify __custom_events.js__ since
those are the event handlers that make things happen on your page. The __app.js__ file technically belongs to this category as well. 

