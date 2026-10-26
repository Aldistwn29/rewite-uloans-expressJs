import { usersByEmail } from './auth.controller.js';


export const getProfile = (req, res) => {
    const email = req.user?.email?.trim().toLowerCase();
    // validasi user
    if(!email){
        return res.status(404).json({
            error: 'Unauthorized',
            message: 'Informasi user pada token tidak ditemukan'
        });
    }
    const user = usersByEmail.get(email);
    if(!user){
        return res.status(404).json({
            error: 'Not Found',
            message: 'user tidak ditemukan'
        });
    }
    
    return res.status(200).json({
        success: true,
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        }
    });
};

// updated profile
export const updateProfile = (req, res) => {
    const email = req.user.email;
    const { name } = req.body ?? {};

    if(!name){
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Profile pengguna tidak ditemukan'
        });
    }

    const user = usersByEmail.get(email);

    if(!user){
        return res.status(404).json({
            error: 'Not Found',
            message: 'user tidak ditemukan'
        });
    }

    user.name = name;

    return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data:{
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: new Date().toISOString()
        }
    });
}