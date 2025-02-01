const Usuario = require('../modelos/modeloUsuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar usuario
exports.registrarUsuario = async (req, res) => {
    const { nombre, correo, contraseña, direccion, telefono, rol } = req.body;
    try {
        // Verifica si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ correo });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado' });
        }

        // Hashea la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Crea un nuevo usuario
        const nuevoUsuario = new Usuario({
            nombre,
            correo,
            contraseña: hashedPassword,
            direccion,
            telefono,
            rol: rol || 'cliente', // Si no se especifica rol, se asigna 'cliente'
        });

        // Guarda el usuario en la base de datos
        const usuarioGuardado = await nuevoUsuario.save();

        return res.status(201).json({ mensaje: 'Usuario registrado', usuario: usuarioGuardado });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al registrar el usuario', error: error.message });
    }
};

// Iniciar sesión
exports.iniciarSesion = async (req, res) => {
    const { correo, contraseña } = req.body;
    try {
        // Busca al usuario por correo
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Compara la contraseña
        const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!esValida) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        // Genera el token JWT
        const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ mensaje: 'Inicio de sesión exitoso', token });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
    }
};

// Obtener perfil de usuario
exports.obtenerPerfilUsuario = async (req, res) => {
    const userId = req.user.id; // Esto viene del token JWT después de autenticación
    try {
        const usuario = await Usuario.findById(userId, '-contraseña'); // Excluye la contraseña
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        return res.status(200).json({ usuario });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener el perfil del usuario', error: error.message });
    }
};

// Actualizar perfil de usuario
exports.actualizarPerfilUsuario = async (req, res) => {
    const userId = req.user.id;
    const { nombre, correo, direccion, telefono, rol } = req.body;
    try {
        // Actualiza el usuario y devuelve el documento actualizado
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            userId,
            { nombre, correo, direccion, telefono, rol },
            { new: true, runValidators: true, select: '-contraseña' } // Devuelve el usuario actualizado excluyendo la contraseña
        );

        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        return res.status(200).json({ mensaje: 'Perfil actualizado', usuario: usuarioActualizado });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al actualizar el perfil', error: error.message });
    }
};
