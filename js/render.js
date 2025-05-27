export function renderComments() {
  commentsList.innerHTML = "";


  comments.forEach((comment, index) => {
    const commentElement = commentTemplate.content.cloneNode(true);

    commentElement.querySelector(".comment-name").textContent = comment.name;
    commentElement.querySelector(".comment-date").textContent = comment.date;
    commentElement.querySelector(".comment-text").textContent = comment.text;


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
      commentInput.value = `> ${escapeHtml(comment.name)}: ${escapeHtml(comment.text)}\n`;
      commentInput.focus();
    });

    commentsList.appendChild(commentElement);
  });
}

renderComments();