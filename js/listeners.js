import { comments } from './data.js'
import { escapeHtml, formatDate } from './utils.js'
import { renderComments } from './render.js'

const nameInput = document.getElementById('nameInput')
const commentInput = document.getElementById('commentInput')
const addButton = document.getElementById('addButton')
const commentsList = document.getElementById('commentsList')

export function setupListeners() {
    // Лайки и клики по комментариям (делегирование)
    commentsList.addEventListener('click', (event) => {
        const likeBtn = event.target.closest('.like-button')
        if (likeBtn) {
            event.stopPropagation()
            const li = likeBtn.closest('.comment')
            const index = Number(li.dataset.index)
            comments[index].isLiked = !comments[index].isLiked
            comments[index].likes += comments[index].isLiked ? 1 : -1
            renderComments()
            return
        }

        const commentEl = event.target.closest('.comment')
        if (commentEl) {
            const index = Number(commentEl.dataset.index)
            commentInput.value = `> ${escapeHtml(comments[index].name)}: ${escapeHtml(comments[index].text)}\n`
            commentInput.focus()
        }
    })

    // Кнопка добавления комментария
    addButton.addEventListener('click', () => {
        const name = nameInput.value.trim()
        const text = commentInput.value.trim()

        if (!text || !name) {
            alert('Пожалуйста, заполните оба поля: имя и комментарий.')
            return
        }

        const newComment = {
            name,
            text,
            date: formatDate(new Date()),
            likes: 0,
            isLiked: false,
        }

        comments.push(newComment)

        nameInput.value = ''
        commentInput.value = ''

        renderComments()
    })
}
