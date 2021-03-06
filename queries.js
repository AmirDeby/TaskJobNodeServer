const db = require('./sql');

const getUsers = () => {
    return db.execute("SELECT * FROM joblog.users")
}

const getTaskJobs = () => {
    return db.execute('SELECT * FROM joblog.tasks')
}
const addUser = (firstName, lastName, userName, password) => {
    return db.execute(`INSERT INTO joblog.users(firstName, lastName, userName, password)
     VALUES(? ,? ,? ,?)`, [firstName, lastName, userName, password])
}

const addJobLog = (description, date, userId) => {
    return db.execute("INSERT INTO `joblog`.`tasks` (`description`, `date`, `Completed`,userId) VALUES (?,?,0,?)", [description, date, userId])
}

const deleteJob = (id,userId) => {
    return db.execute("DELETE FROM joblog.tasks WHERE (id = ?) and userId = ?", [id,userId]);
}

const toggleComplete = (id, userId) => {
    return db.execute(`UPDATE joblog.tasks SET Completed = NOT Completed  WHERE id = ? and userId = ? `, [id, userId]);
}

const getTasksByUserId = (userId) => {
    return db.execute('SELECT * FROM joblog.tasks where userId = ?', [userId]);
}
const login = (userName, password) => {
    return db.execute(' SELECT * FROM joblog.users WHERE userName=? and password= ?', [userName, password])
}

module.exports = { getUsers, addUser, addJobLog, deleteJob, toggleComplete, getTasksByUserId, login, getTaskJobs }