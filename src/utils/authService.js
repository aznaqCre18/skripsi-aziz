export default class AuthService {
    setToken(idToken) {
        localStorage.setItem('id_token', idToken);
    };

    setProfile(profile) {
        localStorage.setItem('profile', JSON.stringify(profile));
    }
    
    setUserType(userType) {
        localStorage.setItem('user_type', userType);
    }

    setTahunAjaran(thnAjaran) {
        localStorage.setItem('tahun_ajaran', thnAjaran);
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    getProfile() {
        return localStorage.getItem('profile');
    }

    getUserType() {
        return localStorage.getItem('user_type');
    }

    getTahunAjaran() {
        return localStorage.getItem('tahun_ajaran');
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        localStorage.clear();
    }
}