import { formatDate } from './utils.js'
import { renderComments } from './render.js'
import { comments } from './data.js'

const nameInput = document.getElementById('nameInput')
const commentInput = document.getElementById('commentInput')
const addButton = document.getElementById('addButton')
const commentsList = document.getElementById('commentsList')
const commentTemplate = document.getElementById('commentTemplate')

addButton.addEventListener('click', () => {
    const name = nameInput.value.trim()
    const text = commentInput.value.trim()

    if (!text || !name) {
        alert('Пожалуйста, заполните оба поля: имя и комментарий.')
        return
    }

    const newComment = {
        name: name,
        text: text,
        date: formatDate(new Date()),
        likes: 0,
        isLiked: false,
    }

    comments.push(newComment)

    nameInput.value = ''
    commentInput.value = ''

    renderComments(comments, commentsList, commentInput, commentTemplate)
})
renderComments(comments, commentsList, commentInput, commentTemplate)
