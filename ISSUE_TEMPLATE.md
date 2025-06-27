# Google Sign-In Button Not Functional

## 🐛 Bug Description
The Google sign-in button is present in the UI but not functional. Users can see the button but clicking it doesn't trigger any authentication flow.

## 🔍 Current Behavior
- Google sign-in button appears on the login screen
- Button is clickable but doesn't perform any action
- No error messages or feedback when clicked
- Authentication flow doesn't start

## ✅ Expected Behavior
- Clicking the Google sign-in button should initiate Google OAuth flow
- User should be redirected to Google's authentication page
- After successful authentication, user should be logged in and redirected to the app

## 🛠️ Technical Details
- **Current Implementation**: Button exists but lacks proper Expo AuthSession setup
- **Required**: Integration with `expo-auth-session` for Google OAuth
- **Platform**: React Native (Expo)
- **Authentication Provider**: Google

## 📋 Tasks to Fix
- [ ] Install `expo-auth-session` package
- [ ] Configure Google OAuth credentials in Expo
- [ ] Implement proper Google sign-in flow using AuthSession
- [ ] Handle authentication response and user state
- [ ] Add error handling for failed authentication
- [ ] Test the complete authentication flow

## 🔧 Suggested Implementation
```typescript
// Example implementation structure
import * as AuthSession from 'expo-auth-session';

const googleSignIn = async () => {
  const redirectUri = AuthSession.makeRedirectUri({
    scheme: 'your-app-scheme'
  });
  
  const authUrl = `https://accounts.google.com/oauth/authorize?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20profile%20email`;
  
  const result = await AuthSession.startAsync({
    authUrl
  });
  
  // Handle authentication result
};
```

## 📱 Affected Screens
- `src/screens/LoginScreen.tsx`

## 🏷️ Labels
- `bug`
- `authentication`
- `google-signin`
- `expo`
- `good-first-issue`

## 📝 Additional Notes
This is a good first issue for contributors familiar with React Native and OAuth flows. The basic UI structure is already in place, only the authentication logic needs to be implemented.

**Priority**: Medium
**Estimated Time**: 2-4 hours 