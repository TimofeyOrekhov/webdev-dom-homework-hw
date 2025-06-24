import { comments, updateComments } from './data.js'
import { escapeHtml } from './utils.js'
import { renderComments } from './render.js'
import { addComment, getComments } from './api.js'

let savedName = ''
let savedText = ''

function setFormState(isLoading) {
    const nameInput = document.getElementById('nameInput')
    const commentInput = document.getElementById('commentInput')
    const addButton = document.getElementById('addButton')

    addButton.disabled = isLoading
    nameInput.disabled = isLoading
    commentInput.disabled = isLoading
    addButton.textContent = isLoading ? 'Загрузка...' : 'Добавить'
}

export function addFormListener() {
    const nameInput = document.getElementById('nameInput')
    const commentInput = document.getElementById('commentInput')
    const addButton = document.getElementById('addButton')

    // Сохраняем введённые данные в переменные
    nameInput.addEventListener('input', () => (savedName = nameInput.value))
    commentInput.addEventListener(
        'input',
        () => (savedText = commentInput.value),
    )

    addButton.addEventListener('click', async () => {
        setFormState(true)

        try {
            await addComment(savedText.trim(), savedName.trim())
            const updatedComments = await getComments()
            updateComments(updatedComments)
            savedName = ''
            savedText = ''
            nameInput.value = ''
            commentInput.value = ''
            renderComments()
        } catch (error) {
            alert(
                error.message || 'Произошла ошибка при добавлении комментария',
            )
        } finally {
            setFormState(false)
        }
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

export function renderForm() {
    document.getElementById('nameInput').value = savedName
    document.getElementById('commentInput').value = savedText
}
