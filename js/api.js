const BASE_URL = 'https://wedev-api.sky.pro/api/v2/OrekhovTimofey/comments'
import { getToken } from './auth.js'

export async function getComments() {
    try {
        const token = getToken()
        const response = await fetch(BASE_URL, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        })

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

export async function addComment(text, name) {
    const bodyObj = { text, name }
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(bodyObj),
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

export async function deleteComment(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    })
    if (!response.ok) {
        throw new Error('Ошибка при удалении комментария')
    }
    return true
}

export async function toggleLike(id) {
    const response = await fetch(`${BASE_URL}/${id}/toggle-like`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    })
    if (!response.ok) {
        throw new Error('Ошибка при переключении лайка')
    }
    const data = await response.json()
    return data.result
}
