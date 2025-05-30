export function escapeHtml(text) {
    return text
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&#34;')
        .replaceAll("'", '&#39;')
        .replaceAll('$', '&#36')
}

export function formatDate(date) {
    return `${date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    })} ${date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    })}`
}
