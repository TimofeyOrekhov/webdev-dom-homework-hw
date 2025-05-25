"use strict";

const nameInput = document.getElementById('nameInput');
const commentInput = document.getElementById('commentInput');
const addButton = document.getElementById('addButton');
const commentsList = document.getElementById('commentsList');
const commentTemplate = document.getElementById('commentTemplate');

const comments = [
  {
    name: "Глеб Фокин",
    date: "12.02.22 12:18",
    text: "Это будет первый комментарий на этой странице",
    likes: 3,
    isLiked: false
  },
  {
    name: "Варвара Н.",
    date: "13.02.22 19:22",
    text: "Мне нравится как оформлена эта страница! ❤",
    likes: 75,
    isLiked: true
  }
];

const emptyHeart = `
  <svg width="22" height="20" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.11 16.9482L11 17.0572L10.879 16.9482C5.654 12.2507 2.2 9.14441 2.2 5.99455C2.2 3.81471 3.85 2.17984 6.05 2.17984C7.744 2.17984 9.394 3.26975 9.977 4.75204H12.023C12.606 3.26975 14.256 2.17984 15.95 2.17984C18.15 2.17984 19.8 3.81471 19.8 5.99455C19.8 9.14441 16.346 12.2507 11.11 16.9482ZM15.95 0C14.036 0 12.199 0.882834 11 2.26703C9.801 0.882834 7.964 0 6.05 0C2.662 0 0 2.6267 0 5.99455C0 10.1035 3.74 13.4714 9.405 18.5613L11 20L12.595 18.5613C18.26 13.4714 22 10.1035 22 5.99455C22 2.6267 19.338 0 15.95 0Z" fill="#BCEC30"/>
  </svg>
`;

const fullHeart = `
  <svg width="22" height="20" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.95 0C14.036 0 12.199 0.882834 11 2.26703C9.801 0.882834 7.964 0 6.05 0C2.662 0 0 2.6267 0 5.99455C0 10.1035 3.74 13.4714 9.405 18.5613L11 20L12.595 18.5613C18.26 13.4714 22 10.1035 22 5.99455C22 2.6267 19.338 0 15.95 0Z" fill="#BCEC30"/>
  </svg>
`;

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}


function formatDate(date) {
  return `${date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })} ${date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

function renderComments() {
  commentsList.innerHTML = "";


  comments.forEach((comment, index) => {
    const commentElement = commentTemplate.content.cloneNode(true);

    commentElement.querySelector(".comment-name").textContent = escapeHtml(comment.name);
    commentElement.querySelector(".comment-date").textContent = comment.date;
    commentElement.querySelector(".comment-text").textContent = escapeHtml(comment.text);

    const likeButton = commentElement.querySelector(".like-button");
    const likesCounter = commentElement.querySelector(".likes-counter");

    likesCounter.textContent = comment.likes;

    likeButton.innerHTML = comment.isLiked ? fullHeart : emptyHeart;

    if (comment.isLiked) {
      likeButton.classList.add("-active-like");
    } else {
      likeButton.classList.remove("-active-like");
    }

    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      comment.isLiked = !comment.isLiked;
      comment.likes += comment.isLiked ? 1 : -1;
      renderComments();
    });

    commentElement.querySelector(".comment").addEventListener("click", () => {
      commentInput.value = `> ${escapeHtml(comment.name)}: ${escapeHtml(comment.text)} \n`
      commentInput.focus();
    });

    commentsList.appendChild(commentElement);
  });
}

addButton.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const text = commentInput.value.trim();

  if (!text || !name) {
    alert("Пожалуйста, заполните оба поля: имя и комментарий.");
    return;
  }

  const newComment = {
    name: escapeHtml(name),
    text: escapeHtml(text),
    date: formatDate(new Date()),
    likes: 0,
    isLiked: false,
  };

  comments.push(newComment);

  nameInput.value = "";
  commentInput.value = "";

  renderComments();
});

renderComments();

console.log("It works!");