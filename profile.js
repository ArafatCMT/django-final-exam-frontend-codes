const myPosts = () => {
  const accountId = localStorage.getItem("accountId");
  // console.log(accountId)
  fetch(`https://net-book.onrender.com/posts/all/?account_id=${accountId}`)
    .then((res) => res.json())
    .then((posts) => {
      // console.log(posts)
      const parent = document.getElementById("myPost");

      posts.forEach((post) => {
        // console.log(post)
        fetch(`https://net-book.onrender.com/accounts/profile/${post.account}/`)
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

                fetch(`https://net-book.onrender.com/likes/total/?post_id=${post.id}`)
                  .then((res) => res.json())
                  .then((like) => {
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
                                        } class="pro-img" alt="">
                                        </div>
                                        <div>
                                        <h6 class="title mb-0 pb-0">${
                                          user.first_name + " " + user.last_name
                                        }</h6>
                                        <small class="create mt-0 pt-0">Created: ${
                                          post.created_on
                                        }</small>
                                        </div>
                                    </div>
                                    
                                    <div class="col-1 text-center">
                                    <div class="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        Action
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><a class="dropdown-item" href="./profile.html?id=${
                                              post.id
                                            }" data-bs-toggle="modal" data-bs-target="#editModal_${
                          post.id
                        }">Edit</a></li>
                                            <li><a class="dropdown-item" href="#" onclick="deletePost(event,${
                                              post.id
                                            })">Delete</a></li>
                                        </ul>
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
                                <a href="#" onclick="Like_A_Post(event, ${
                                  post.id
                                })"><i class="fa-regular fa-thumbs-up fs-5"></i></a>
                                <i class="fs-5">${like?.length || 0}</i>
                                </div>
                                <div class="col-6 text-center">
                                <a href="./comments.html?post_id=${
                                  post.id
                                }"><i class="fa-regular fa-comment fs-5"></i></a>
                                <i class="fs-5">${comment?.length || 0}</i>
                            </div> 
                            
                            <div class="modal fade" id="editModal_${
                              post.id
                            }" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Update Your Post</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    
                                    <form id="post-update-form_${
                                      post.id
                                    }" onsubmit="editPost(event,${post.id})">
                                    <div class="mb-3">
                                        <label for="description" class="form-label">Description</label>
                                        <textarea class="form-control" id="post-description" rows="8" name="post-description">${
                                          post.description
                                        }</textarea>
                                    </div>
                                    
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">Save</button>
                                    </div>
                                    </form>
                                </div>
                                </div>
                            </div>

                            </div>
                            </div>
                `;
                      });
                  });
                parent.appendChild(div);
              });
          });
      });
    });
};

const deletePost = (event, id) => {
  console.log(id);
  // const postId = getqueryParam("id")
  event.preventDefault();
  // console.log(postId)
  const token = localStorage.getItem("authToken");

  fetch(`https://net-book.onrender.com/posts/detail/${id}/`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => (window.location.href = "./profile.html"))
    .catch((err) => console.log(err));
};

const Like_A_Post = (event, id) => {
  event.preventDefault();
  // console.log(id)
  const token = localStorage.getItem("authToken");
  // console.log(token)

  fetch(`https://net-book.onrender.com/posts/detail/${id}/`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((post) => {
      const likeData = {
        post: post.id,
      };

      fetch("https://net-book.onrender.com/likes/like/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(likeData),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    })
    .catch((err) => console.log(err));
};

const loadProfileData = () => {
  accountId = localStorage.getItem("accountId");
  // console.log(accountId)

  fetch(`https://net-book.onrender.com/accounts/profile/${accountId}/`)
    .then((res) => res.json())
    .then((data) => {
      const topHeader = document.getElementById("top-header");
      const bottomHeader = document.getElementById("bottom-header");
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
            <p class="text-center"><button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#profileModal">
            Edit Profile
            </button></p>

            `;

          // document.getElementById("profile-name").innerText = `${user.first_name+" "+user.last_name}`
          topHeader.appendChild(div);
          bottomHeader.appendChild(Div);

          document.getElementById("phone").value = `${data.phone_no}`;
          document.getElementById("address").value = `${data.city}`;
        });
    });
};

const UpdateProfileData = (event) => {
  event.preventDefault();

  const form = document.getElementById("profile-form");
  const formData = new FormData(form);
  const image = formData.get("image");
  const address = formData.get("address");
  const phone_no = formData.get("phone");

  const token = localStorage.getItem("authToken");
  const accountId = localStorage.getItem("accountId");
  const data = new FormData();
  data.append("image", image);

  // img bb te img upload korlam
  fetch("https://api.imgbb.com/1/upload?key=b29cc2bf7ebe056ece5196c75e1d51a0", {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const profileData = {
        image_url: data.data.url,
        phone_no: phone_no,
        city: address,
      };
      fetch(`https://net-book.onrender.com/accounts/profile/${accountId}/`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(profileData),
      })
        .then((res) => res.json())
        .then((data) => (window.location.href = "./profile.html"))
        .catch((err) => console.log(data));
    })
    .catch((err) => console.log(err));
};

loadProfileData();
myPosts();

// https://youtu.be/i0ar7W98Osc?si=CEf2IQQnIFWYxQYK
