module.exports = {
    schema: [
        `CREATE TABLE IF NOT EXISTS user(
            _id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(30) NOT NULL,
            email VARCHAR(30) UNIQUE NOT NULL,
            phone VARCHAR(15) NOT NULL,
            password VARCHAR(80) NOT NULL
            );`,
        `CREATE TABLE IF NOT EXISTS poster(
            _id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(20)
        );`,
        `CREATE TABLE IF NOT EXISTS online_meeting(
            _id INT PRIMARY KEY AUTO_INCREMENT,
            service_name VARCHAR(30) NOT NULL,
            description VARCHAR(200),
            poster INT,
            creator_id INT NOT NULL,
            comments VARCHAR(30),
            speaker_name VARCHAR(30) NOT NULL,
            speaker_email VARCHAR(30) NOT NULL,
            FOREIGN KEY(creator_id) REFERENCES user(_id),
            FOREIGN KEY(poster) REFERENCES poster(_id)
        );`,
        `CREATE TABLE IF NOT EXISTS intern_support(
            _id INT PRIMARY KEY AUTO_INCREMENT,
            service_name VARCHAR(30) NOT NULL,
            title VARCHAR(30) NOT NULL,
            description VARCHAR(200),
            poster INT,
            creator_id INT NOT NULL,
            commments VARCHAR(30),
            words_count INT,
            files VARCHAR(30),
            FOREIGN KEY(creator_id) REFERENCES user(_id),
            FOREIGN KEY(poster) REFERENCES poster(_id)
        );`,
        `CREATE TABLE IF NOT EXISTS e_notice(
            _id INT PRIMARY KEY AUTO_INCREMENT,
            service_name VARCHAR(30) NOT NULL,
            description VARCHAR(200),
            poster INT,
            creator_id INT NOT NULL,
            comments VARCHAR(30),
            express BOOLEAN NOT NULL,
            reminder BOOLEAN NOT NULL,
            FOREIGN KEY(creator_id) REFERENCES user(_id),
            FOREIGN KEY(poster) REFERENCES poster(_id)
        );`,
        `CREATE TABLE IF NOT EXISTS publicity(
            _id INT PRIMARY KEY AUTO_INCREMENT,
            service_name VARCHAR(30) NOT NULL,
            description VARCHAR(200) NOT NULL,
            poster INT,
            creator_id INT NOT NULL,
            comments VARCHAR(30),
            FOREIGN KEY(creator_id) REFERENCES user(_id),
            FOREIGN KEY(poster) REFERENCES poster(_id)
        );`
    ]
}