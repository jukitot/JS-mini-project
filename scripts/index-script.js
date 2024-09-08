function createElement(tag) {
    return document.createElement(tag)
}

fetch('https://jsonplaceholder.typicode.com/users')
    .then((value) => value.json())
    .then((users) => {
        for (const user of users) {
            let main = document.getElementsByTagName('main')[0]

            let {id, name} = user;

            let div = createElement('div');
            div.classList.add('card', 'cardBlock');

            let cardBody = createElement('div');
            cardBody.classList.add('card-body', 'cardBlockBody', 'd-flex', 'flex-column', 'align-items-center');

            let idUser = createElement('h2');
            idUser.innerText = 'User ID: ' + id;

            let nameUser = createElement('h3');
            nameUser.innerText = name;

            let btnUserDetails = createElement('button');
            btnUserDetails.innerText = 'User Details';
            btnUserDetails.classList.add('btn', 'btn-primary');

            btnUserDetails.onclick = function () {
                location.href = `user-details.html?userId=${id}`
            }

            cardBody.append(idUser, nameUser, btnUserDetails)
            div.append(cardBody)

            main.append(div)
        }
    });