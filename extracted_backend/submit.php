<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $host = "localhost";
    $dbname = "coachsub_form";
    $username = "coachsub_fightfit";
    $password = "Boxer@2003";

    $conn = new mysqli($host, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Database Connection Failed");
    }

    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
    $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $email = htmlspecialchars(trim($_POST['email'] ?? ''));
    $program = htmlspecialchars(trim($_POST['program'] ?? ''));
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));

    if (empty($name) || empty($phone) || empty($program)) {
        die("Required fields missing.");
    }

    $stmt = $conn->prepare("INSERT INTO contact_form (name, phone, email, program, message) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $phone, $email, $program, $message);

    if ($stmt->execute()) {
        echo "Form submitted successfully!";  // plain text
    } else {
        echo "Database Error!";
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Invalid access.";
}
?>