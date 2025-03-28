const addTaskBtn = document.getElementById('add-task-btn')

const todoBoard = document.getElementById('todo-board')

function attachDragEvents(target){
    target.addEventListener('dragstart', () => {
        target.classList.add('flying')
    })
    target.addEventListener('dragend', () => {
        target.classList.remove('flying')
    })
}

addTaskBtn.addEventListener('click', () => {
    const input = prompt('What is the task ?')
    if (!input) return

    const taskCard = document.createElement('p')
    taskCard.classList.add('item')
    taskCard.setAttribute('draggable', true)
    taskCard.innerText = input

    attachDragEvents(taskCard)

    // taskCard.addEventListener('dragstart', () => {
    //     taskCard.classList.add('flying')
    // })
    // taskCard.addEventListener('dragsend', () => {
    //     taskCard.classList.remove('flying')
    // })

    todoBoard.appendChild(taskCard)
})

//const allBoards = document.getElementsByClassName('board')
const allBoards = document.querySelectorAll('.board')
const allItems = document.querySelectorAll('.item')

allItems.forEach((item) => attachDragEvents(item))
// allItems.forEach(attachDragEvents)


// allItems.forEach((item) => {
//     item.addEventListener('dragstart', () => {
//         item.classList.add('flying')
//     })
//     item.addEventListener('dragend', () => {
//         item.classList.remove('flying')
//     })    
// })


allBoards.forEach((board) => {
    board.addEventListener('dragover', () => {
        const flyingElement = document.querySelector('.flying')
        console.log(board,'dragover', flyingElement)

        board.appendChild(flyingElement)

    })
})  