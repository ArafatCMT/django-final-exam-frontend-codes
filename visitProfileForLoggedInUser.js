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

      fetch(`https://net-book.onrender.com/posts/all/?account_id=${accountId}`)
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
              fetch(`https://net-book.onrender.com/accounts/profile/${accountId}/`)
                .then((res) => res.json())
                .then((account) => {
                  // console.log(account);
  
                  fetch(`https://net-book.onrender.com/accounts/user/${account.user}/`)
                    .then((res) => res.json())
                    .then((user) => {
                      // console.log(user);
                      const div = document.createElement("div");
                      div.classList.add("col-lg-12");
                      div.classList.add("col-md-12");
                      div.classList.add("col-sm-12");
                      div.classList.add("mb-5");
  
                      fetch(
                        `https://net-book.onrender.com/likes/total/?post_id=${post.id}`
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
                              `https://net-book.onrender.com/comments/list/?post_id=${post.id}`
                            )
                              .then((res) => res.json())
                              .then((comment) => {
                                div.innerHTML = `
                                  <div class="card mx-auto container" style="width: 50rem;">
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
                              `https://net-book.onrender.com/comments/list/?post_id=${post.id}`
                            )
                              .then((res) => res.json())
                              .then((comment) => {
                                div.innerHTML = `
                                  <div class="card mx-auto container" style="width: 50rem;">
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

const loadOtherProfile = () => {
  const accountId = CatchParam();

      fetch(`https://net-book.onrender.com/accounts/profile/${accountId}/`)
        .then((res) => res.json())
        .then((data) => {
          const topHeader = document.getElementById("top-profile");
          const bottomHeader = document.getElementById("bottom-profile");
          const div = document.createElement("div");
          const Div = document.createElement("div");
          div.classList.add("img-div");
          // console.log(data)

          fetch(`https://net-book.onrender.com/accounts/user/${data.user}/`)
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

              <div class="mt-5">
                <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-circle-info text-secondary"></i> <b>Profile</b> . Digital Creator</p>
                <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-briefcase text-secondary"></i> Works at Lorem ipsum dolor sit amet</p>
                <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-graduation-cap text-secondary"></i> Went to <b>Lorem ipsum dolor sit amet consectetur</b></p>
                <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-location-dot text-secondary"></i> From <b>Lorem ipsum, dolor</b></p>
                <p class="mt-0 pt-0" style="color: rgb(62, 61, 61);"><i class="fa-solid fa-heart text-secondary"></i></i> Single</p>
              </div>

              `;

              // document.getElementById("profile-name").innerText = `${user.first_name+" "+user.last_name}`
              topHeader.appendChild(div);
              bottomHeader.appendChild(Div);
            });
        });
};

loadOtherProfile()
OtherProfilePosts()
