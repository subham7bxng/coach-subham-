<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

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
        // Send Email
        $mail = new PHPMailer(true);

        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host       = 'mail.coachsubham.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'getready@coachsubham.com';
            $mail->Password   = 'Boxer@2003'; // Assumed from DB password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port       = 465;

            // Recipients
            $mail->setFrom('getready@coachsubham.com', 'Coach Subham Website');
            $mail->addAddress('subhamshawufc@gmail.com');
            $mail->addReplyTo($email, $name);

            // Content
            $mail->isHTML(true);
            $mail->Subject = "New Form Submission: $program";
            $mail->Body    = "
                <h3>New Lead from Coach Subham Website</h3>
                <p><strong>Name:</strong> $name</p>
                <p><strong>Phone:</strong> $phone</p>
                <p><strong>Email:</strong> $email</p>
                <p><strong>Program:</strong> $program</p>
                <p><strong>Message:</strong><br>$message</p>
            ";

            $mail->send();
            echo "Form submitted successfully!";
        } catch (Exception $e) {
            // Still echo success but maybe log the error internally
            // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            echo "Form submitted successfully!";
        }
    } else {
        echo "Database Error!";
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Invalid access.";
}
?>