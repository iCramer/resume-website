<?php
	$server = 'db701653453.db.1and1.com';
	$username = 'dbo701653453';
	$password = 'pageContent15((';
	$dataBase = 'db701653453';

	// $server = 'localhost';
	// $username = 'root';
	// $password = 'root';
	// $dataBase = 'db_page_content';

	$table = 'users';
	$loginUserName = $_POST['userName'];
	$loginPassword = $_POST['password'];



$conn = mysqli_connect($server, $username, $password, $dataBase);
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT * FROM users WHERE userName = '$loginUserName' and password = '$loginPassword'";
$result = mysqli_query($conn, $sql) or die(mysqli_error());
$count = mysqli_num_rows($result);

if($count == 1) {
	session_start();
	$_SESSION['userName'] = $loginUserName;
	$_SESSION['password'] = $loginPassword;
	$_SESSION['success'] = true;
}
else {
	$_SESSION['success'] = false;
	echo json_encode($_SESSION['success']);
}

if(isset($_SESSION['userName'])) {
	echo json_encode($_SESSION);
}

mysqli_close($conn);

?>