const mysql = require('mysql');
const config = require('../database/mysql/config');
const connection = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password
})

const COLUMN_LENGTH = 10;

const now = new Date();
const TABLE_NAME = "time_table";
//TODO: 0시 정각에 테이블 생성 하도록하기
// crontab 이용해서 node 명령어로 실행하게 하기
// 당일분 csv파일로 생성하도록 하기

function generateDataBase(dbName) {
    const query = "CREATE DATABASE IF NOT EXISTS ??";
    connection.query(query, dbName, (err, res) => {
        if (err) throw err;
    });
}

function generateTable(tableName) {
    const now = new Date().valueOf();
    connection.query("USE dilettante");
    
    for (let i = 0; i <= 31; i += 1) {
        const newDate = new Date(now + (86_400_000 * i));
        const query = "CREATE TABLE IF NOT EXISTS ?? (time int(3) AUTO_INCREMENT, booked_data JSON, PRIMARY KEY(time)) AUTO_INCREMENT = 1";
        //const dbTableName = tableName + newDate.getFullYear() + (newDate.getMonth() + 1) + newDate.getDate();
        const dbTableName = tableName + genTableName(newDate);
        connection.query(query, dbTableName, (err, res) => {
            if (err) throw err;
        });
        insetTableData(dbTableName);
    }
}

function insetTableData(tableName) {
    for (let i = 1; i <= COLUMN_LENGTH; i += 1) {
        const query = "INSERT IGNORE INTO ?? (time) VALUES(?)";
        const query_data = [tableName, i];
        connection.query(query, query_data, (err, res) => {
            if (err) throw err;
        })
    }
}

function genTableName (date) {
    const year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    let day = (date.getDate()).toString();

    month = (month.length === 1) ? '0' + month : month;
    day = (day.length === 1) ? '0' + day : day;
    return `${year}-${month}-${day}`;
}

async function executeQuery() {
    await generateDataBase("dilettante");
    generateTable(TABLE_NAME);
    //await insetTableData(TABLE_NAME);
    connection.end();
}
module.exports = executeQuery;