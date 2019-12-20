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
    $project =  $post_array["project"];

    $res_array = ["success" => true,
                    "Message" => "Elève correctement ajouté"];

    $stmt = $conn->prepare("SELECT COUNT(*) FROM register_user WHERE project = :project");
    $stmt->bindParam(":project", $project);
    $stmt->execute();
    $row = $stmt->fetchAll();
    if ($row[0]["COUNT(*)"] >  5) {
        $res_array["success"] = false;
        $res_array["Message"] = "Trop d'élève ajouté sur le projet !";
        return json_encode($res_array);
    } else {
        $stmt = $conn->prepare("INSERT INTO register_user (name, surname, email, promotion, speciality, project) VALUES (:name, :surname, :email, :promotion, :speciality, :project)");
        $stmt->bindParam(':name', $post_array["name"]);
        $stmt->bindParam(':surname', $post_array["surname"]);
        $stmt->bindParam(':email', $post_array["email"]);
        $stmt->bindParam(':promotion', $post_array["promotion"]);
        $stmt->bindParam(':speciality', $post_array["speciality"]);
        $stmt->bindParam(':project', $post_array["project"]);
        if($stmt->execute()){
            return json_encode($res_array);
        } else {
            $res_array["success"] = false;
            $res_array["message"] = "Erreur SQL";
            return json_encode($res_array);
        }
    }


}

function displayusers($conn) {
    $stmt = $conn->prepare("SELECT * FROM register_user");
    $stmt->execute();
    $row = $stmt->fetchAll();
    $response = json_encode($row);
    return $response;
}