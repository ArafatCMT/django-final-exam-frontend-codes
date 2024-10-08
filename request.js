const myProfile_ = () =>{
    const accountId = localStorage.getItem("accountId")

    const profile_card = document.getElementById("profile-link")
    fetch(`https://net-book-klqt.onrender.com/accounts/profile/${accountId}/`)
    .then((res) => res.json())
    .then((account) => {

      fetch(`https://net-book-klqt.onrender.com/accounts/user/${account.user}/`)
              .then((res) => res.json())
              .then((user) => {
                const div = document.createElement("div");
                div.innerHTML = `
                <div class="col-11 card-body-container mb-2">
                    <div class="p-1">
                      <img src=${account.image_url} class="pro-img mt-1 ms-1" alt="">
                    </div>
                    <div>
                        <h6 class="title mb-0 pb-0 mt-1 me-5" style="color:rgb(62, 61, 61);"><b>${user.first_name + " " + user.last_name}</b></h6>
                    </div>
                </div>
                `;
                profile_card.appendChild(div)
              })
    })

    const pro_file = document.getElementById("profile-1")
    fetch(`https://net-book-klqt.onrender.com/accounts/profile/`)
    .then((res) => res.json())
    .then((accounts) => {
      
      accounts.forEach((account) =>{
        if(account.id != accountId)
        {
          fetch(`https://net-book-klqt.onrender.com/accounts/user/${account.user}/`)
              .then((res) => res.json())
              .then((user) => {
                const div = document.createElement("div");
                div.classList.add("pro-card")
                div.innerHTML = `
                <a href="./visitProfileForLoggedInUser.html?account_id=${account.id}" style="text-decoration: none;">
                <div class="col-12 card-body-container mb-1 border" style="border-radius: 7px;">
                    <div class="p-1">
                      <img src=${account.image_url} class="pro-img mt-1 ms-1" alt="">
                    </div>
                    <div>
                        <h6 class="title mb-0 pb-0 mt-1 me-5" style="color:rgb(62, 61, 61);"><b>${user.first_name + " " + user.last_name}</b></h6>
                    </div>
                </div>
                </a>
                `;
                pro_file.appendChild(div)
              })
        }
      })
    })
}
const loadRequest = () =>{
  const accountId = localStorage.getItem("accountId")
  fetch(`https://net-book-klqt.onrender.com/accounts/receive/request/?account_id=${accountId}`)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data.length)
    // console.log(data)
    if(data.length === 0)
    {
      document.getElementById("request").style.display = "block";
    }
    else
    {
      document.getElementById("request").style.display = "none";
      const parent = document.getElementById("allRequest")

      data.forEach((obj) =>{
        fetch(`https://net-book-klqt.onrender.com/accounts/profile/${obj.sender}/`)
        .then(res => res.json())
        .then(account => {
          
          fetch(`https://net-book-klqt.onrender.com/accounts/user/${account.user}/`)
            .then((res) => res.json())
            .then((user) => {
              // console.log(user)

              const div = document.createElement("div")
              div.classList.add("col-lg-11")
              div.classList.add("col-md-11")
              div.classList.add("col-sm-6")
              div.classList.add("mt-3")
              div.classList.add("mx-auto")
              

              div.innerHTML = `

                <div class="card">
                <a href="./visitProfileForLoggedInUser.html?account_id=${account.id}" style="text-decoration: none;">
                  <div class="col-12 card-body-container mb-1">
                    <div class="p-1">
                      <img src=${account.image_url} class="pro-img mt-1 ms-1" alt="">
                    </div>
                    <div>
                        <h6 class="title mb-0 pb-0 mt-1 me-5" style="color:rgb(62, 61, 61);"><b>${user.first_name + " " + user.last_name}</b></h6>
                    </div>
                  </div>
                  </a>

                  <div class="ms-auto mb-2 me-1">
                  <a onclick="Confirm_(event,${account.id})" class="btn btn-success btn-sm mx-1">Confirm</a> <a onclick="RemoveRequest(event,${account.id})" class="btn btn-danger btn-sm mx-1">Delete</a>
                  </div>
                </div>

              `;

              parent.appendChild(div)
            })
        })
      })
    }
  })
}
const RemoveRequest = (event, id) =>{
  event.preventDefault();
  const token = localStorage.getItem("authToken");
  const accountId = localStorage.getItem("accountId")

  
    fetch(`https://net-book-klqt.onrender.com/accounts/accept/${id}/${accountId}/${0}/`,{
      method:"GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      window.location.href = `./request.html`
    })
    
}
const Confirm_ = (event, id)=>{
  event.preventDefault();
  const token = localStorage.getItem("authToken");
  const accountId = localStorage.getItem("accountId")

  fetch(`https://net-book-klqt.onrender.com/accounts/accept/${id}/${accountId}/${1}/`,{
    method:"GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${token}`,
    },
  })

  .then(res => res.json())
  .then(data => {
    console.log(data)
    window.location.href = `./request.html`
  })
}

// myProfile_()
// loadRequest()