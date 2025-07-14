import { renderComments } from './js/render.js'
import { addFormListener } from './js/listeners.js'
import {
    getComments,
    login,
    registration,
    getUser,
    clearAuth,
} from './js/api.js'
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
        document.getElementById('logout-btn').style.display = 'block'
    } catch (error) {
        console.error('Ошибка при инициализации приложения:', error)
    } finally {
        document.getElementById('loader').style.display = 'none'
    }
}

function showAuthForms(type = 'login') {
    document.getElementById('main-content').style.display = 'none'
    document.getElementById('auth-block').style.display = 'block'
    const loginForm = document.getElementById('login-form')
    const registerForm = document.getElementById('register-form')
    if (type === 'login') {
        loginForm.classList.remove('hidden')
        registerForm.classList.add('hidden')
    } else {
        loginForm.classList.add('hidden')
        registerForm.classList.remove('hidden')
    }
    document.getElementById('logout-btn').style.display = 'none'
}

function showMain() {
    document.getElementById('auth-block').style.display = 'none'
    document.getElementById('main-content').style.display = 'block'
    const user = getUser()
    if (user) {
        document.querySelector('.add-form').style.display = 'block'
        document.getElementById('login-prompt').style.display = 'none'
        document.getElementById('logout-link').style.display = 'inline-block'
    } else {
        document.querySelector('.add-form').style.display = 'none'
        document.getElementById('login-prompt').style.display = 'block'
        document.getElementById('logout-link').style.display = 'none'
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
