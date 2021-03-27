module.exports = {
    schema: [
        `create table if not exists users(
            _id int primary key auto_increment,
            name varchar(30),
            email varchar(30),
            password varchar(80)
            );`
    ]
}