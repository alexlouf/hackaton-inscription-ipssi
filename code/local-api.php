<?php
$conn = new PDO('mysql:dbname=hackathon;host=dockerbasic_mariadb_1;port=3306', 'hackathon', 'hackathon');



if ($_SERVER['REQUEST_METHOD'] == "POST") {
    echo adduser($conn);
} elseif ($_SERVER['REQUEST_METHOD'] == "GET") {
    echo displayusers($conn);
}

function adduser($conn) {
    $entityBody = file_get_contents('php://input');
    $post_array = json_decode($entityBody, true);
    $res_array = ["success" => true];
    $stmt = $conn->prepare("INSERT INTO register_user (name, surname, email, promotion, speciality) VALUES (:name, :surname, :email, :promotion, :speciality)");
    $stmt->bindParam(':name', $post_array["name"]);
    $stmt->bindParam(':surname', $post_array["surname"]);
    $stmt->bindParam(':email', $post_array["email"]);
    $stmt->bindParam(':promotion', $post_array["promotion"]);
    $stmt->bindParam(':speciality', $post_array["speciality"]);
    if($stmt->execute()){
        return json_encode($res_array);
    } else {
        $res_array["success"] = false;
        return json_encode($res_array);
    }

}

function displayusers($conn) {
    $stmt = $conn->prepare("SELECT * FROM register_user");
    $stmt->execute();
    $row = $stmt->fetchAll();
    $response = json_encode($row);
    return $response;
}