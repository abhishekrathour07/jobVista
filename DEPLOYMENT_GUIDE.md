# Vercel Deployment Guide for JobVista

## ⚠️ IMPORTANT: Environment Variables Must Be Set in Vercel Dashboard

### Backend Deployment (Vercel)

1. **Go to your backend project in Vercel dashboard**
2. **Settings → Environment Variables**
3. **Add these variables:**

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
FRONTEND_URL=https://job-vista-frontend.vercel.app
NODE_ENV=production
```

### Frontend Deployment (Vercel)

1. **Go to your frontend project in Vercel dashboard**
2. **Settings → Environment Variables** 
3. **Add this variable:**

```
NEXT_PUBLIC_API_URL=https://job-vista-backend.vercel.app/api/v1
```

## 🔧 Step-by-Step Deployment Process

### Step 1: Deploy Backend First
1. Deploy your backend to Vercel
2. Note the URL (e.g., `https://job-vista-backend.vercel.app`)
3. Set environment variables in Vercel dashboard (not in code)

### Step 2: Deploy Frontend
1. In Vercel dashboard, set `NEXT_PUBLIC_API_URL` to your backend URL
2. Deploy your frontend to Vercel
3. Note the URL (e.g., `https://job-vista-frontend.vercel.app`)

### Step 3: Update Backend Environment
1. Go back to backend project in Vercel dashboard
2. Update `FRONTEND_URL` to your frontend URL
3. Redeploy backend

## 🚨 Common Issues and Solutions

### Issue 1: API calls going to frontend URL instead of backend
**Cause**: `NEXT_PUBLIC_API_URL` not set correctly in Vercel dashboard
**Solution**: Set environment variable in Vercel dashboard, not in code files

### Issue 2: CORS errors
**Cause**: Backend `FRONTEND_URL` not matching actual frontend URL
**Solution**: Ensure exact URL match in backend environment variables

### Issue 3: Cookies not being set
**Cause**: Fixed in code with `sameSite: 'none'` and `secure: true`
**Solution**: Already implemented in the code changes

## 📋 Verification Checklist

Before testing:
- [ ] Backend deployed with correct environment variables
- [ ] Frontend deployed with correct API URL  
- [ ] Both projects use HTTPS URLs
- [ ] Environment variables set in Vercel dashboard (not in code)
- [ ] Both projects redeployed after setting environment variables

## 🔍 Debugging

If still having issues:
1. Check browser Network tab - API calls should go to backend URL
2. Verify environment variables in Vercel dashboard
3. Check if cookies are being set in Application tab
4. Ensure both deployments use HTTPS

## 📝 Key Changes Made

1. **Fixed cookie settings**: `sameSite: 'none'` and `secure: true`
2. **Improved CORS**: Comprehensive CORS configuration
3. **Environment setup**: Proper environment variable configuration
4. **Deployment guide**: Step-by-step process for correct deployment
