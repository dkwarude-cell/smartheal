// Metro shim for Node builtins that should never run in React Native.
// This prevents Metro/Expo from treating `node:*` modules as externals and
// attempting to create Windows-invalid cache paths like `.expo/.../node:sea`.
module.exports = {};
