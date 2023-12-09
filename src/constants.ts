export const API_ROOT = process.env.NODE_ENV === 'production' ? 'https://api.example.com' : 'http://localhost:3000'

export const LOGO = 'https://storage.googleapis.com/defiber-static/defiber%20Main%20Logo.png'

export const PLACEHOLDER_IMAGE = 'https://themeanmugstore.com/cdn/shop/files/white-glossy-mug-white-11oz-front-view-64d00d17ebe82.jpg?v=1691356474&width=1426'


export const SIGN_IN_MESSAGE = `0x${Buffer.from('Confirm your identity to Defiber Marketplace', 'utf8').toString('hex')}`;