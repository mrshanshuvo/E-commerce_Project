<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login/Signup</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <div class="container">
        <div class="form-container">
            <h1>Welcome</h1>

            <!-- Login Form -->
            <form action="login.php" method="POST" class="form">
                <h2>Login</h2>
                <input type="email" name="email" placeholder="Email" required aria-label="Email for login">
                <input type="password" name="password" placeholder="Password" required aria-label="Password for login">
                <button type="submit">Login</button>
            </form>

            <!-- Signup Form -->
            <form action="signup.php" method="POST" class="form">
                <h2>Signup</h2>
                <input type="text" name="full_name" placeholder="Full Name" required aria-label="Full Name for signup">
                <input type="email" name="email" placeholder="Email" required aria-label="Email for signup">
                <input type="password" name="password" placeholder="Password" required aria-label="Password for signup">
                <input type="password" name="confirm_password" placeholder="Confirm Password" required
                    aria-label="Confirm Password for signup">
                <button type="submit">Signup</button>
            </form>
        </div>
    </div>
</body>

</html>