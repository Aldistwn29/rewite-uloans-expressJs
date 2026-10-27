import { UserRepository } from '../repositories/user.repository.js';

const toPublicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
});

export const getProfile = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'User ID tidak ditemukan dalam token',
      });
    }

    const user = await UserRepository.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User tidak ditemukan',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: toPublicUser(user),
    });
  } catch (error) {
    console.error('Registrasi user failed: ', error);

    if (error.code === 'P2002') {
      return res.status(409).json({
        error: 'Conflict',
        message: 'Email atau name sudah terdaftar',
      });
    }

    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Gagal mengambil data profile user',
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { name } = req.body ?? {};

    if (!userId) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Informasi user pada token tidak ditemukan',
      });
    }

    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Nama wajib diisi',
      });
    }

    const existingUser = await UserRepository.findById(userId);

    if (!existingUser) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User tidak ditemukan',
      });
    }

    const updatedUser = await UserRepository.updateName(userId, name.trim());

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: toPublicUser(updatedUser),
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update user profile',
    });
  }
};
