module.exports = {
    schema: [
        `CREATE TABLE IF NOT EXISTS users(
            _id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(30),
            email VARCHAR(30) UNIQUE,
            phone VARCHAR(15),
            password VARCHAR(80)
            );`
    ]
}