<?php
//View PHP error log: tail -f /Applications/MAMP/logs/php_error.log

$server = 'localhost';
$username = 'root';
$password = 'root';
$dataBase = 'db_page_content';

$table = $_POST['page'];
$p = $_POST['pageContent'];

$conn = mysqli_connect($server, $username, $password, $dataBase);
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
} 

switch ($table) {
	case 'introSection':
		$firstName = mysqli_real_escape_string($conn, $p['firstName']);
		$lastName = mysqli_real_escape_string($conn, $p['lastName']);
		$subtitle = mysqli_real_escape_string($conn, $p['subtitle']);
		$arrowText = mysqli_real_escape_string($conn, $p['arrowText']);
		$id = $p['id'];

		$sql = "INSERT INTO $table (id, firstName, lastName, subtitle, arrowText) VALUES ('$id', '$firstName', '$lastName', '$subtitle', '$arrowText') ON DUPLICATE KEY UPDATE firstName='$firstName', lastName='$lastName', subtitle='$subtitle', arrowText='$arrowText'";

		

	break;

	case'skillsSection':
		$bodyCopy = $p['bodyCopy'];
		$title = mysqli_real_escape_string($conn, $bodyCopy['title']);
		$headerIcon = mysqli_real_escape_string($conn, $bodyCopy['headerIcon']);
		$toolsHeader = mysqli_real_escape_string($conn, $bodyCopy['toolsHeader']);
		$skillTitle1 = mysqli_real_escape_string($conn, $bodyCopy['skillTitle1']);
		$skillTitle2 = mysqli_real_escape_string($conn, $bodyCopy['skillTitle2']);
		$skillContent1 = mysqli_real_escape_string($conn, $bodyCopy['skillContent1']);
		$skillContent2 = mysqli_real_escape_string($conn, $bodyCopy['skillContent2']);
		$skillIcon1 = mysqli_real_escape_string($conn, $bodyCopy['skillIcon1']);
		$skillIcon2 = mysqli_real_escape_string($conn, $bodyCopy['skillIcon2']);
		$id = $bodyCopy['id'];

		$deleteRecords = array();

		$sql = "INSERT INTO $table (id, title, headerIcon, toolsHeader, skillTitle1, skillTitle2, skillContent1, skillContent2, skillIcon1, skillIcon2) 
		VALUES ('$id', '$title', '$headerIcon', '$toolsHeader', '$skillTitle1', '$skillTitle2', '$skillContent1', '$skillContent2', '$skillIcon1', '$skillIcon2') ON DUPLICATE KEY UPDATE title='$title', headerIcon='$headerIcon', toolsHeader='$toolsHeader', skillTitle1='$skillTitle1', skillTitle2='$skillTitle2', skillContent1='$skillContent1', skillContent2='$skillContent2', skillIcon1='$skillIcon1', skillIcon2='$skillIcon2'";

		$tools = $p['tools'];
		if(is_array($tools)) {
			foreach ($tools as $tool) {
				if($tool['delete'] == true) {
					array_push($deleteRecords, $tool['id']);
				}
				$id = $tool['id'];
				$image = $tool['image'];
				$category = $tool['category'];

				$Query = $conn->prepare("INSERT INTO skillsSectionTools (id, image, category)
				VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE image = VALUES(image), category = VALUES(category)");
				$Query->bind_param('iss', $id, $image, $category);
				$Query->execute();
				$Query->close();
			}
		}
		foreach ($deleteRecords as $record) {
			$Query = $conn->prepare("DELETE FROM skillsSectionTools WHERE id = $record");
			$Query->execute();
			$Query->close();
		}
	
	break;

	case 'experienceSection':
		$bodyCopy = $p['bodyCopy'];
		$title = mysqli_real_escape_string($conn, $bodyCopy['title']);
		$introCopy = mysqli_real_escape_string($conn, $bodyCopy['introCopy']);
		$gridHeader = mysqli_real_escape_string($conn, $bodyCopy['gridHeader']);
		$headerIcon = mysqli_real_escape_string($conn, $bodyCopy['headerIcon']);
		$id = $bodyCopy['id'];

		$sql = "INSERT INTO $table (id, title, headerIcon, introCopy, gridHeader) VALUES ('$id', '$title', '$headerIcon', '$introCopy', '$gridHeader') ON DUPLICATE KEY UPDATE title='$title', headerIcon='$headerIcon', introCopy='$introCopy', gridHeader='$gridHeader'";

		$projects = $p['projects'];

		$deleteRecords = array();

		if(is_array($projects)) {
			foreach ($projects as $project) {
				if($project['delete'] == true) {
					array_push($deleteRecords, $project['id']);
				}

				$id = $project['id'];
				echo json_encode($id);
				$company = $project['company'];
				$position =  $project['position'];
				$logo = $project['logo'];
				$backgroundImg = $project['backgroundImg'];
				$projectSummary = $project['projectSummary'];
				$projectTools = $project['projectTools'];
				$description = $project['description'];

				$Query = $conn->prepare("INSERT INTO experienceSectionProjects (id, company, position, logo, backgroundImg, projectSummary, projectTools, description)
				VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE company = VALUES(company), position = VALUES(position), logo = VALUES(logo), backgroundImg = VALUES(backgroundImg), projectSummary = VALUES(projectSummary), projectTools = VALUES(projectTools), description = VALUES(description)");
				$Query->bind_param('isssssss', $id, $company, $position, $logo, $backgroundImg, $projectSummary, $projectTools, $description);
				$Query->execute();
				$Query->close();
			}
		}
		foreach ($deleteRecords as $record) {
			$Query = $conn->prepare("DELETE FROM experienceSectionProjects WHERE id = $record");
			$Query->execute();
			$Query->close();
		}
	
	break;

	case 'testimonialsSection':
		$bodyCopy = $p['bodyCopy'];
		$title = mysqli_real_escape_string($conn, $bodyCopy['title']);
		$headerIcon = mysqli_real_escape_string($conn, $bodyCopy['headerIcon']);
		$id = $bodyCopy['id'];

		$sql = "INSERT INTO $table (id, title, headerIcon) VALUES ('$id', '$title', '$headerIcon') ON DUPLICATE KEY UPDATE title='$title', headerIcon='$headerIcon'";

		$quotes = $p['quotes'];
		$deleteRecords = array();
		echo json_encode($quotes);
		if(is_array($quotes)) {
			foreach ($quotes as $quote) {
				if($quote['delete'] == true) {
					array_push($deleteRecords, $quote['id']);
				}
				$id = $quote['id'];
				$author = $quote['author'];
				$image = $quote['image'];

				$quoteText = $quote['quote'];

				$Query = $conn->prepare("INSERT INTO testimonialsSectionQuotes (id, author, image, quote)
				VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE author = VALUES(author), image = VALUES(image), quote = VALUES(quote)");
				$Query->bind_param('isss', $id, $author, $image, $quoteText);
				$Query->execute();
				$Query->close();
			}
		}
		foreach ($deleteRecords as $record) {
			$Query = $conn->prepare("DELETE FROM testimonialsSectionQuotes WHERE id = $record");
			$Query->execute();
			$Query->close();
		}

	break;

	case 'aboutSection':
		$header = $p['header'];
		$title = mysqli_real_escape_string($conn, $header['title']);
		$headerIcon = mysqli_real_escape_string($conn, $header['headerIcon']);
		$portfolioHeader = mysqli_real_escape_string($conn, $header['portfolioHeader']);
		$id = $header['id'];

		$sql = "INSERT INTO $table (id, title, headerIcon, portfolioHeader) VALUES ('$id', '$title', '$headerIcon', '$portfolioHeader') ON DUPLICATE KEY UPDATE title='$title', headerIcon='$headerIcon', portfolioHeader='$portfolioHeader'";

		$deleteRecords = array();
		$deleteLinks = array();

		$paragraphs = $p['paragraphs'];
		if(is_array($paragraphs)) {
			foreach ($paragraphs as $item) {
				if($item['delete'] == true) {
					array_push($deleteRecords, $item['id']);
				}
				$id = $item['id'];
				$title = $item['title'];
				$body = $item['body'];

				$Query = $conn->prepare("INSERT INTO aboutSectionParagraphs (id, title, body)
				VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE title = VALUES(title), body = VALUES(body)");
				$Query->bind_param('iss', $id, $title, $body);
				$Query->execute();
				$Query->close();
			}
		}

		$artLinks = $p['artLinks'];
		if(is_array($artLinks)) {
			foreach ($artLinks as $link) {
				if($link['delete'] == true) {
					array_push($deleteLinks, $link['id']);
				}
				$id = $link['id'];
				$name = $link['name'];
				$image = $link['image'];
				$url = $link['url'];

				$Query = $conn->prepare("INSERT INTO aboutSectionLinks (id, name, image, url)
				VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), image = VALUES(image), url = VALUES(url)");
				$Query->bind_param('isss', $id, $name, $image, $url);
				$Query->execute();
				$Query->close();
			}
		}

		foreach ($deleteRecords as $record) {
			$Query = $conn->prepare("DELETE FROM aboutSectionParagraphs WHERE id = $record");
			$Query->execute();
			$Query->close();
		}
		foreach ($deleteLinks as $link) {
			$Query = $conn->prepare("DELETE FROM aboutSectionLinks WHERE id = $link");
			$Query->execute();
			$Query->close();
		}

	
	break;

	case 'contactSection':
		$title = mysqli_real_escape_string($conn, $p['title']);
		$headerIcon = mysqli_real_escape_string($conn, $p['headerIcon']);
		$intro = mysqli_real_escape_string($conn, $p['intro']);
		$id = $p['id'];

		$sql = "INSERT INTO $table (id, title, headerIcon, intro) VALUES ('$id', '$title', '$headerIcon', '$intro') ON DUPLICATE KEY UPDATE title='$title', headerIcon='$headerIcon', intro='$intro'";

	break;
}

if ($conn->query($sql) !== TRUE) {
	echo "Error: " . $sql . "<br>" . $conn->error;
}

mysqli_close($conn);

?>