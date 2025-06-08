import { renderComments } from './render.js'
import { addFormListener } from './listeners.js'
import { getComments } from './api.js'
import { updateComments } from './data.js'

async function initApp() {
    try {
        const comments = await getComments()
        updateComments(comments)
        renderComments()
        addFormListener()
    } catch (error) {
        console.error('Ошибка при инициализации приложения:', error)
    }
}
initApp()

console.log('It works!')
