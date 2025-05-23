"use strict";

  const nameInput = document.getElementById('nameInput');
  const commentInput = document.getElementById('commentInput');
  const addButton = document.getElementById('addButton');
  const commentsList = document.getElementById('commentsList');
  const commentTemplate = document.getElementById('commentTemplate');

  addButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const text = commentInput.value.trim();

    if (!name || !text) {
      alert('Пожалуйста, заполните оба поля: имя и комментарий.');
      return;
    }

    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    })} ${now.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    })}`;

    const commentElement = commentTemplate.content.cloneNode(true);
    commentElement.querySelector('.comment-name').textContent = name;
    commentElement.querySelector('.comment-date').textContent = formattedDate;
    commentElement.querySelector('.comment-text').textContent = text;

    const likeButton = commentElement.querySelector('.like-button');
    const likesCounter = commentElement.querySelector('.likes-counter');
    likesCounter.textContent = '0';

    likeButton.addEventListener('click', () => {
      let currentLikes = parseInt(likesCounter.textContent, 10);
      const isActive = likeButton.classList.contains('-active-like');
      likeButton.classList.toggle('-active-like');
      likesCounter.textContent = isActive ? currentLikes - 1 : currentLikes + 1;
    });

    commentsList.appendChild(commentElement);

    nameInput.value = '';
    commentInput.value = '';
  });

  console.log("It works!");