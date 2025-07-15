const loginHost = 'https://wedev-api.sky.pro/api/user/login'
const registrationHost = 'https://wedev-api.sky.pro/api/user'
let token = ''

export function setToken(newToken) {
    token = newToken
    localStorage.setItem('token', newToken)
}

export function setUser(newUser) {
    localStorage.setItem('user', JSON.stringify(newUser))
}

export function getToken() {
    if (!token) {
        token = localStorage.getItem('token') || ''
    }
    return token
}

export function getUser() {
    const u = localStorage.getItem('user')
    return u ? JSON.parse(u) : null
}

export function clearAuth() {
    token = ''
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}

export async function login(login, password) {
    const response = await fetch(loginHost, {
        method: 'POST',
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
