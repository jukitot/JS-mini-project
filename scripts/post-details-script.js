let url = new URL(window.location.href)
let id = parseInt(url.searchParams.get('postId'))
let userId = parseInt(url.searchParams.get('userId'))

function createElement(tag) {
    return document.createElement(tag)
}

let mainPageButton = document.getElementById('mainPage');
mainPageButton.onclick = function () {
    location.href = 'index.html'
}

let backButton = document.getElementById('back');
backButton.onclick = function () {
    location.href = 'user-details.html?userId=' + userId
}

fetch('https://jsonplaceholder.typicode.com/posts/' + id)
    .then(value => value.json())
    .then(post => {
        let {userId, id, title, body} = post

        let main = document.getElementsByTagName('main')[0]

        let div = createElement('div')
        div.classList.add('card', 'cardBlock')

        let cardBody = createElement('div')
        cardBody.classList.add('card-body', 'cardBlockBody', 'd-flex', 'flex-column', 'align-items-center')

        let postId = createElement('h2');
        postId.innerText = 'Post ID: ' + id;

        let idOfUser = createElement('h4');
        idOfUser.innerText = 'User ID: ' + userId

        let titlePost = createElement('h3');
        titlePost.innerText = title[0].toUpperCase() + title.slice(1);

        let bodyPost = createElement('p');
        bodyPost.innerText = body[0].toUpperCase() + body.slice(1);

        let buttonComments = createElement('button');
        buttonComments.classList.add('btn', 'btn-info')
        buttonComments.innerText = 'Comments of this post'

        fetch('https://jsonplaceholder.typicode.com/posts/' + id + '/comments')
            .then(value => value.json())
            .then(comments => {
                let commentsBlock = createElement('div')

                commentsBlock.classList.add('commentsBlock', 'mb-5')
                for (const comment of comments) {
                    let commentBlock = createElement('div')
                    commentBlock.classList.add('commentBlock')
                    let {id, email, name, body} = comment

                    let commentId = createElement('h3');
                    commentId.innerText = 'Comment ID: ' + id;

                    let emailComment = createElement('p');
                    emailComment.innerText = email;

                    let nameComment = createElement('p');
                    nameComment.style.fontWeight = 'bold'
                    nameComment.innerText = name[0].toUpperCase() + name.slice(1);

                    let bodyComment = createElement('p');
                    bodyComment.innerText = body[0].toUpperCase() + body.slice(1);

                    commentBlock.append(commentId, emailComment, nameComment, bodyComment)

                    commentsBlock.append(commentBlock)
                }
                main.append(commentsBlock)
            })
        cardBody.append(postId, idOfUser, titlePost, bodyPost)
        div.append(cardBody)
        main.append(div)
    })

