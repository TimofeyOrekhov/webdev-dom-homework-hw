import { comments, updateComments, setCustomName } from './data.js'
import { escapeHtml } from './utils.js'
import { renderComments } from './render.js'
import {
    addComment,
    getComments,
    getUser,
    deleteComment,
    toggleLike,
} from './api.js'

let savedText = ''
let formListenerAdded = false

function setFormState(isLoading) {
    const commentInput = document.getElementById('commentInput')
    const addButton = document.getElementById('addButton')

    addButton.disabled = isLoading
    commentInput.disabled = isLoading
    addButton.textContent = isLoading ? 'Загрузка...' : 'Добавить'
}

export function addFormListener() {
    if (formListenerAdded) return
    formListenerAdded = true
    const nameInput = document.getElementById('nameInput')
    const commentInput = document.getElementById('commentInput')
    const addButton = document.getElementById('addButton')

    // Всегда показываем поле имени
    nameInput.style.display = 'block'
    const user = getUser()
    if (user && user.name) {
        nameInput.value = user.name
        nameInput.readOnly = true
    } else {
        nameInput.value = ''
        nameInput.placeholder = 'Введите ваше имя'
        nameInput.readOnly = false
    }
    addButton.disabled = false
    commentInput.disabled = false

    commentInput.addEventListener(
        'input',
        () => (savedText = commentInput.value),
    )

    addButton.addEventListener('click', async () => {
        setFormState(true)
        try {
            await addComment(savedText.trim(), nameInput.value.trim())
            const updatedComments = await getComments()
            // Сохраняем имя для последнего комментария
            if (updatedComments.length > 0) {
                const lastComment = updatedComments[updatedComments.length - 1]
                setCustomName(lastComment.id, nameInput.value.trim())
            }
            updateComments(updatedComments)
            savedText = ''
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
    const user = getUser()
    likeButtons.forEach((likeBtn) => {
        likeBtn.addEventListener('click', async (event) => {
            event.stopPropagation()
            const li = likeBtn.closest('.comment')
            const index = Number(li.dataset.index) // index нужен для обновления comments
            if (!user) return
            try {
                const id = li.dataset.id
                const result = await toggleLike(id)
                comments[index].isLiked = result.isLiked
                comments[index].likes = result.likes
                renderComments()
            } catch {
                alert('Ошибка при переключении лайка')
            }
        })
    })
}

export function addDeleteListeners() {
    const deleteButtons = document.querySelectorAll('.delete-button')
    const user = getUser()
    deleteButtons.forEach((delBtn) => {
        delBtn.addEventListener('click', async (event) => {
            event.stopPropagation()
            const li = delBtn.closest('.comment')
            // const index = Number(li.dataset.index) // index не используется
            if (!user) return
            if (!confirm('Удалить комментарий?')) return
            try {
                const id = li.dataset.id
                await deleteComment(id)
                const updatedComments = await getComments()
                updateComments(updatedComments)
                renderComments()
            } catch {
                alert('Ошибка при удалении комментария')
            }
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
    document.getElementById('nameInput').value = '' // Удаляем сохранение имени
    document.getElementById('commentInput').value = savedText
}
