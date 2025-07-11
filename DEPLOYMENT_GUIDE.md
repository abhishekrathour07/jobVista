# Vercel Deployment Guide for JobVista

## Backend Deployment (Vercel)

### 1. Environment Variables
Set these environment variables in your Vercel backend project:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
FRONTEND_URL=https://your-frontend-domain.vercel.app
NODE_ENV=production
```

### 2. Important Notes
- Make sure `FRONTEND_URL` points to your actual frontend Vercel domain
- The JWT_SECRET should be a strong, unique string
- NODE_ENV should be set to 'production'

## Frontend Deployment (Vercel)

### 1. Environment Variables
Set these environment variables in your Vercel frontend project:

```
NEXT_PUBLIC_API_URL=https://your-backend-domain.vercel.app/api/v1
```

### 2. Important Notes
- Make sure `NEXT_PUBLIC_API_URL` points to your actual backend Vercel domain
- Include `/api/v1` at the end as per your backend routes

## Common Issues and Solutions

### Issue 1: Cookies not being set
**Solution**: The backend now uses `sameSite: 'none'` and `secure: true` for cross-origin cookie support.

### Issue 2: CORS errors
**Solution**: Backend CORS is configured to accept your frontend domain and credentials.

### Issue 3: Authentication failing
**Solution**: Make sure both frontend and backend URLs are correctly set in environment variables.

## Testing the Deployment

1. Deploy backend first and note the URL
2. Update frontend `NEXT_PUBLIC_API_URL` with backend URL
3. Deploy frontend and note the URL
4. Update backend `FRONTEND_URL` with frontend URL
5. Test login/logout functionality

## Troubleshooting

If you're still having issues:

1. Check browser developer tools for CORS errors
2. Verify environment variables are set correctly in both deployments
3. Make sure both domains are using HTTPS
4. Check if cookies are being set in browser storage

## Key Changes Made

1. **Fixed cookie settings**: Now uses `sameSite: 'none'` and `secure: true` for production
2. **Improved CORS**: Added more comprehensive CORS configuration
3. **Proper logout**: Clear cookies with same attributes as when setting them
