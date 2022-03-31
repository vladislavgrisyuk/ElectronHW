const { app, BrowserWindow, BrowserView } = require('electron');
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('API', {
	CloseAddTaskWindow: () => {
		ipcRenderer.invoke('CloseAddTaskWindow');
	},
	AddTaskClick: () => {
		ipcRenderer.invoke('addTaskButtonClick');
	},
	handleApplyTask: callback => {
		ipcRenderer.on('ApplyAddingTask', callback);
	},
	ApplyAddingTask: data => {
		ipcRenderer.send('taskApplied', data);
	},
	handleLoadTasks: callback => {
		ipcRenderer.on('LoadTasks', callback);
	},
	goLoadTasks: data => {
		ipcRenderer.send('goLoadTasks', data);
	},
});
