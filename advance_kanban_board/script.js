const boardContainer = document.getElementById('board-container');
        const addTaskBtn = document.getElementById('add-task-btn');
        const addBoardBtn = document.getElementById('add-board-btn');

        let boards = JSON.parse(localStorage.getItem('boards')) || [];

        function saveToLocalStorage() {
            localStorage.setItem('boards', JSON.stringify(boards));
        }

        function attachDragEvents(target){
            target.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text', target.id);
            });
        }

        function updateTaskCount(boardId) {
            const board = document.getElementById(boardId);
            const count = board.querySelectorAll('.item').length;
            board.querySelector('h4 span').innerText = count;
        }

        function addTask() {
            const input = prompt('Enter Task:');
            if (!input) return;
            
            const timestamp = new Date().toLocaleTimeString();
            const taskId = `task-${Date.now()}`;
            
            const taskCard = document.createElement('p');
            taskCard.classList.add('item');
            taskCard.setAttribute('draggable', true);
            taskCard.setAttribute('id', taskId);
            taskCard.innerHTML = `${input} <small class="time">${timestamp}</small>`;

            attachDragEvents(taskCard);

            const firstBoard = document.querySelector('.board .items');
            firstBoard.appendChild(taskCard);
            updateTaskCount(firstBoard.parentElement.id);
            saveToLocalStorage();
        }

        function addBoard() {
            const boardName = prompt('Enter Board Name:');
            if (!boardName) return;
            
            const boardId = `board-${Date.now()}`;
            
            const board = document.createElement('div');
            board.classList.add('board');
            board.setAttribute('id', boardId);
            board.innerHTML = `<h4>${boardName} <span>0</span></h4>
                <div class="items" ondrop="drop(event, '${boardId}')" ondragover="allowDrop(event)"></div>`;
            
            boardContainer.appendChild(board);
            boards.push({ id: boardId, name: boardName, tasks: [] });
            saveToLocalStorage();
        }

        function allowDrop(event) {
            event.preventDefault();
        }

        function drop(event, boardId) {
            event.preventDefault();
            const board = document.getElementById(boardId).querySelector('.items');
            
            // Ensure only one task per board
            if (board.children.length > 0) {
                alert('This board can only hold one task at a time!');
                return;
            }
            
            const taskId = event.dataTransfer.getData('text');
            const task = document.getElementById(taskId);
            board.appendChild(task);
            
            // Update time when task is moved
            const newTimestamp = new Date().toLocaleTimeString();
            task.querySelector('.time').innerText = newTimestamp;
            
            updateTaskCount(boardId);
            saveToLocalStorage();
        }

        function loadBoards() {
            boards.forEach(boardData => {
                const board = document.createElement('div');
                board.classList.add('board');
                board.setAttribute('id', boardData.id);
                board.innerHTML = `<h4>${boardData.name} <span>${boardData.tasks.length}</span></h4>
                    <div class="items" ondrop="drop(event, '${boardData.id}')" ondragover="allowDrop(event)"></div>`;
                boardContainer.appendChild(board);

                boardData.tasks.forEach(task => {
                    const taskCard = document.createElement('p');
                    taskCard.classList.add('item');
                    taskCard.setAttribute('draggable', true);
                    taskCard.setAttribute('id', task.id);
                    taskCard.innerHTML = `${task.text} <small class="time">${task.timestamp}</small>`;
                    attachDragEvents(taskCard);
                    board.querySelector('.items').appendChild(taskCard);
                });
            });
        }

        addTaskBtn.addEventListener('click', addTask);
        addBoardBtn.addEventListener('click', addBoard);
        window.onload = loadBoards;