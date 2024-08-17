const Friends = () =>{
    const accountId = localStorage.getItem("accountId")
    console.log(accountId)
// friend 
fetch(`https://net-book.onrender.com/accounts/receive/accept/?account_id=${accountId}`)
.then(res => res.json())
.then(data_1 =>{
  console.log(data_1)
  fetch(`https://net-book.onrender.com/accounts/send/accept/?account_id=${accountId}`)
  .then(res => res.json())
  .then(data_2 =>{
    console.log(data_1)
    let friends = []

    data_1.forEach((data)=>{
      friends.push(data)
    })
    data_2.forEach((data)=>{
      friends.push(data)
    })
    // document.getElementById("friend-number").innerText = `${friends?.length||0} friends`
    const parent = document.getElementById("Friends")
    len = friends.length
    
    if(len === 0)
    {
      document.getElementById("f-img").style.display = "block";
    }
    else
    {
      document.getElementById("f-img").style.display = "none";
    }

    for (let i = 0; i < len; i++) {
        const div = document.createElement("div")
        div.classList.add("col-lg-11")
        div.classList.add("col-md-11")
        div.classList.add("col-sm-6")
        div.classList.add("mt-3")
        div.classList.add("p-1")
        div.classList.add("mx-auto")
        div.classList.add("border");
        div.style.borderRadius = "5px"

      if(friends[i].receiver_account == accountId)
      {
        fetch(`https://net-book.onrender.com/accounts/profile/${friends[i].sender_account}/`)
        .then((res) => res.json())
        .then((account) => {
        // console.log(account)
          fetch(`https://net-book.onrender.com/accounts/user/${friends[i].sender_account}/`)
          .then((res) => res.json())
          .then(user =>{
            div.innerHTML = `
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
            `;
          })
        })
      }
      if(friends[i].sender_account == accountId)
      {
        fetch(`https://net-book.onrender.com/accounts/profile/${friends[i].receiver_account}/`)
        .then((res) => res.json())
        .then((account) => {
        //   console.log(account)
          fetch(`https://net-book.onrender.com/accounts/user/${friends[i].receiver_account}/`)
          .then((res) => res.json())
          .then(user =>{
            div.innerHTML = `
            <a href="./visitProfileForLoggedInUser.html?account_id=${account.id}" style="text-decoration: none;">
              <div class="col-11 card-body-container mb-2">
                <div class="p-1">
                  <img src=${account.image_url} class="pro-img mt-1 ms-1" alt="">
                </div>
                <div>
                    <h6 class="title mb-0 pb-0 mt-1 me-5" style="color:rgb(62, 61, 61);"><b>${user.first_name + " " + user.last_name}</b></h6>
                </div>
                
            </div>
            </a>
            `;
          })
        })
      }
      parent.appendChild(div)
    }
  })
}) 
// end 
};