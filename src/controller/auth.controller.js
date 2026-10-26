import jwt from 'jsonwebtoken';


const userByEmail = new Map();
let idCounter = 1;

const JWT_SECRET = 'uloans_super_secret_key_2026';

// Registrasi
export const registrasi = (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            error: 'Bad Request',
            message: 'field name, email, and password are required'
        });
    }

    // cek apakah email sudah terdaftar
    if(userByEmail.has(email)){
        return res.status(409).json({
            error: 'Conflict',
            message: 'Email already registered'
        });
    }

    // convert data user ke object
    const newUser = {
        id: idCounter++,
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    } ;

    // save user ke map
    userByEmail.set(email, newUser);

    return res.status(201).json({
        success: true,
        message: 'Registration successful',
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

    if(!email || !password){
        return res.status(400).json({
            error: 'Bad Request',
            message: 'field email and password are required'
        });
    }

    const user = userByEmail.get(email);

    // validasi kredential
    if(!user || user.password != password){
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