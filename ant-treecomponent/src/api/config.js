let api = 'serverApi';
if (process.env.NODE_ENV === 'development') {
    api = '/mockapi'
}
export default api;