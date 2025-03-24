document.getElementById('taskList').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        event.target.parentElement.remove();
    }
});

document.getElementById('addTask').addEventListener('click', function() {
    let taskInput = document.getElementById('taskInput');
    let taskText = taskInput.value.trim();
    if (taskText !== '') {
        let li = document.createElement('li');
        li.innerHTML = `${taskText} <button class="delete-btn">Видалити</button>`;
        document.getElementById('taskList').appendChild(li);
        taskInput.value = '';
    }
});