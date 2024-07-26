const addPost = (event) => {
  event.preventDefault();
  const form = document.getElementById("post-form");
  const formData = new FormData(form);
  const description = formData.get("description");
  const image = formData.get("image");

  const token = localStorage.getItem("authToken");
  // console.log('form add post', token)

  const data = new FormData();
  data.append("image", image);

  // img bb te img upload korlam
  fetch("https://api.imgbb.com/1/upload?key=b29cc2bf7ebe056ece5196c75e1d51a0", {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.data.url)
      const postData = {
        description: description,
        image_url: data.data.url,
      };
      console.log(data.data.url);
      console.log("postData", postData);

      fetch("http://127.0.0.1:8000/posts/upload/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(postData),
      })
        .then((res) => res.json())
        .then((data) => (window.location.href = "./home.html"));
    });
};

const getAllPost = () => {
    // total post 
  fetch("http://127.0.0.1:8000/posts/all/")
    .then((res) => res.json())
    .then((posts) => {
      const parent = document.getElementById("allPost");

      posts.forEach((post) => {
        // console.log(post)
        // kon account thake post kora hoica
        fetch(`http://127.0.0.1:8000/accounts/profile/${post.account}/`)
          .then((res) => res.json())
          .then((account) => {
            // console.log(account)

            // account er first_name r last_name bair kortaci
            fetch(`http://127.0.0.1:8000/accounts/user/${account.user}/`)
              .then((res) => res.json())
              .then((user) => {
                // console.log(user);
                const div = document.createElement("div");
                div.classList.add("col-lg-12");
                div.classList.add("col-md-12");
                div.classList.add("col-sm-12");
                div.classList.add("mb-5");

                // ak ta post e total like bair kortaci
                fetch(`http://127.0.0.1:8000/likes/total/?post_id=${post.id}`)
                  .then((res) => res.json())
                  .then((like) => {

                    // ak ta post e total comment bair kortaci
                    fetch(
                      `http://127.0.0.1:8000/comments/list/?post_id=${post.id}`
                    )
                      .then((res) => res.json())
                      .then((comment) => {
                        div.innerHTML = `
                            <div class="card mx-auto container" style="width: 50rem;">
                            <div class="card-body">
                                <div class="card-body-container mb-2">
                                    <a href="./visitProfileForLoggedInUser.html?account_id=${post.account}"><div>
                                        <img src=${
                                          account.image_url
                                        } class="pro-img" alt="profile">
                                    </div></a>
                                    <div>
                                        <a href="./visitProfileForLoggedInUser.html?account_id=${post.account}" class="link" ><h6 class="title pb-0 mb-0">${
                                          user.first_name + " " + user.last_name
                                        }</h6></a>
                                        <small class="create mt-0 pt-0">Created: ${
                                          post.created_on
                                        }</small>
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

const PostModal = () => {
  const post_modal = document.getElementById("post-modal");

  const div = document.createElement("div");

  div.innerHTML = `
    <div class="modal fade" id="createPostModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title text-secondary" id="exampleModalLabel"><b>Create Post</b></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form onsubmit="addPost(event)" id="post-form" method="post" enctype="multipart/form-data">
          <div class="mb-3">
              <label for="image" class="form-label">Image </label>
              <!-- <input id="image" type="file" name="image" accept="image/png, image/gif,image/jpeg"/> -->
              <input type="file" id="imageUpload" name="image" accept="image/*" required>
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea class="form-control" id="description" rows="6" name="description" placeholder="What's on your mind?.." required></textarea>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Create Post</button>
            </div>
      </form>
      </div>
      
    </div>
  </div>
</div>
    `;
  post_modal.appendChild(div);
};
