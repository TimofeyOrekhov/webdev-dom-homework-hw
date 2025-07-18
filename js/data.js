export let comments = []

function getCustomNames() {
    return JSON.parse(localStorage.getItem('customCommentNames') || '{}')
}

export function setCustomName(commentId, name) {
    const names = getCustomNames()
    names[commentId] = name
    localStorage.setItem('customCommentNames', JSON.stringify(names))
}

export const updateComments = (newComments) => {
    const customNames = getCustomNames()
    comments = newComments.map((comment) => ({
        id: comment.id,
        name: customNames[comment.id] || comment.author.name,
        date: new Date(comment.date).toLocaleString('ru-RU'),
        text: comment.text,
        likes: comment.likes,
        isLiked: comment.isLiked,
    }))
}

export const emptyHeart = `
  <svg width="22" height="20" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.11 16.9482L11 17.0572L10.879 16.9482C5.654 12.2507 2.2 9.14441 2.2 5.99455C2.2 3.81471 3.85 2.17984 6.05 2.17984C7.744 2.17984 9.394 3.26975 9.977 4.75204H12.023C12.606 3.26975 14.256 2.17984 15.95 2.17984C18.15 2.17984 19.8 3.81471 19.8 5.99455C19.8 9.14441 16.346 12.2507 11.11 16.9482ZM15.95 0C14.036 0 12.199 0.882834 11 2.26703C9.801 0.882834 7.964 0 6.05 0C2.662 0 0 2.6267 0 5.99455C0 10.1035 3.74 13.4714 9.405 18.5613L11 20L12.595 18.5613C18.26 13.4714 22 10.1035 22 5.99455C22 2.6267 19.338 0 15.95 0Z" fill="#BCEC30"/>
  </svg>
`

export const fullHeart = `
  <svg width="22" height="20" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.95 0C14.036 0 12.199 0.882834 11 2.26703C9.801 0.882834 7.964 0 6.05 0C2.662 0 0 2.6267 0 5.99455C0 10.1035 3.74 13.4714 9.405 18.5613L11 20L12.595 18.5613C18.26 13.4714 22 10.1035 22 5.99455C22 2.6267 19.338 0 15.95 0Z" fill="#BCEC30"/>
  </svg>
`
