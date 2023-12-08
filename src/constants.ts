export const API_ROOT = process.env.NODE_ENV === 'production' ? 'https://api.example.com' : 'http://localhost:3000'

export const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/150'

export const SIGN_IN_MESSAGE = `0x${Buffer.from('Confirm your identity to Defiber Marketplace', 'utf8').toString('hex')}`;