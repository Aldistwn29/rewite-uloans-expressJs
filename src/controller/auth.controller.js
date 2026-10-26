import jwt from 'jsonwebtoken';


export const usersByEmail = new Map();
let idCounter = 1;

const JWT_SECRET = 'uloans_super_secret_key_2026';

// Registrasi
export const registrasi = (req, res) => {
    const { name, email, password } = req.body;

    if(
        typeof name !== 'string' ||
        typeof email !== 'string' ||
        typeof password !== 'string' ||
        !name.trim() ||
        !email.trim() ||
        !password.trim()
    ){
        return res.status(400).json({
            error: 'Bad Request',
            message: 'field name, email, and password are required'
        });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if(usersByEmail.has(normalizedEmail)){
        return res.status(409).json({
            error: 'Conflict',
            message: 'Email already registered'
        });
    }

    const newUser = {
        id: idCounter++,
        name: name.trim(),
        email: normalizedEmail,
        password,
        createdAt: new Date().toISOString()
    };

    usersByEmail.set(normalizedEmail, newUser);

    return res.status(201).json({
        success: true,
        message: 'Registered successfully',
        data: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            createdAt: newUser.createdAt
        }
    });
}

// Login
export const login = (req, res) => {
    const { email, password } = req.body;
    // validasi kredential
   if(
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !email.trim() ||
    !password
   ){
    return res.status(400).json({
        error: 'Bad Request',
        message: 'field email and password are required'
    });
   }

   const normalizedEmail = email.trim().toLowerCase();
   const user = usersByEmail.get(normalizedEmail);

   if(!user || user.password !== password){
    return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid email or password'
    });
   }

    // buat playload untuk JWT
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d'});

    return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        }
    });
};