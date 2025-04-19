import React, { useState, useEffect } from 'react';
import { Zap, ArrowRight, X, Eye, EyeOff, LogIn } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Demo user emails
  const demoEmails = ['demo@example.com', 'test@qurioz.ai', 'user@demo.com'];
  
  // Animation mount effect
  useEffect(() => {
    setMounted(true);
    
    // Check if there's stored email for "remember me" functionality
    const storedEmail = localStorage.getItem('rememberedEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  // Check if the email is a demo email and set password automatically
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    // If email is in the demo list, automatically set a demo password
    if (demoEmails.includes(newEmail.toLowerCase())) {
      setPassword('demopassword');
      setRememberMe(true);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFormSubmitted(true);
    
    // Save email to localStorage if remember me is checked
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
    
    // Simulate successful login by storing a demo token
    const mockToken = 'demo-auth-token-' + Date.now();
    localStorage.setItem('token', mockToken);
    
    // Simulate login with delay
    setTimeout(() => {
      setLoading(false);
      
      // Redirect to the home page
      window.location.href = '/';
      
      // Alternative options for React Router:
      // 1. If using useNavigate hook: navigate('/')
      // 2. If using history: history.push('/')
      // 3. If using a callback: if (props.onLoginSuccess) props.onLoginSuccess(email)
    }, 1500);
  };
  
  // Form validation - in demo mode, all inputs are valid
  // This ensures login will work with any input
  const isEmailValid = true; // email.includes('@') && email.includes('.');
  const isPasswordValid = true; // password.length >= 6;
  const isFormValid = true; // Always allow form submission
  
  return (
    <div className="h-screen w-full flex flex-col bg-gray-50 font-sans">
      {/* Animated gradient background */}
      <div 
        className="fixed inset-0 -z-10 bg-white"
        style={{
          backgroundImage: "radial-gradient(circle at 25% 110%, rgba(255, 125, 184, 0.05), transparent 25%), radial-gradient(circle at 75% 10%, rgba(255, 193, 130, 0.05), transparent 25%)"
        }}
      ></div>
      
      {/* Demo banner - compact version */}
      {showBanner && (
        <div className="w-full px-4 py-2 bg-gradient-to-r from-amber-50 to-pink-50 border-b border-amber-100">
          <div className="w-full max-w-screen-xl mx-auto relative flex items-center justify-center">
                          <p className="text-center text-sm font-medium text-gray-700">
              Demo Mode: Any email and password will work for this demo
            </p>
            <button 
              onClick={() => setShowBanner(false)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-black hover:bg-opacity-5 transition-all duration-300"
              aria-label="Close banner"
            >
              <X size={14} className="text-gray-700" />
            </button>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div 
        className={`flex flex-1 overflow-hidden transition-all duration-700 ease-out ${
          mounted ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}
      >
        {/* Left side - Image with overlay */}
        <div className="hidden lg:block lg:w-3/5 relative overflow-hidden">
          <img 
            src="/assets/images/login_banner_1.png" 
            alt="Learning concept" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-20"></div>
          
          {/* Content overlay */}
          <div className={`absolute bottom-0 left-0 p-8 z-30 text-white transition-all duration-1000 delay-200 ${
            mounted ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <h2 className="text-3xl font-bold mb-2 text-white">
              Transform your learning experience
            </h2>
            <p className="text-lg text-white/90 max-w-md leading-relaxed mb-4">
              Join thousands of professionals enhancing their skills with our AI-powered learning platform.
            </p>
            <p className="text-sm text-white/90">Trusted by 10,000+ learners worldwide</p>
          </div>
        </div>
        
        {/* Right side - Login form */}
        <div className="w-full lg:w-2/5 flex flex-col py-4 px-4 sm:px-6 lg:px-8 overflow-auto bg-white/60 backdrop-blur-sm">
          <div className={`w-full max-w-md mx-auto flex-1 flex flex-col transition-all duration-1000 ${
            mounted ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}>
            {/* Welcome text */}
            <div className="mt-8 mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
              <p className="text-xl text-gray-600">Continue your learning journey where you left off</p>
            </div>
            
            {/* Login container */}
            <div className="bg-white rounded-xl p-5 shadow-sm shadow-gray-100 border border-gray-100">
              {/* Social login button */}
              <button className="w-full flex items-center justify-center py-3 px-4 bg-white rounded-lg mb-4 text-gray-700 font-medium text-sm transition-all border border-gray-200 hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-1">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Continue with Google</span>
                </div>
              </button>
              
              {/* Divider */}
              <div className="flex items-center my-4">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="px-3 text-sm text-gray-500 font-medium">or with email</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              
              {/* Error message */}
              {error && (
                <div className="mb-3 py-2 px-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-xs flex items-center" role="alert" aria-live="assertive">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{error}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email field */}
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r from-amber-400/30 to-pink-400/30 rounded-lg opacity-0 transition-opacity duration-300 -z-10 ${
                    emailFocused ? 'opacity-100' : ''
                  }`}></div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      className={`w-full py-2 px-3 bg-white rounded-lg focus:outline-none focus:ring-2 ${
                        emailFocused ? 'focus:ring-pink-400' : 'focus:ring-gray-200'
                      } focus:ring-opacity-50 border ${
                        formSubmitted && !isEmailValid ? 'border-red-300' : 'border-gray-200'
                      } transition-all text-gray-900 text-sm`}
                      placeholder="name@example.com"
                      required
                      aria-invalid={formSubmitted && !isEmailValid}
                      aria-describedby={formSubmitted && !isEmailValid ? "email-error" : undefined}
                    />
                    {formSubmitted && !isEmailValid && (
                      <p id="email-error" className="text-xs text-red-500 mt-1 ml-1">
                        Please enter a valid email address
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Password field */}
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r from-amber-400/30 to-pink-400/30 rounded-lg opacity-0 transition-opacity duration-300 -z-10 ${
                    passwordFocused ? 'opacity-100' : ''
                  }`}></div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700 ml-1">
                      Password
                    </label>
                    <a href="#" className="text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors">
                      Forgot?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                      className={`w-full py-2 px-3 bg-white rounded-lg focus:outline-none focus:ring-2 ${
                        passwordFocused ? 'focus:ring-pink-400' : 'focus:ring-gray-200'
                      } focus:ring-opacity-50 border ${
                        formSubmitted && !isPasswordValid ? 'border-red-300' : 'border-gray-200'
                      } transition-all text-gray-900 text-sm pr-10`}
                      placeholder="••••••••"
                      required
                      aria-invalid={formSubmitted && !isPasswordValid}
                      aria-describedby={formSubmitted && !isPasswordValid ? "password-error" : undefined}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-pink-500"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    {formSubmitted && !isPasswordValid && (
                      <p id="password-error" className="text-xs text-red-500 mt-1 ml-1">
                        Password must be at least 6 characters
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Remember me checkbox */}
                <div className="flex items-center py-1">
                  <div className="flex items-center">
                    <div className="relative">
                      <input 
                        id="remember-me" 
                        name="remember-me" 
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className="h-4 w-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500 focus:ring-offset-1" 
                      />
                      <div className={`absolute inset-0 bg-gradient-to-r from-amber-400 to-pink-500 rounded opacity-0 transition-opacity duration-200 ${
                        rememberMe ? 'opacity-10' : ''
                      }`}></div>
                    </div>
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                </div>
                
                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 relative bg-gradient-to-r from-pink-500 to-amber-400 text-white rounded-lg transition-all duration-300 hover:from-pink-600 hover:to-amber-500 hover:shadow-md hover:shadow-pink-200/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 flex items-center justify-center text-sm font-medium overflow-hidden group"
                  >
                    {/* Hover animation */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-300/0 via-white/20 to-pink-300/0 -translate-x-full group-hover:animate-shimmer"></div>
                    
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span className="mr-1">Sign in</span>
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
              
            {/* Sign up call-to-action */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="#" className="font-medium text-pink-500 hover:text-pink-600 transition-all hover:underline">
                  Create an account
                </a>
              </p>
            </div>
            
            {/* Footer */}
            <div className="mt-1 mb-0 text-center">
              <p className="text-xs text-gray-500">
                By signing in, you agree to our{' '}
                <a href="#" className="text-pink-500 hover:underline">Terms</a>{' '}
                and{' '}
                <a href="#" className="text-pink-500 hover:underline">Privacy Policy</a>
              </p>
              <p className="text-xs text-gray-400 mt-2">
                © 2025 Qurioz.ai • All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;