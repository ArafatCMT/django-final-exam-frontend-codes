const getQueryParam = () =>{
    const param = new URLSearchParams(window.location.search).get('post_id')
    // console.log(param)
    return param
}

const showPost = () =>{
    const postId = getQueryParam()
    loadComment()
    // console.log(postId)

    const token = localStorage.getItem("authToken")
    const parent = document.getElementById('post_section')
    
    // post 
    fetch(`http://127.0.0.1:8000/posts/detail/${postId}/`,{
        method:"GET",
        headers:{
                "content-type" : "application/json",
                Authorization : `Token ${token}`
        },

    })
    .then(res => res.json())
    .then(post =>{
        // console.log(post)
        // hello
        fetch(`http://127.0.0.1:8000/accounts/profile/${post.account}/`)
                .then(res => res.json())
                .then(account => {
                    // console.log(account.image_url)

                    fetch(`http://127.0.0.1:8000/accounts/user/${account.user}/`)
                    .then(res => res.json())
                    .then(user => {
                        // console.log(user)
                    const div = document.createElement('div')
                    div.classList.add("col-lg-12")
                    div.classList.add("col-md-12")
                    div.classList.add("col-sm-12")
                    div.classList.add("mb-5")

                    fetch(`http://127.0.0.1:8000/likes/total/?post_id=${post.id}`)
                    .then(res => res.json())
                    .then(like =>{

                        fetch(`http://127.0.0.1:8000/comments/list/?post_id=${post.id}`)
                        .then(res => res.json())
                        .then(comment =>{
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
                                        <small class="create pt-0 mt-0">Created: ${post.created_on}</small>
                                    </div>
                                </div>
                                
                                <p class="">${post.description}</p>
                                                               
                            </div>
                            <img src=${post.image_url} class="card-img-top" alt="...">
                            <hr>
                            <div class="d-flex mb-2">
                                <div class="col-6 text-center">
                                <a href="#" onclick="Like_A_Post(event, ${post.id})"><i class="fa-regular fa-thumbs-up fs-5"></i></a>
                                <i class="fs-5">${like?.length||0}</i>
                                </div>
                                <div class="col-6 text-center">
                                <a href="./comments.html?post_id=${post.id}"><i class="fa-regular fa-comment fs-5"></i></a>
                                
                                <i class="fs-5">${comment?.length||0}</i>
                                </div>
                            </div> 

                            <div class="comment-form mb-3">
                            <form id="post-update-form" onsubmit="SubmitComment(event,${postId})" >
                                <div class="mb-3">
                                <textarea class="form-control" id="comment" rows="2" name="comment" placeholder="Write a comment...." required></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary">Comment</button>
                            </form>
                            </div>
                            </div>
                `
                        })
                    })
                parent.appendChild(div)
                    })

                })
        // hello
    })
}

const SubmitComment = (event,id) =>{
    event.preventDefault()
    // console.log(id)

    const token = localStorage.getItem("authToken")

    const form = document.getElementById("post-update-form")
    const formData = new FormData(form)
    const body = formData.get('comment')

    // console.log(body)

    fetch(`http://127.0.0.1:8000/posts/detail/${id}/`,{
        method:"GET",
        headers:{
                "content-type" : "application/json",
                Authorization : `Token ${token}`
        },

    })
    .then(res => res.json())
    .then(post =>{

        const commentData = {
            post : post.id,
            body : body
        }
        // console.log(commentData)
        // console.log(JSON.stringify(commentData))

        fetch('http://127.0.0.1:8000/comments/post/',{
            method:"POST",
            headers:{
                "content-type" : "application/json",
                Authorization : `Token ${token}`

            },
            body: JSON.stringify(commentData)
        })
        .then(res => res.json())
        .then(data => window.location.href=`./comments.html?post_id=${id}`)
        .catch(err => console.log(err))
    })

}

const loadComment = () =>{
    const postId = getQueryParam()
    // console.log('nice',postId)

    const token = localStorage.getItem("authToken")
    const parent = document.getElementById('comment_section')

    fetch(`http://127.0.0.1:8000/comments/list/?post_id=${postId}`,{
        method:"GET",
        headers:{
            "content-type" : "application/json",
            Authorization : `Token ${token}`
        },
    })
    .then(res => res.json())
    .then(comments =>{
        // console.log(comments)
        
        comments.forEach(comment =>{
            const div = document.createElement('div')

            fetch(`http://127.0.0.1:8000/accounts/profile/${comment.account}/`)
            .then(res => res.json())
            .then(account =>{
                // console.log(account)
                fetch(`http://127.0.0.1:8000/accounts/user/${account.user}/`)
                .then(res => res.json())
                .then(user =>{
                    // console.log(user)
                    div.innerHTML = `
                <div class="card-body mb-3 border col-10 mx-auto">
                <div class="col-11 card-body-container mb-2">
                    <a href="./visitProfileForLoggedInUser.html?account_id=${comment.account}"><div>
                                        <img src=${
                                          account.image_url
                                        } class="pro-img" alt="profile">
                                    </div></a>
                    <div>
                    <a href="./visitProfileForLoggedInUser.html?account_id=${comment.account}" class="link" ><h6 class="title pb-0 mb-0">${
                                          user.first_name + " " + user.last_name
                                        }</h6></a>
                    <small class="small pt-0 mt-0">Created : ${comment.created_on}</small>
                    </div>
                </div>
                
                <p class="card-text">${comment.body}</p>
                </div>
            `
            parent.appendChild(div)
                })
            })
        })
    })
}


