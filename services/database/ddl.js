module.exports = {
    schema: [
        `CREATE TABLE IF NOT EXISTS user(
            _id INT PRIMARY KEY AUTO_INCREMENT,
            role VARCHAR(20),
            name VARCHAR(30) NOT NULL,
            email VARCHAR(30) UNIQUE NOT NULL,
            phone VARCHAR(15) NOT NULL,
            password VARCHAR(80) NOT NULL
        );`,
        `CREATE TABLE IF NOT EXISTS service_config(
            _id INT PRIMARY KEY AUTO_INCREMENT,
            type VARCHAR(20) NOT NULL,
            service_name VARCHAR(30),
            follow_hierarchy BOOLEAN DEFAULT 0,
            follow_assignment BOOLEAN DEFAULT 1,
            advance_days INT DEFAULT 5,
            padding_between_bookings_mins INT DEFAULT 15,
            assigned_to INT,
            FOREIGN KEY (assigned_to) REFERENCES user(_id)
        );`,
        `CREATE TABLE IF NOT EXISTS online_meeting(
            _id INT PRIMARY KEY AUTO_INCREMENT,
            service_name VARCHAR(30) NOT NULL,
            description VARCHAR(200),
            img VARCHAR(50),
            status VARCHAR(10) DEFAULT "PENDING",
            creator_id INT NOT NULL,
            comments VARCHAR(30),
            start_time DATETIME NOT NULL,
            end_time DATETIME NOT NULL,
            speaker_name VARCHAR(30) NOT NULL,
            speaker_email VARCHAR(30) NOT NULL,
            co_hosts JSON,
            FOREIGN KEY(creator_id) REFERENCES user(_id)
        );`,
        `CREATE TABLE IF NOT EXISTS intern_support(
            _id INT PRIMARY KEY AUTO_INCREMENT,
            service_name VARCHAR(30) NOT NULL,
            title VARCHAR(30) NOT NULL,
            description VARCHAR(200),
            status VARCHAR(10) DEFAULT "PENDING",
            creator_id INT NOT NULL,
            commments VARCHAR(30),
            start_time DATETIME NOT NULL,
            end_time DATETIME NOT NULL,
            words_count INT,
            purpose VARCHAR(30),
            dimensions VARCHAR(20),
            url VARCHAR(100),
            file VARCHAR(50),
            FOREIGN KEY(creator_id) REFERENCES user(_id)
        );`,
        `CREATE TABLE IF NOT EXISTS e_notice(
            _id INT PRIMARY KEY AUTO_INCREMENT,
            service_name VARCHAR(30) NOT NULL,
            description VARCHAR(200),
            img VARCHAR(50),
            status VARCHAR(10) DEFAULT "PENDING",
            creator_id INT NOT NULL,
            comments VARCHAR(30),
            publish_time DATETIME NOT NULL,
            express BOOLEAN NOT NULL DEFAULT false,
            reminder BOOLEAN NOT NULL DEFAULT true,
            FOREIGN KEY(creator_id) REFERENCES user(_id)
        );`,
        `CREATE TABLE IF NOT EXISTS publicity(
            _id INT PRIMARY KEY AUTO_INCREMENT,
            service_name VARCHAR(30) NOT NULL,
            description VARCHAR(200) NOT NULL,
            img VARCHAR(50),
            status VARCHAR(10) DEFAULT "PENDING",
            creator_id INT NOT NULL,
            comments VARCHAR(30),
            publish_time DATETIME NOT NULL,
            FOREIGN KEY(creator_id) REFERENCES user(_id)
        );`,
        `CREATE TABLE IF NOT EXISTS alt(
            _id INT PRIMARY KEY AUTO_INCREMENT,
            online_meeting_id INT,
            intern_support_id INT,
            e_notice_id INT,
            publicity_id INT,
            FOREIGN KEY(online_meeting_id) REFERENCES online_meeting(_id),
            FOREIGN KEY(intern_support_id) REFERENCES intern_support(_id),
            FOREIGN KEY(e_notice_id) REFERENCES e_notice(_id),
            FOREIGN KEY(publicity_id) REFERENCES publicity(_id)
        );`,
        `CREATE TABLE IF NOT EXISTS next_to_approve(
            user_id INT NOT NULL,
            alt_id INT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES user(_id),
            FOREIGN KEY (alt_id) REFERENCES alt(_id)
        );`,
        `CREATE TABLE IF NOT EXISTS response(
            user_id INT NOT NULL,
            alt_id INT NOT NULL,
            encourages BOOLEAN,
            response VARCHAR(100),
            FOREIGN KEY(user_id) REFERENCES user(_id),
            FOREIGN KEY(alt_id) REFERENCES alt(_id) 
        );`
    ]
}