import { comments, emptyHeart, fullHeart } from './data.js'
import { escapeHtml } from './utils.js'
import {
    addLikeListeners,
    addQuoteListeners,
    addDeleteListeners,
} from './listeners.js'
import { getUser } from './api.js'

const commentsList = document.getElementById('commentsList')

export function renderComments() {
    const user = getUser()
    commentsList.innerHTML = comments
        .map(
            (comment, index) => `
      <li class="comment" data-index="${index}" data-id="${comment.id}">
        <div class="comment-header">
          <div class="comment-name">${escapeHtml(comment.name)}</div>
          <div class="comment-date">${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${escapeHtml(comment.text)}</div>
        </div>
        <div class="comment-footer" style="display:flex;justify-content:space-between;align-items:flex-end;">
          ${user ? `<span class="delete-button" style="align-self:flex-end;cursor:pointer;color:#fff;background:none;border:none;font:inherit;padding:0;text-underline-offset:3px;">удалить</span>` : ''}
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

    addLikeListeners()
    addQuoteListeners()
    addDeleteListeners()
}
