module.exports = {
    schema: [
        `CREATE TABLE IF NOT EXISTS user(
            _id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(30),
            email VARCHAR(30) UNIQUE,
            phone VARCHAR(15),
            password VARCHAR(80)
            );`,
        `CREATE TABLE IF NOT EXISTS poster(
            _id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(20)
        );`,
        `CREATE TABLE IF NOT EXISTS online_meeting(
            _id INT PRIMARY KEY AUTO_INCREMENT,
            service_name VARCHAR(30),
            description VARCHAR(200),
            poster INT,
            speaker_name VARCHAR(30),
            speaker_mail VARCHAR(30),
            created_user_id INT,
            comments VARCHAR(30),
            FOREIGN KEY(created_user_id) REFERENCES user(_id),
            FOREIGN KEY(poster) REFERENCES poster(_id)
        );`,
        `CREATE TABLE IF NOT EXISTS intern_support(
            _id INT PRIMARY KEY AUTO_INCREMENT,
            service_name VARCHAR(30),
            title VARCHAR(30),
            description VARCHAR(200),
            poster INT,
            words_count INT,
            files VARCHAR(30),
            created_user_id INT,
            commments VARCHAR(30),
            FOREIGN KEY(created_user_id) REFERENCES user(_id),
            FOREIGN KEY(poster) REFERENCES poster(_id)
        );`,
        `CREATE TABLE IF NOT EXISTS e_notice(
            _id INT PRIMARY KEY AUTO_INCREMENT,
            service_name VARCHAR(30),
            express BOOLEAN,
            reminder BOOLEAN,
            description VARCHAR(200),
            poster INT,
            created_user_id INT,
            comments VARCHAR(30),
            FOREIGN KEY(created_user_id) REFERENCES user(_id),
            FOREIGN KEY(poster) REFERENCES poster(_id)
        );`,
        `CREATE TABLE IF NOT EXISTS publicity(
            _id INT PRIMARY KEY AUTO_INCREMENT,
            service_name VARCHAR(30),
            description VARCHAR(200),
            poster INT,
            created_user_id INT,
            comments VARCHAR(30),
            FOREIGN KEY(created_user_id) REFERENCES user(_id),
            FOREIGN KEY(poster) REFERENCES poster(_id)
        );`
    ]
}