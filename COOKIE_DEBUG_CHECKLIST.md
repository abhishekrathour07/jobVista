# Cookie Debugging Checklist

## 1. Verify Environment Variables

### In Vercel Backend Dashboard:
- [ ] `FRONTEND_URL` = `https://job-vista-frontend.vercel.app`
- [ ] `NODE_ENV` = `production`
- [ ] `JWT_SECRET` = `your_jwt_secret`
- [ ] `MONGODB_URI` = `your_mongodb_connection`

### In Vercel Frontend Dashboard:
- [ ] `NEXT_PUBLIC_API_URL` = `https://job-vista-axpldqa2m-abhishek-singhs-projects-0bb4884b.vercel.app/api/v1`

## 2. Testing Steps

### After deploying both projects:

1. **Test Cookie Endpoint**
   - Open your deployed frontend: `https://job-vista-frontend.vercel.app`
   - Look for "Cookie Debugger" in bottom-left corner
   - Click "Test Cookie" button
   - Check browser DevTools > Application > Storage > Cookies

2. **Test Login**
   - Click "Test Login" button in debugger
   - Check for `auth_token` cookie in browser storage

3. **Check Backend Logs**
   - Go to Vercel backend dashboard
   - Check "Functions" tab for logs
   - Look for debug messages we added

## 3. Browser DevTools Debugging

### Network Tab:
- [ ] Login request goes to backend URL (not frontend)
- [ ] Response includes `Set-Cookie` header
- [ ] Status code is 200

### Application Tab:
- [ ] Check Storage > Cookies > your-frontend-domain
- [ ] Look for `auth_token` or `test_cookie`

### Console Tab:
- [ ] Check for CORS errors
- [ ] Check for any JavaScript errors

## 4. Common Issues

### Issue: Cookie not set
**Check:**
- Are both domains using HTTPS?
- Is `sameSite: 'none'` with `secure: true`?
- Is CORS properly configured?

### Issue: Wrong API URL
**Check:**
- Frontend making requests to backend URL?
- Environment variables set in Vercel dashboard?

### Issue: CORS errors
**Check:**
- Backend `FRONTEND_URL` matches actual frontend domain?
- CORS allows credentials?

## 5. Expected Behavior

After successful login:
1. Network tab shows POST to backend `/login`
2. Response includes `Set-Cookie` header
3. Cookie appears in Application > Storage > Cookies
4. User redirected to appropriate dashboard

## 6. Next Steps

If cookies still not working:
1. Check backend logs for debug messages
2. Verify exact URLs in environment variables
3. Test with different browsers
4. Check if third-party cookies are blocked

## 7. Debug Code Added

- Added logging to login endpoint
- Added test cookie endpoint: `/api/v1/test-cookie`
- Added CookieDebugger component (only shows in development)
- Enhanced CORS configuration
