import { getUser } from './auth.js'

export function showAuthForms(type = 'login') {
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
    document.getElementById('logout-link').style.display = 'none'
}

export function showMain() {
    document.getElementById('auth-block').style.display = 'none'
    document.getElementById('main-content').style.display = 'block'
    const user = getUser()
    if (user) {
        document.querySelector('.add-form').style.display = 'flex'
        document.getElementById('login-prompt').style.display = 'none'
        document.getElementById('logout-link').style.display = 'inline-block'
    } else {
        document.querySelector('.add-form').style.display = 'none'
        document.getElementById('login-prompt').style.display = 'block'
        document.getElementById('logout-link').style.display = 'none'
    }
}
