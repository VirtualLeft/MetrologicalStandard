/*
 * Copyright (C) 2016. All Rights Reserved.
 *
 * @author  XJC
 * @email   xjc1988xjc@126.com
 * @date    2016/06/19
 */

'use strict'

const electron = require('electron')
// const {app, BrowserWindow, Menu, ipcMain, ipcRenderer} = electron;
const {app, BrowserWindow, Menu, ipcMain, ipcRenderer} = electron

const db = require('./db')

let isDevelopment = true

if (isDevelopment) {
    require('electron-reload')(__dirname, {
        ignored: /node_modules|[\/\\]\.|\.db/
    });
}

var mainWnd = null

function createMainWnd() {
    mainWnd = new BrowserWindow({
        width: 1920,
        height: 1080,
        icon: 'public/img/app-icon.png'
    })

    if (isDevelopment) {
        mainWnd.webContents.openDevTools();
    }

    mainWnd.loadURL(`file://${__dirname}/index.html`);
    mainWnd.on('closed', () => {
       mainWnd = null
    })
}

app.on('ready', createMainWnd)

app.on('window-all-closed', () => {
    db.close()
    app.quit()
})