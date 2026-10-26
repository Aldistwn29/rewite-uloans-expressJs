import jwt from 'jsonwebtoken';

const JWT_SECRET = 'uloans_super_secret_key_2026';


export const verfiyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'akses ditolak, token authentikasi tidak ditemukan'
        });
    }


    // verifikasi token menggunakan JWT_SECRET
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err){
            return res.status(403).json({
                error: 'Forbidden',
                message: 'token tidak valid atau sudah kadaluarsa'
            });
        }

     // simpan data user ke request object
    req.user = user;
    next();
    });
};