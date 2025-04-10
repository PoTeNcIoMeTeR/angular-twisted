const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000; // Порт, на якому буде працювати сервер

// Middleware
app.use(cors()); // Дозволяємо запити з інших джерел (наприклад, з Angular на порту 4200)
app.use(express.json()); // Дозволяємо серверу читати JSON з тіла запиту

// "База даних" в пам'яті (просто масив)
let users = []; // Будемо зберігати { id, email, username }
let nextUserId = 1;

console.log('Initializing server...');

// ---- Маршрути (Ендпоінти API) ----

// GET /api/users (для тестування, щоб побачити всіх користувачів)
app.get('/api/users', (req, res) => {
    console.log('[GET /api/users] Requested user list');
    res.status(200).json(users);
});

// POST /api/register (Реєстрація нового користувача)
app.post('/api/register', (req, res) => {
    const { email, username, password } = req.body; // Отримуємо дані з тіла запиту

    console.log('[POST /api/register] Attempting to register:', { email, username });

    // Проста валідація на сервері (можна додати більше)
    if (!email || !username || !password) {
        console.error('[POST /api/register] Bad Request: Missing fields');
        return res.status(400).json({ message: 'Email, username, and password are required.' });
    }

    // Перевірка, чи існує користувач з таким email
    const emailExists = users.some(user => user.email === email);

    if (emailExists) {
        console.warn('[POST /api/register] Conflict: Email already exists:', email);
        return res.status(409).json({ message: `Email "${email}" already exists.` }); // 409 Conflict
    }

    // Створюємо нового користувача (БЕЗ пароля!)
    const newUser = {
        id: nextUserId++,
        email: email,
        username: username
    };
    users.push(newUser); // Додаємо до нашої "бази"

    console.log('[POST /api/register] User registered successfully:', newUser);
    res.status(201).json(newUser); // 201 Created, повертаємо створеного користувача
});

// POST /api/login (Вхід користувача)
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    console.log('[POST /api/login] Attempting to login:', { email });

    if (!email || !password) {
        console.error('[POST /api/login] Bad Request: Missing fields');
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Пошук користувача за email
    const foundUser = users.find(user => user.email === email);

    // перевіркf пароля: просто перевіряємо, чи користувач знайдений
    if (foundUser) {
        console.log('[POST /api/login] Login successful for user:', foundUser);
        // Повертаємо дані користувача та/або імітацію токена
        res.status(200).json({
            message: 'Login successful',
            user: foundUser,
            token: `dummy-token-for-${foundUser.email}-${Date.now()}` // Простий токен
        });
    } else {
        console.warn('[POST /api/login] Unauthorized: Invalid credentials for:', email);
        res.status(401).json({ message: 'Invalid credentials.' }); // 401 Unauthorized
    }
});

// ---- Запуск сервера ----
app.listen(port, () => {
    console.log(`Simple Auth backend listening on http://localhost:${port}`);
    console.log('Current users:', users); // Показуємо початковий стан
});

// Проста обробка помилок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});