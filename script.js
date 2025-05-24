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

    commentElement.querySelector(".comment-name").textContent = comment.name;
    commentElement.querySelector(".comment-date").textContent = comment.date;
    commentElement.querySelector(".comment-text").textContent = comment.text;

    const likeButton = commentElement.querySelector(".like-button");
    const likesCounter = commentElement.querySelector(".likes-counter");

    likesCounter.textContent = comment.likes;

    if (comment.isLiked) {
      likeButton.classList.add("-active-like");
    }

    likeButton.addEventListener("click", () => {
      comment.isLiked = !comment.isLiked;
      comment.likes += comment.isLiked ? 1 : -1;
      renderComments();
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
    name,
    text,
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