<?php include_once $_SERVER['DOCUMENT_ROOT'] .
		'/SmartSocket/includes/helpers.inc.php'; ?>
<!DOCTYPE html>
<html>
	<head>
		<title>Login</title>
		<!--link type="text/css" rel="stylesheet" href="stylesheet.css"/-->
	</head>
	<body>	
		<div id="content">
			<form id="login_form" method="POST" action="?login">
				<label for="username-id">Username:</label>
				<input id="username-id" type="text" name="username" autofocus="autofocus" required="required"/><br/><br/>
				
				<label for="password1-id">Password:</label>
				<input id="password1-id" class="text-input" type="password" name="password" required="required"/><br/><br/>
				
				<input type="submit" value="Login"/>
			</form>
		</div>
	</body>
</html>
