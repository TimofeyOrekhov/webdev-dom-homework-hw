import { comments } from './data.js'
import { escapeHtml, formatDate } from './utils.js'
import { renderComments } from './render.js'

export function addFormListener() {
    const nameInput = document.getElementById('nameInput')
    const commentInput = document.getElementById('commentInput')
    const addButton = document.getElementById('addButton')

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

export function addLikeListeners() {
    const likeButtons = document.querySelectorAll('.like-button')

    likeButtons.forEach((likeBtn) => {
        likeBtn.addEventListener('click', (event) => {
            event.stopPropagation()
            const li = likeBtn.closest('.comment')
            const index = Number(li.dataset.index)
            comments[index].isLiked = !comments[index].isLiked
            comments[index].likes += comments[index].isLiked ? 1 : -1
            renderComments()
        })
    })
}

export function addQuoteListeners() {
    const commentElements = document.querySelectorAll('.comment')
    const commentInput = document.getElementById('commentInput')

    commentElements.forEach((commentEl) => {
        commentEl.addEventListener('click', () => {
            const index = Number(commentEl.dataset.index)
            commentInput.value = `> ${escapeHtml(comments[index].name)}: ${escapeHtml(comments[index].text)}\n`
            commentInput.focus()
        })
    })
}
