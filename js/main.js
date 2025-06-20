import { renderComments } from './render.js'
import { addFormListener } from './listeners.js'
import { getComments } from './api.js'
import { updateComments } from './data.js'

async function initApp() {
    document.getElementById('loader').style.display = 'block'
    document.getElementById('main-content').style.display = 'none'
    try {
        const comments = await getComments()
        updateComments(comments)
        renderComments()
        addFormListener()
    } catch (error) {
        console.error('Ошибка при инициализации приложения:', error)
    } finally {
        document.getElementById('loader').style.display = 'none'
        document.getElementById('main-content').style.display = 'block'
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initApp()
})

console.log('It works!')
