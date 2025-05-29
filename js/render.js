import { comments, emptyHeart, fullHeart } from './data.js'
import { escapeHtml } from './utils.js'

const commentsList = document.getElementById('commentsList')

export function renderComments() {
    commentsList.innerHTML = comments
        .map(
            (comment, index) => `
      <li class="comment" data-index="${index}">
        <div class="comment-header">
          <div class="comment-name">${escapeHtml(comment.name)}</div>
          <div class="comment-date">${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${escapeHtml(comment.text)}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button ${comment.isLiked ? '-active-like' : ''}">
              ${comment.isLiked ? fullHeart : emptyHeart}
            </button>
          </div>
        </div>
      </li>
    `,
        )
        .join('')
}
