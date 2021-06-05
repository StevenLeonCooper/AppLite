<?php
header('Content-type: application/json');

$RequestData = $_POST; //json_decode(file_get_contents("php://input"), true);

//print_r($RequestData);

if ($RequestData['fail'] == true) {
    header(http_response_code(500));
?>
    {
    "status" : "fail"
    }
<?php
    exit();
}
?>
{
"status" : "success"<?php

function cleanVal($val)
{
    $type = gettype($val);
    if ($type == "string") return "\"$val\"";
    return $val;
}

foreach ($RequestData as $key => $value) {
    $val = cleanVal($value);

    if ($key === array_key_first($RequestData)) {
        echo (",\n");
    }

    echo ("\"$key\": $val");

    if ($key !== array_key_last($RequestData)) {
        echo (",\n");
    }
}

?>

}