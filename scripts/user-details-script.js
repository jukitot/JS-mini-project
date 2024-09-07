let url = new URL(window.location.href)
let id = parseInt(url.searchParams.get('userId'))
console.log(id);
console.log(url);

function createElement(tag) {
    return document.createElement(tag)
}

let backButton = document.getElementById('back');

backButton.onclick = function () {
    location.href = 'index.html'
}

fetch('https://jsonplaceholder.typicode.com/users/' + id)
    .then(value => value.json())
    .then(info => {
        console.log(info);
        let main = document.getElementsByTagName('main')[0]
        let {id, name, username, phone, email, address, company, website} = info;

        let div = createElement('div')
        div.classList.add('card', 'cardBlock')

        let cardBody = createElement('div')
        cardBody.classList.add('card-body', 'cardBlockBody', 'd-flex', 'flex-column', 'align-items-center')

        let idUser = createElement('h2')
        idUser.innerText = 'User ID: ' + id;

        let nameUser = createElement('h3')
        nameUser.innerText = name;

        let usernameUser = createElement('p');
        usernameUser.innerText = 'Username: ' + username;

        let phoneUser = createElement('p');
        phoneUser.innerText = 'Phone: ' + phone;

        let emailUser = createElement('p');
        emailUser.innerText = 'Email: ' + email;

        let companyTitle = createElement('p');
        companyTitle.style.fontWeight = 'bold'
        companyTitle.innerText = 'Company:'

        let {name: companyName, catchPhrase, bs} = company;

        let nameCompany = createElement('p');
        nameCompany.innerText = 'Company name: ' + companyName;

        let catchPhraseCompany = createElement('p');
        catchPhraseCompany.innerText = 'Catch Phrase Company: ' + catchPhrase

        let bsCompany = createElement('p');
        bsCompany.innerText = 'BS Company: ' + bs;

        let addressTitle = createElement('p');
        addressTitle.style.fontWeight = 'bold';
        addressTitle.innerText = 'Address:'

        let {city, street, geo, suite, zipcode} = address

        let cityUser = createElement('p');
        cityUser.innerText = 'City: ' + city

        let streetUser = createElement('p')
        streetUser.innerText = 'Street: ' + street;

        let suiteUser = createElement('p');
        suiteUser.innerText = 'Suite: ' + suite

        let zipcodeUser = createElement('p');
        zipcodeUser.innerText = 'Zipcode: ' + zipcode

        let {lat, lng} = geo;

        let geoTitle = createElement('p')
        geoTitle.style.fontWeight = 'bold'
        geoTitle.innerText = 'Geo:'

        let latUser = createElement('p')
        latUser.innerText = 'Lat: ' + lat;

        let lngUser = createElement('p')
        lngUser.innerText = 'Lng: ' + lng

        let websiteTitle = createElement('p')
        websiteTitle.style.fontWeight = 'bold';
        websiteTitle.innerText = 'Website:'

        let websiteUser = createElement('a')
        websiteUser.href = 'https://' + website
        websiteUser.innerText = website;


        let btnUserPosts = createElement('button')
        btnUserPosts.innerText = 'Posts of current user'
        btnUserPosts.classList.add('btn', 'btn-info', 'mb-5')


        btnUserPosts.addEventListener('click', function () {
            this.disabled = true;
            fetch('https://jsonplaceholder.typicode.com/users/' + id + '/posts')
                .then(value => value.json())
                .then(posts => {

                    let postsDiv = createElement('div')
                    postsDiv.classList.add('postsDiv', 'mb-5')
                    for (const post of posts) {
                        let {id, title, userId} = post
                        let postBlock = createElement('div')
                        postBlock.classList.add('postBlock')

                        let postTitle = createElement('h2')
                        postTitle.innerText = title[0].toUpperCase() + title.slice(1)

                        let btnPostDetails = createElement('button')
                        btnPostDetails.classList.add('btn', 'btn-warning')
                        btnPostDetails.innerText = 'Post Details'

                        btnPostDetails.onclick = function () {
                            window.location.href = `post-details.html?postId=${id}&userId=${userId}`
                        }


                        postBlock.append(postTitle, btnPostDetails)


                        postsDiv.append(postBlock)
                        main.append(postsDiv)


                    }
                })

        })

        cardBody.append(idUser,
            nameUser,
            usernameUser,
            phoneUser,
            emailUser,
            companyTitle,
            nameCompany,
            catchPhraseCompany,
            bsCompany,
            addressTitle,
            cityUser,
            suiteUser,
            zipcodeUser,
            geoTitle,
            latUser,
            lngUser,
            websiteTitle,
            websiteUser)
        div.append(cardBody)

        main.append(div, btnUserPosts)

    });