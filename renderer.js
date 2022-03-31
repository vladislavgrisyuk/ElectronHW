let id = 10;
let taskList;
window.addEventListener('DOMContentLoaded', () => {
	window.API.goLoadTasks();
	let active = document.getElementsByClassName('sidebar-menu-active')[0];
	let menu = document.getElementsByClassName('sidebar-menu-header');
	taskList = document.getElementById('task-content');
	let addTaskButton = document.getElementById('addTaskBtn');
	addTaskButton.onclick = addtaskbtnClick;

	for (let i = 0; i < menu.length; i++) {
		menu[i].onclick = () => {
			active.classList.remove('sidebar-menu-active');
			active = menu[i];
			menu[i].classList.add('sidebar-menu-active');
		};
	}
});

window.API.handleLoadTasks((event, value) => {
	for (let i = 0; i < value.length; i++) {
		addTask(value[i]._doc.header, value[i]._doc.description);
	}
	//event.sender.send('taskApplied', 'Info to main');
});

window.API.handleApplyTask((event, value) => {
	addTask(value.header, value.description);
	//event.sender.send('taskApplied', 'Info to main');
});

function addtaskbtnClick() {
	window.API.AddTaskClick();
}

function addTask(header, text) {
	let taskTemplate =
		'<div class="task">' +
		'<div class="task-header">' +
		'<div><input type="checkbox" class="visnone" name="name" id="ids' +
		id +
		'">' +
		'<label class="checkbox" for="ids' +
		id++ +
		'"></label></div>' +
		'<span class="task-header-text">' +
		header +
		'</span>' +
		'<div class="fgrow"></div>' +
		'<img src="./images/info-task.svg" alt="">' +
		'<img src="./images/star-task.svg" alt="">' +
		'<img src="./images/trash-task.svg" alt="">' +
		'</div>' +
		'<div class="task-description">' +
		text +
		'</div>' +
		'</div>';

	taskList.innerHTML += taskTemplate;
}
