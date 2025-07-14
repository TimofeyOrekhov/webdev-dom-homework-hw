const BASE_URL = 'https://wedev-api.sky.pro/api/v2/:Orekhov/comments'
const loginHost = 'https://wedev-api.sky.pro/api/user/login'
const registrationHost = 'https://wedev-api.sky.pro/api/user'
let token = ''
let user = null // { name, login }

export function setToken(newToken) {
    token = newToken
    localStorage.setItem('token', newToken)
}

export function setUser(newUser) {
    user = newUser
    localStorage.setItem('user', JSON.stringify(newUser))
}

export function getToken() {
    if (!token) {
        token = localStorage.getItem('token') || ''
    }
    return token
}

export function getUser() {
    if (!user) {
        const u = localStorage.getItem('user')
        user = u ? JSON.parse(u) : null
    }
    return user
}

export function clearAuth() {
    token = ''
    user = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}

export async function getComments() {
    try {
        const response = await fetch(BASE_URL)

        if (response.status === 500) {
            throw new Error('Сервер сломался, попробуй позже')
        }
        if (!response.ok) {
            throw new Error('Ошибка при получении комментариев')
        }

        const data = await response.json()
        return data.comments
    } catch (error) {
        if (error.message === 'Failed to fetch') {
            alert('Проверь подключение к интернету')
        } else {
            alert(error.message)
        }
        return []
    }
}

export async function addComment(text) {
    // Имя пользователя не передаем, оно берется с сервера по токену
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ text }),
    })
    if (response.status === 400) {
        const error = await response.json()
        throw new Error(error.error || 'Ошибка валидации')
    }
    if (!response.ok) {
        throw new Error('Ошибка при добавлении комментария')
    }
    return true
}

export async function login(login, password) {
    const response = await fetch(loginHost, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Неверный логин или пароль')
    }

    const data = await response.json()
    setToken(data.user.token)
    setUser({ name: data.user.name, login: data.user.login })
    return data.user
}

export async function registration(login, password, name) {
    const response = await fetch(registrationHost, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password, name }),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Ошибка регистрации')
    }

    const data = await response.json()
    setToken(data.user.token)
    setUser({ name: data.user.name, login: data.user.login })
    return data.user
}
