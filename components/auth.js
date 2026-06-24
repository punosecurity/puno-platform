(() => {
    // The server address we just spun up
    const API_BASE = 'http://localhost:5202/api';

    // Helper to make requests with credentials (cookies) included automatically
    async function apiFetch(endpoint, options = {}) {
        options.credentials = 'include'; // Essential for secure httpOnly cookies
        options.headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
        
        const response = await fetch(`${API_BASE}${endpoint}`, options);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Request failed with status ${response.status}`);
        }
        
        return response.json().catch(() => null);
    }

    // Exposed authentication functions for your frontend components
    window.Auth = {
        // Register a new user
        async register(username, password) {
            try {
                return await apiFetch('/register', {
                    method: 'POST',
                    body: JSON.stringify({ username, password })
                });
            } catch (error) {
                alert(error.message);
                throw error;
            }
        },

        // Login a user (Server will reject if account is disabled)
        async login(username, password) {
            try {
                const data = await apiFetch('/login', {
                    method: 'POST',
                    body: JSON.stringify({ username, password })
                });
                alert(`Welcome back, ${data.username}! Role: ${data.role}`);
                return data;
            } catch (error) {
                alert(`Login Failed: ${error.message}`);
                throw error;
            }
        },

        // Logout and destroy cookie session on server
        async logout() {
            try {
                await apiFetch('/logout', { method: 'POST' });
                alert('Logged out safely.');
            } catch (error) {
                console.error('Logout error:', error);
            }
        },

        // Check user session status securely: "Am I logged in? Am I admin?"
        async checkSession() {
            try {
                return await apiFetch('/me');
            } catch {
                return null; // Not logged in or expired cookie
            }
        },

        // Admin functionality: Disable an account from the server side
        async disableUser(username, reason) {
            try {
                return await apiFetch('/admin/disable', {
                    method: 'POST',
                    body: JSON.stringify({ username, reason })
                });
            } catch (error) {
                alert(`Admin Action Failed: ${error.message}`);
                throw error;
            }
        },

        // Admin functionality: Re-enable an account from the server side
        async enableUser(username) {
            try {
                return await apiFetch('/admin/enable', {
                    method: 'POST',
                    body: JSON.stringify({ username })
                });
            } catch (error) {
                alert(`Admin Action Failed: ${error.message}`);
                throw error;
            }
        }
    };
})();