<?php
$conn = new PDO('mysql:dbname=hackathon;host=dockerbasic_mariadb_1;port=3306', 'hackathon', 'hackathon');



if ($_SERVER['REQUEST_METHOD'] == "POST") {
    echo "Ajout d'un user";
} elseif ($_SERVER['REQUEST_METHOD'] == "GET") {
    echo displayusers($conn);
}

function adduser() {
    echo json_encode($_POST);
}

function displayusers($conn) {
    $stmt = $conn->prepare("SELECT * FROM register_user");
    $stmt->execute();
    $row = $stmt->fetchAll();
    $response = json_encode($row);
    return $response;
}