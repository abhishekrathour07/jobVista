// Simple test to debug cookie issues
const testCookieSet = async (req, res) => {
    try {
        console.log('=== COOKIE TEST ===');
        console.log('Request Origin:', req.headers.origin);
        console.log('Request Headers:', req.headers);
        console.log('Environment Variables:', {
            NODE_ENV: process.env.NODE_ENV,
            FRONTEND_URL: process.env.FRONTEND_URL
        });

        // Set a simple test cookie
        res.cookie('test_cookie', 'test_value_123', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
            maxAge: 5 * 60 * 1000, // 5 minutes
        });

        console.log('Test cookie set successfully');
        return res.json({
            success: true,
            message: 'Test cookie set',
            origin: req.headers.origin,
            environment: process.env.NODE_ENV,
            frontendUrl: process.env.FRONTEND_URL
        });

    } catch (error) {
        console.error('Cookie test error:', error);
        return res.status(500).json({
            success: false,
            message: 'Cookie test failed',
            error: error.message
        });
    }
};

// Add this to your authController.js exports
export { login, signup, logout, forgotPassword, resetPassword, testCookieSet };
