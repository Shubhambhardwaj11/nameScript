document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:5000/api/history')
    const data = await response.json()
    console.log(data)

    const historyList = document.getElementById('historyList')

    data.data.forEach(search => {
        // Format date nicely
        const date = new Date(search.createdAt).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })

        // Get first 3 translations as preview
        const preview = Object.values(search.translations).slice(0, 3).join('  •  ')

        // Create card
        const card = document.createElement('div')
        card.className = 'history-card'
        card.innerHTML = `
            <p class="name">${search.name}</p>
            <p class="date">${date}</p>
            <p class="preview">${preview}</p>
            <button class="delete-btn" data-id="${search._id}">🗑 Delete </button>
        `
        historyList.appendChild(card)
    })

    // Delete button logic
    historyList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.dataset.id
            await fetch(`http://localhost:5000/api/history/${id}`, {
                method: 'DELETE'
            })
            e.target.parentElement.remove()
        }
    })
})

