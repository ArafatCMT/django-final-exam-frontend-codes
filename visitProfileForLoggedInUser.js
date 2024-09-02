const CatchParam = () => {
  // const param = new URLSearchParams(window.location.search).get("post_id");
  const param = new URLSearchParams(window.location.search).get("account_id");
  // console.log(param)
  return param;
};

const OtherProfilePosts = () => {
  const accountId = CatchParam();
  const myAccountId = localStorage.getItem("accountId");
  // console.log(accountId)

      fetch(`https://net-book-klqt.onrender.com/posts/all/?account_id=${accountId}`)
        .then((res) => res.json())
        .then((posts) => {
          // console.log(posts)
          const parent = document.getElementById("otherPost");

          if(posts.length === 0)
          {
            document.getElementById("empty").style.display = "block";
          }
          else
          {
            posts.forEach((post) => {
              // console.log(post)
              fetch(`https://net-book-klqt.onrender.com/accounts/profile/${accountId}/`)
                .then((res) => res.json())
                .then((account) => {
                  // console.log(account);
  
                  fetch(`https://net-book-klqt.onrender.com/accounts/user/${account.user}/`)
                    .then((res) => res.json())
                    .then((user) => {
                      // console.log(user);
                      const div = document.createElement("div");
                      div.classList.add("col-lg-12");
                      div.classList.add("col-md-12");
                      div.classList.add("col-sm-12");
                      div.classList.add("mb-5");
  
                      fetch(
                        `https://net-book-klqt.onrender.com/likes/total/?post_id=${post.id}`
                      )
                        .then((res) => res.json())
                        .then((likes) => {
  
                          let is_like = false;
                          // console.log(likes)
                          likes.forEach((like) =>{
                            if(like.account == myAccountId)
                            {
                              is_like = true;
                            }
                          })
  
                          if(is_like == true)
                          {
                            fetch(
                              `https://net-book-klqt.onrender.com/comments/list/?post_id=${post.id}`
                            )
                              .then((res) => res.json())
                              .then((comment) => {
                                div.innerHTML = `
                                  <div class="card mx-auto container col-lg-12 col-md-12 col-sm-12">
                                  <div class="card-body">
                                      <div class="col-12 row">
                                          <div class="col-11 card-body-container mb-2">
                                              <div class="" >
                                              <img src=${
                                                account.image_url
                                              } class="pro-img" alt="profile">
                                              </div>
                                              <div>
                                              <h6 class="title mb-0 pb-0">${
                                                user.first_name +
                                                " " +
                                                user.last_name
                                              }</h6>
                                              <small class="create mt-0 pt-0">Created: ${
                                                post.created_on
                                              }</small>
                                              </div>
                                          </div>
                                      </div>
                                      
                                      <p class="">${post.description}</p>
                                                                     
                                  </div>
                                  <img src=${
                                    post.image_url
                                  } class="card-img-top" alt="...">
                                  <hr>
                                  <div class="d-flex mb-2">
                                      <div class="col-6 text-center">
                                      <a href="#" onclick="Like(event, ${post.id})"><i class="fa-solid fa-thumbs-up fs-5"></i></i></a>
                                      <i class="fs-5">${likes?.length || 0}</i>
                                      </div>
                                      <div class="col-6 text-center">
                                      <a href="./comments.html?post_id=${post.id}"><i class="fa-regular fa-comment fs-5"></i></a>
                                      <i class="fs-5">${comment?.length || 0}</i>
                                  </div> 
                                  <div class="modal fade" id="editModal_${
                                    post.id
                                  }" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      
                                  </div>
                                  </div>
                      `;
                              });
                          }
                          else
                          {
                            fetch(
                              `https://net-book-klqt.onrender.com/comments/list/?post_id=${post.id}`
                            )
                              .then((res) => res.json())
                              .then((comment) => {
                                div.innerHTML = `
                                  <div class="card mx-auto container col-lg-12 col-md-12 col-sm-12">
                                  <div class="card-body">
                                      <div class="col-12 row">
                                          <div class="col-11 card-body-container mb-2">
                                              <div class="" >
                                              <img src=${
                                                account.image_url
                                              } class="pro-img" alt="profile">
                                              </div>
                                              <div>
                                              <h6 class="title mb-0 pb-0">${
                                                user.first_name +
                                                " " +
                                                user.last_name
                                              }</h6>
                                              <small class="create mt-0 pt-0">Created: ${
                                                post.created_on
                                              }</small>
                                              </div>
                                          </div>
                                      </div>
                                      
                                      <p class="">${post.description}</p>
                                                                     
                                  </div>
                                  <img src=${
                                    post.image_url
                                  } class="card-img-top" alt="...">
                                  <hr>
                                  <div class="d-flex mb-2">
                                      <div class="col-6 text-center">
                                      <a href="#" onclick="Like(event, ${post.id})"><i class="fa-regular fa-thumbs-up fs-5"></i></a>
                                      <i class="fs-5">${likes?.length || 0}</i>
                                      </div>
                                      <div class="col-6 text-center">
                                      <a href="./comments.html?post_id=${post.id}"><i class="fa-regular fa-comment fs-5"></i></a>
                                      <i class="fs-5">${comment?.length || 0}</i>
                                  </div> 
                                  <div class="modal fade" id="editModal_${
                                    post.id
                                  }" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      
                                  </div>
                                  </div>
                      `;
                              });
                          }
                        });
                      parent.appendChild(div);
                    });
                });
            });
          }

        });
  // console.log(accountId)
};

