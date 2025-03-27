
let displayLikes = document.querySelector('#likes-display');
let displayDisLikes = document.querySelector('#dislikes-display');
let displayTotal = document.querySelector('#total-display');
let likesBtn = document.querySelector('#likes-btn');
let dislikesBtn = document.querySelector('#dislikes-btn');

// Retrieve stored values or initialize to 0
let likes = localStorage.getItem('likes') ? parseInt(localStorage.getItem('likes')) : 0;
let disLikes = localStorage.getItem('disLikes') ? parseInt(localStorage.getItem('disLikes')) : 0;
let total = localStorage.getItem('total') ? parseInt(localStorage.getItem('total')) : 0;

// Update localStorage with default values if not set
localStorage.setItem('likes', likes);
localStorage.setItem('disLikes', disLikes);
localStorage.setItem('total', total);

// Display initial values
displayLikes.innerText = likes;
displayDisLikes.innerText = disLikes;
displayTotal.innerText = total;

likesBtn.addEventListener('click', likesDisplay);
dislikesBtn.addEventListener('click', dislikesDisplay);

function likesDisplay() {
    likes++;
    total++;
    localStorage.setItem('likes', likes);
    localStorage.setItem('total', total);
    displayLikes.innerText = likes;
    displayTotal.innerText = total;
}

function dislikesDisplay() {
    disLikes++;
    total++;
    localStorage.setItem('disLikes', disLikes);
    localStorage.setItem('total', total);
    displayDisLikes.innerText = disLikes;
    displayTotal.innerText = total;
}
