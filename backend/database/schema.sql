CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS journal_prompts (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    prompt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS journal_responses (
    journal_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    response TEXT NOT NULL,
    FOREIGN KEY (journal_id) REFERENCES journal_prompts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (id, first_name, last_name, email, hashed_password) VALUES
    (1, 'Demo', 'User', 'demo@example.com', 'password');

INSERT INTO journal_prompts (id, prompt) VALUES
    (1, 'What is a very powerful memory from your past. How has it impacted you and what values were displayed?'),
    (2, 'Think about someone you look up to and admire. Why? What values does this person emanate?'),
    (3, 'What are some recurring situations in your life? What values do you think cause these?');