const loadOtherProfile = () =>{
  const accountId = CatchParam();
  const user_id = localStorage.getItem("accountId")

    if(accountId == user_id)
    {
      window.location.href = `./profile.html`
    }
  
          fetch(`https://net-book-klqt.onrender.com/accounts/friend/${user_id}/${accountId}/`)
          .then(res => res.json())
          .then(data =>{
            // console.log(data)
            if(data.receiver_account == null)
            { 
              // friend na 
              fetch(`https://net-book-klqt.onrender.com/accounts/send/request/${user_id}/${accountId}/`)
              .then(res => res.json())
              .then(data =>{
                // console.log(data,'ami dei nai')
                if(data.receiver == null)
                { 
                  // friend request dece
                  fetch(`https://net-book-klqt.onrender.com/accounts/send/request/${accountId}/${user_id}/`)
                  .then(res => res.json())
                  .then(data =>{
                    // console.log(data)
                    if(data.sender == accountId)
                    {
                      console.log('dece add friend')
                      fetch(`https://net-book-klqt.onrender.com/accounts/profile/${accountId}/`)
                        .then((res) => res.json())
                        .then((data) => {
                          const topHeader = document.getElementById("top-header");
                          const bottomHeader = document.getElementById("bottom-header");
                          const div = document.createElement("div");
                          const Div = document.createElement("div");
                          div.classList.add("img-div");
                          // console.log(data)
                
                          fetch(`https://net-book-klqt.onrender.com/accounts/user/${data.user}/`)
                            .then((res) => res.json())
                            .then((user) => {
                              // console.log(user)
                              div.innerHTML = `
                              <img class="profile-photo" src=${data.image_url} alt="profile-imag">
                              `;
                              Div.innerHTML = `
                              <h3 class="text-center" id="profile-name">${
                                user.first_name + " " + user.last_name
                              }</h3>

                              <div class="d-flex justify-content-center" style="gap:10px">
                                <div><a onclick="Confirm(event,${accountId})" class="btn btn-primary btn-sm">Confirm</a></div>
                                <div><a onclick="removeRequest(event,${accountId},${0})" class="btn btn-sm btn-danger">Delete</a></div>
                              </div>

                              <div class="mt-4 px-4">
                                <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-circle-info text-secondary"></i> <b>Profile</b> . Digital Creator</p>
                                <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-briefcase text-secondary"></i> Works at Lorem ipsum dolor sit amet</p>
                                <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-graduation-cap text-secondary"></i>  Went to <b>Lorem ipsum dolor sit amet englis</b></p>
                                <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-location-dot text-secondary"></i> From <b>Lorem ipsum, dolor</b></p>
                                <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-heart text-secondary"></i></i> Single</p>
                              </div>
                              `;
                              topHeader.appendChild(div);
                              bottomHeader.appendChild(Div);
                            });
                        });
                      
                    }
                    else
                    {
                      // console.log("na dei nai")
                      fetch(`https://net-book-klqt.onrender.com/accounts/profile/${accountId}/`)
                        .then((res) => res.json())
                        .then((data) => {
                          const topHeader = document.getElementById("top-header");
                          const bottomHeader = document.getElementById("bottom-header");
                          const div = document.createElement("div");
                          const Div = document.createElement("div");
                          div.classList.add("img-div");
                          // console.log(data)
                
                          fetch(`https://net-book-klqt.onrender.com/accounts/user/${data.user}/`)
                            .then((res) => res.json())
                            .then((user) => {
                              // console.log(user)
                              div.innerHTML = `
                              <img class="profile-photo" src=${data.image_url} alt="profile-imag">
                              `;
                              Div.innerHTML = `
                              <h3 class="text-center" id="profile-name">${
                                user.first_name + " " + user.last_name
                              }</h3>
                              <div class="d-flex justify-content-center">
                                <div><a onclick="addFriend(event,${accountId})" class="btn btn-primary btn-sm">Add friend</a></div>
                              </div>
                              <div class="mt-4 px-4">
                                <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-circle-info text-secondary"></i> <b>Profile</b> . Digital Creator</p>
                                <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-briefcase text-secondary"></i> Works at Lorem ipsum dolor sit amet</p>
                                <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-graduation-cap text-secondary"></i>  Went to <b>Lorem ipsum dolor sit amet englis</b></p>
                                <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-location-dot text-secondary"></i> From <b>Lorem ipsum, dolor</b></p>
                                <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-heart text-secondary"></i></i> Single</p>
                              </div>
                              `;
                              topHeader.appendChild(div);
                              bottomHeader.appendChild(Div);
                            });
                        });
                    }
                  })
                }
                else
                {
                  // friend request ami dici 
                  fetch(`https://net-book-klqt.onrender.com/accounts/profile/${accountId}/`)
                    .then((res) => res.json())
                    .then((data) => {
                      const topHeader = document.getElementById("top-header");
                      const bottomHeader = document.getElementById("bottom-header");
                      const div = document.createElement("div");
                      const Div = document.createElement("div");
                      div.classList.add("img-div");
                      // console.log(data)
            
                      fetch(`https://net-book-klqt.onrender.com/accounts/user/${data.user}/`)
                        .then((res) => res.json())
                        .then((user) => {
                          // console.log(user)
                          div.innerHTML = `
                          <img class="profile-photo" src=${data.image_url} alt="profile-imag">
                          `;
                          Div.innerHTML = `
                          <h3 class="text-center" id="profile-name">${
                            user.first_name + " " + user.last_name
                          }</h3>
                          <div class="d-flex justify-content-center">
                            <div><a onclick="removeRequest(event,${accountId},${1})" class="btn btn-danger btn-sm">Cancel</a></div>
                          </div>
                          <div class="mt-4 px-4">
                            <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-circle-info text-secondary"></i> <b>Profile</b> . Digital Creator</p>
                            <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-briefcase text-secondary"></i> Works at Lorem ipsum dolor sit amet</p>
                            <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-graduation-cap text-secondary"></i>  Went to <b>Lorem ipsum dolor sit amet englis</b></p>
                            <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-location-dot text-secondary"></i> From <b>Lorem ipsum, dolor</b></p>
                            <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-heart text-secondary"></i></i> Single</p>
                          </div>
                          `;
                          topHeader.appendChild(div);
                          bottomHeader.appendChild(Div);
                        });
                });
                }
              })
            }
            else
            {
              // friend 
              fetch(`https://net-book-klqt.onrender.com/accounts/profile/${accountId}/`)
              .then((res) => res.json())
              .then((data) => {
                const topHeader = document.getElementById("top-header");
                const bottomHeader = document.getElementById("bottom-header");
                const div = document.createElement("div");
                const Div = document.createElement("div");
                div.classList.add("img-div");
                // console.log(data)
      
                fetch(`https://net-book-klqt.onrender.com/accounts/user/${data.user}/`)
                  .then((res) => res.json())
                  .then((user) => {
                    // console.log(user)
                    div.innerHTML = `
                    <img class="profile-photo" src=${data.image_url} alt="profile-imag">
                    `;
                    Div.innerHTML = `
                    <h3 class="text-center" id="profile-name">${
                      user.first_name + " " + user.last_name
                    }</h3>
                    <div class="d-flex justify-content-center" style="gap:10px;">
                      
                      <div><a onclick="Unfriend(event,${accountId})" class="btn btn-danger btn-sm">Unfriend</a></div>
                    </div>
                    <div class="mt-4 px-4">
                      <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-circle-info text-secondary"></i> <b>Profile</b> . Digital Creator</p>
                      <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-briefcase text-secondary"></i> Works at Lorem ipsum dolor sit amet</p>
                      <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-graduation-cap text-secondary"></i>  Went to <b>Lorem ipsum dolor sit amet englis</b></p>
                      <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-location-dot text-secondary"></i> From <b>Lorem ipsum, dolor</b></p>
                      <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-heart text-secondary"></i></i> Single</p>
                    </div>

                    `;
      
                    // document.getElementById("profile-name").innerText = `${user.first_name+" "+user.last_name}`
                    topHeader.appendChild(div);
                    bottomHeader.appendChild(Div);
              });
          });
            }
          }).catch(err =>console.log(err))


          // friend 
    fetch(`https://net-book-klqt.onrender.com/accounts/receive/accept/?account_id=${accountId}`)
    .then(res => res.json())
    .then(data_1 =>{
      // console.log(data_1)
      fetch(`https://net-book-klqt.onrender.com/accounts/send/accept/?account_id=${accountId}`)
      .then(res => res.json())
      .then(data_2 =>{

        let friends = []

        data_1.forEach((data)=>{
          friends.push(data)
        })
        data_2.forEach((data)=>{
          friends.push(data)
        })
        document.getElementById("friend-number").innerText = `${friends?.length||0} friends`
        const parent = document.getElementById("friend-container")
        len = friends.length
        
        if(len === 0)
        {
          document.getElementById("empty-friend-img").style.display = "block";
        }
        else
        {
          document.getElementById("empty-friend-img").style.display = "none";
        }
        for (let i = 0; i < len; i++) {
          const div = document.createElement("div")
          div.classList.add("col-12");
          div.classList.add("border");
          div.classList.add("mx-auto");
          div.classList.add("mb-2");
          div.classList.add("mt-2");
          div.style.borderRadius = "5px"

          if(friends[i].receiver_account == accountId)
          {
            fetch(`https://net-book-klqt.onrender.com/accounts/profile/${friends[i].sender_account}/`)
            .then((res) => res.json())
            .then((account) => {
            // console.log(account, account.id)
              fetch(`https://net-book-klqt.onrender.com/accounts/user/${account.user}/`)
              .then((res) => res.json())
              .then(user =>{
                div.innerHTML = `
            
                  <div class="col-11 card-body-container">
                    <div class="p-1">
                      <img src=${account.image_url} class="pro-img mt-1 ms-1" alt="">
                    </div>
                    <div>
                        <h6 class="title mb-0 pb-0 mt-1 me-5" style="color:rgb(62, 61, 61);"><b>${user.first_name + " " + user.last_name}</b></h6>
                    </div>
                </div>

                `;
              })
            })
          }
          if(friends[i].sender_account == accountId)
          {
            fetch(`https://net-book-klqt.onrender.com/accounts/profile/${friends[i].receiver_account}/`)
            .then((res) => res.json())
            .then((account) => {
              // console.log(account)
              fetch(`https://net-book-klqt.onrender.com/accounts/user/${account.user}/`)
              .then((res) => res.json())
              .then(user =>{
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
              })
            })
          }
          parent.appendChild(div)
        }
      })
    }) 
    // end 
}
const addFriend = (event, id) => {
  event.preventDefault();
  // console.log('hello', id);
  const token = localStorage.getItem("authToken");

  fetch(`https://net-book-klqt.onrender.com/accounts/profile/${id}/`)
    .then((res) => res.json())
    .then((data) => {
      const receiver = {
        receiver: data.id, // Send the ID only
      };
      console.log(receiver);
      console.log(JSON.stringify(receiver));
      fetch(`https://net-book-klqt.onrender.com/accounts/friend/request/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(receiver),
      })
      .then(res => {
        if (res.ok) {
          console.log("Friend request sent successfully.");
        } else {
          console.log("Failed to send friend request.");
        }
        return res.json();
      })
      .then(responseData => console.log(responseData))
      .then(data => window.location.href = `./visitProfileForLoggedInUser.html?account_id=${id}`)

    })
};

const removeRequest = (event, id, track) =>{
  event.preventDefault();
  const token = localStorage.getItem("authToken");
  const accountId = localStorage.getItem("accountId")
  // console.log(id)
  // console.log(accountId)

  // ami dici 
  if(track == 1)
  {
    // console.log(track)
    fetch(`https://net-book-klqt.onrender.com/accounts/accept/${accountId}/${id}/${0}/`,{
      method:"GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
    .then(res => res.json())
    .then(data => window.location.href = `./visitProfileForLoggedInUser.html?account_id=${id}`)
 
  }
  else
  {
    fetch(`https://net-book-klqt.onrender.com/accounts/accept/${id}/${accountId}/${0}/`,{
      method:"GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
    .then(res => res.json())
    .then(data => window.location.href = `./visitProfileForLoggedInUser.html?account_id=${id}`)

  }
}

const Confirm = (event, id)=>{
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
  .then(data => window.location.href = `./visitProfileForLoggedInUser.html?account_id=${id}`)
;
}

const Unfriend = (event, id) =>{
  event.preventDefault();
  const token = localStorage.getItem("authToken");

  fetch(`https://net-book-klqt.onrender.com/accounts/unfriend/${id}/`,{
    method:"GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
  .then(res => res.json())
  .then(data => window.location.href = `./visitProfileForLoggedInUser.html?account_id=${id}`)
}


loadOtherProfile()
OtherProfilePosts()

// const loadOtherProfile = () => {
//   const accountId = CatchParam();

//       fetch(`https://net-book-klqt.onrender.com/accounts/profile/${accountId}/`)
//         .then((res) => res.json())
//         .then((data) => {
//           const topHeader = document.getElementById("top-profile");
//           const bottomHeader = document.getElementById("bottom-profile");
//           const div = document.createElement("div");
//           const Div = document.createElement("div");
//           div.classList.add("img-div");
//           // console.log(data)

//           fetch(`https://net-book-klqt.onrender.com/accounts/user/${data.user}/`)
//             .then((res) => res.json())
//             .then((user) => {
//               // console.log(user)
//               div.innerHTML = `
//               <img class="profile-photo" src=${data.image_url} alt="profile-imag">
//               `;
//               Div.innerHTML = `
//               <h3 class="text-center" id="profile-name">${
//                 user.first_name + " " + user.last_name
//               }</h3>

//               <div class="mt-5 ps-2">
//                 <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-circle-info text-secondary"></i> <b>Profile</b> . Digital Creator</p>
//                 <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-briefcase text-secondary"></i> Works at Lorem ipsum dolor sit amet</p>
//                 <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-graduation-cap text-secondary"></i> Went to <b>Lorem ipsum dolor sit amet consectetur</b></p>
//                 <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-location-dot text-secondary"></i> From <b>Lorem ipsum, dolor</b></p>
//                 <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-heart text-secondary"></i></i> Single</p>
//               </div>

//               `;

//               topHeader.appendChild(div);
//               bottomHeader.appendChild(Div);
//             });
//         });
// };


