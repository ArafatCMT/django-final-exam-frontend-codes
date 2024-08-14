fetch("navbar.html")
.then(res => res.text())
.then(data =>{
    document.getElementById("navbar").innerHTML = data

    // assign auth Element

    const navLeftSideElement = document.getElementById("nav-left-container")
    const navRightSideElement = document.getElementById("nav-right-container")

    const token = localStorage.getItem("authToken")
    // console.log(token)

    if (token){
        const parent = document.getElementById("net-book")
        parent.innerHTML = `<a class="navbar-brand" id="navbar-brand" href="./home.html">Net Book</a>`
        navLeftSideElement.innerHTML += `
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="./home.html">Dashboard</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link addPost"  data-bs-toggle="modal" data-bs-target="#createPostModal">AddPost</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Video</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Notification</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Contact</a>
                            </li>

                            `;

        navRightSideElement.innerHTML +=`
                            
                            <li class="nav-but mb-2">
                                <a class="profile-btn button" href="./profile.html">Profile</a>
                            </li>
                            <li class="nav-but">
                                <a class="logout-btn button" onclick="handleLogout()">Logout</a>
                            </li>
                            

                            `;

    }
    else{
        const parent = document.getElementById("net-book")
        parent.innerHTML = `<a class="navbar-brand" id="navbar-brand" href="./index.html">Net Book</a>`
        navLeftSideElement.innerHTML += `
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="./index.html">Dashboard</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Video</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Notification</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Contact</a>
                            </li>

                            `;
        navRightSideElement.innerHTML +=`
                            <li class="nav-but mb-2">
                                <a class="signup-btn button" href="./registration.html">SignUp</a>
                            </li>
                            <li class="nav-but">
                                <a class="login-btn button" href="./login.html">Login</a>
                            </li>
                            `;
    }
});
