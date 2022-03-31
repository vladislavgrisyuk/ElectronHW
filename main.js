const { app, BrowserWindow, ipcMain } = require('electron');
const mongoose = require('mongoose');
const taskModel = require('./models/task.model');

mongoose
	.connect('mongodb://localhost/tasks')
	.then()
	.catch(data => console.log('error'));

const t = new taskModel();
// t.header = 'Hello';
// t.description = 'World!';
// t.save();
// const a = taskModel
// 	.find()
// 	.then(data => {
// 		console.log(data);
// 	})
// 	.catch();

let win;
const createWindow = () => {
	win = new BrowserWindow({
		width: 1366,
		height: 720,
		minWidth: 580,
		minHeight: 800,
		webPreferences: {
			preload: `${__dirname}/preload.js`,
			contextIsolation: true,
		},
		resizable: true,
	});

	win.loadFile('index.html');
	win.webContents.openDevTools();
};

let pop;
const createAddTaskWindow = () => {
	pop = new BrowserWindow({
		webPreferences: {
			// preload: `${__dirname}/renderer.js`,
			enableRemoteModule: false,
			contextIsolation: true,
			nodeIntegration: false,
			preload: `${__dirname}/preload.js`,
		},
		closable: true,
		width: 500,
		height: 370,
		resizable: false,
		center: true,
		transparent: true,
		modal: true,
		parent: win,
	});
	pop.loadFile('addTaskWindow.html');
	pop.webContents.openDevTools();
};

app.whenReady().then(() => {
	createWindow();
});

ipcMain.on('go', () => {
	win.loadFile('test.html');
});

ipcMain.handle('CloseAddTaskWindow', () => {
	pop.close();
});

ipcMain.on('taskApplied', (events, data) => {
	t.header = data.header;
	t.description = data.description;
	t.save();
	win.webContents.send('ApplyAddingTask', data);
});

ipcMain.on('goLoadTasks', events => {
	taskModel.find().then(data => {
		console.log(data);
		win.webContents.send('LoadTasks', data);
	});
});

ipcMain.handle('addTaskButtonClick', createAddTaskWindow);
