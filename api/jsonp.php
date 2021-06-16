<?php
header('Content-type: text/javascript');

$RequestData = $_GET;

$callback = $RequestData["callback"];

?>

window.<?php echo($callback)?>({

    name: "Bob McTesterson",
    job: "Magician",
    age: 34,
    hobbies: [
     "gaming",
     "programming",
     "music"   
    ]
});

console.log("JSONP Callback Script");