<?php

	$server = 'localhost';
	$username = 'root';
	$password = 'root';
	$dataBase = 'db_page_content';

  	$table = $_GET['page'];

	$conn = mysqli_connect($server, $username, $password, $dataBase);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	switch ($table) {
		
		case 'skillsSection':
			$data = array('bodyCopy' => array(), 'tools' => array());

			$sql = "SELECT * FROM skillsSection";
			$result = mysqli_query($conn, $sql) or die("Error in Selecting " . mysqli_error($conn));
		    while($row = mysqli_fetch_assoc($result)) {
		    	$data['bodyCopy'] = $row;
		    }

		    $sql = "SELECT * FROM skillsSectionTools";
		    $result = mysqli_query($conn, $sql) or die("Error in Selecting " . mysqli_error($conn));
		    while($row = mysqli_fetch_assoc($result)) {
		    	array_push($data['tools'], $row);
		    }

		    echo json_encode($data, JSON_UNESCAPED_SLASHES);

			break;

		case 'experienceSection':
			$data = array('bodyCopy' => array(), 'projects' => array());

			$sql = "SELECT * FROM experienceSection";
			$result = mysqli_query($conn, $sql) or die("Error in Selecting " . mysqli_error($conn));
		    while($row = mysqli_fetch_assoc($result)) {
		    	$data['bodyCopy'] = $row;
		    }

		    $sql = "SELECT * FROM experienceSectionProjects";
		    $result = mysqli_query($conn, $sql) or die("Error in Selecting " . mysqli_error($conn));
		    while($row = mysqli_fetch_assoc($result)) {
		    	array_push($data['projects'], $row);
		    }

		    echo json_encode($data, JSON_UNESCAPED_SLASHES);

			break;

		case 'testimonialsSection':
			$data = array('bodyCopy' => array(), 'quotes' => array());

			$sql = "SELECT * FROM " . $table;
			$result = mysqli_query($conn, $sql) or die("Error in Selecting " . mysqli_error($conn));
		    while($row = mysqli_fetch_assoc($result)) {
		    	$data['bodyCopy'] = $row;
		    }

		    $sql = "SELECT * FROM testimonialsSectionQuotes";
		    $result = mysqli_query($conn, $sql) or die("Error in Selecting " . mysqli_error($conn));
		    while($row = mysqli_fetch_assoc($result)) {
		    	array_push($data['quotes'], $row);
		    }

		    echo json_encode($data, JSON_UNESCAPED_SLASHES);

			break;

		case 'aboutSection':
			$data = array('header' => array(), 'paragraphs' => array(), 'artLinks' => array());

			$sql = "SELECT * FROM " . $table;
			$result = mysqli_query($conn, $sql) or die("Error in Selecting " . mysqli_error($conn));
		    while($row = mysqli_fetch_assoc($result)) {
		    	$data['header'] = $row;
		    }

		    $sql = "SELECT * FROM aboutSectionParagraphs";
		    $result = mysqli_query($conn, $sql) or die("Error in Selecting " . mysqli_error($conn));
		    while($row = mysqli_fetch_assoc($result)) {
		    	array_push($data['paragraphs'], $row);
		    }

		    $sql = "SELECT * FROM aboutSectionLinks";
		    $result = mysqli_query($conn, $sql) or die("Error in Selecting " . mysqli_error($conn));
		    while($row = mysqli_fetch_assoc($result)) {
		    	array_push($data['artLinks'], $row);
		    }

		    echo json_encode($data, JSON_UNESCAPED_SLASHES);

			break;

		default:
			$data = array();

			$sql = "SELECT * FROM " . $table;
			$result = mysqli_query($conn, $sql) or die("Error in Selecting " . mysqli_error($conn));
		    while($row = mysqli_fetch_assoc($result)) {
		    	$data[] = $row;
		    }

		    echo json_encode($data, JSON_UNESCAPED_SLASHES);

		    break;
	}

	    mysqli_close($conn);

?>