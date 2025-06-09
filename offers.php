<?php
// offers.php

// Database config
$host = "localhost";
$dbname = "chatbot_db";
$username = "root";
$password = ""; // Default is blank in XAMPP

// Connect to MySQL
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed."]));
}

// Fetch offers
$sql = "SELECT offer_text FROM special_offers";
$result = $conn->query($sql);

$offers = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $offers[] = $row['offer_text'];
    }
    echo json_encode($offers);
} else {
    echo json_encode(["No offers found."]);
}

$conn->close();
?>
