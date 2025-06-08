const BASE_URL = 'https://wedev-api.sky.pro/api/v1/OrekhovTimofey/comments'

export async function getComments() {
    try {
        const response = await fetch(BASE_URL)
        if (!response.ok) {
            throw new Error('Ошибка при получении комментариев')
        }
        const data = await response.json()
        return data.comments
    } catch (error) {
        console.error('Ошибка при получении комментариев:', error)
        return []
    }
}

export async function addComment(text, name) {
    try {
        if (!text || !name || text.length < 3 || name.length < 3) {
            throw new Error(
                'Имя и текст комментария должны содержать минимум 3 символа',
            )
        }

        const response = await fetch(BASE_URL, {
            method: 'POST',
            body: JSON.stringify({ text, name }),
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Ошибка при добавлении комментария')
        }

        return true
    } catch (error) {
        console.error('Ошибка при добавлении комментария:', error)
        throw error
    }
}
