import { renderComments } from './js/render.js'
import { addFormListener } from './js/listeners.js'
import { getComments } from './js/api.js'
import { login, registration, getUser, clearAuth } from './js/auth.js'
import { showAuthForms, showMain } from './js/renderAuth.js'
import { updateComments } from './js/data.js'

async function initApp() {
    document.getElementById('loader').style.display = 'block'
    document.getElementById('main-content').style.display = 'none'
    document.getElementById('auth-block').style.display = 'none'
    try {
        const comments = await getComments()
        updateComments(comments)
        renderComments()
        addFormListener()
        document.getElementById('main-content').style.display = 'block'
        showMain()
    } catch (error) {
        console.error('Ошибка при инициализации приложения:', error)
    } finally {
        document.getElementById('loader').style.display = 'none'
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const user = getUser()
    if (user) {
        initApp()
    } else {
        document.getElementById('loader').style.display = 'block'
        document.getElementById('main-content').style.display = 'none'
        getComments().then((comments) => {
            updateComments(comments)
            renderComments()
            showMain()
            document.getElementById('loader').style.display = 'none'
            document.getElementById('main-content').style.display = 'block'
        })
    }

    // Переключение между формами
    document.getElementById('to-register').onclick = () =>
        showAuthForms('register')
    document.getElementById('to-login').onclick = () => showAuthForms('login')

    // Вход
    document.getElementById('login-form').onsubmit = async (e) => {
        e.preventDefault()
        const loginValue = document.getElementById('login-login').value.trim()
        const passwordValue = document
            .getElementById('login-password')
            .value.trim()
        try {
            await login(loginValue, passwordValue)
            initApp()
            const user = getUser()
            if (user && user.name) {
                document.getElementById('nameInput').value = user.name
            }
        } catch (err) {
            alert(err.message)
        }
    }
    // Регистрация
    document.getElementById('register-form').onsubmit = async (e) => {
        e.preventDefault()
        const nameValue = document.getElementById('register-name').value.trim()
        const loginValue = document
            .getElementById('register-login')
            .value.trim()
        const passwordValue = document
            .getElementById('register-password')
            .value.trim()
        try {
            await registration(loginValue, passwordValue, nameValue)
            initApp()
            const user = getUser()
            if (user && user.name) {
                document.getElementById('nameInput').value = user.name
            }
        } catch (err) {
            alert(err.message)
        }
    }

    document.getElementById('logout-link').onclick = () => {
        clearAuth()
        showAuthForms('login')
    }
    document.getElementById('login-prompt-link').onclick = () =>
        showAuthForms('login')
})

console.log('It works!')
