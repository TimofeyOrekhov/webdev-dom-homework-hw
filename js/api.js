const BASE_URL = 'https://wedev-api.sky.pro/api/v1/OrekhovTimofey/comments'

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

export async function addComment(text, name, retryCount = 4) {
    for (let attempt = 0; attempt <= retryCount; attempt++) {
        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                body: JSON.stringify({
                    text,
                    name,
                    forceError: true,
                }),
            })

            if (response.status === 400) {
                throw new Error(
                    'Имя и комментарий должны быть заполнены и содержать не менее 3 символов.',
                )
            }

            if (response.status === 500) {
                if (attempt < retryCount) {
                    continue
                } else {
                    throw new Error('Сервер сломался, попробуй позже')
                }
            }

            if (!response.ok) {
                const error = await response.json()
                throw new Error(
                    error.error || 'Ошибка при добавлении комментария',
                )
            }

            return true
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                throw new Error('Проверь подключение к интернету')
            }
            if (attempt >= retryCount) {
                throw error
            }
        }
    }
}
