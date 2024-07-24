import bcrypt from 'bcryptjs';
import mysql from "mysql2/promise";
import bluebird from 'bluebird';

// Create the connection to database, specify bluebird as promise

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = (email, password, username) => {
    let hashPass = hashPassword(password);

    connection.query(
        'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',[email, hashPass, username],
        function (err, results, fields) {
          if (err) {
            console.log(err);
          }
        }
    );
}

const getUserList = async () => {
    const connection = await mysql.createConnection({host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird});

    let users = [];
    try{
        // execute will internally call prepare and query
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows;
    } catch (err) {
        console.log(err);
    } 
}

module.exports = {
    createNewUser, getUserList
}