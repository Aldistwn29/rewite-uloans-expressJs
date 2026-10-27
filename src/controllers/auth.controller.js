import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository.js';

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not configured');
}

// Registrasi
export const registrasi = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'field name, email, and password are required',
      });
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await UserRepository.findByEmail(normalizedEmail);
    if (existingUser) {
      return res.status(409).json({
        error: 'Conflict',
        message: 'Email already registered',
      });
    }

    const newUser = await UserRepository.createUser({
      name: normalizedName,
      email: normalizedEmail,
      password,
    });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error('Register user failed: ', error);
    if (error.code == 'P2002') {
      return res.status(409).json({
        error: 'Conflict',
        message: 'Email already registered',
      });
    }

    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to register user',
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'field email and password are required',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await UserRepository.findByEmail(normalizedEmail);

    if (!user || user.password !== password) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid email or password',
      });
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.error('Login user failed: ', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to login user',
    });
  }
};
