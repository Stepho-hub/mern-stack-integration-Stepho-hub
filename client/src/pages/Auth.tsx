import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Mail, Lock, User, Sparkles, Heart } from 'lucide-react';

const Auth = () => {
  const { user, loading, signUp, signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');

  // Redirect authenticated users away from auth page
  useEffect(() => {
    if (!loading && user) {
      window.location.href = '/';
    }
  }, [user, loading]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-400 via-purple-500 to-pink-500 animate-gradient-y opacity-50"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-white/10 rounded-full animate-bounce delay-100"></div>
        <div className="absolute top-40 right-32 w-16 h-16 bg-white/10 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-32 w-12 h-12 bg-white/10 rounded-full animate-bounce delay-500"></div>

        <div className="relative z-10 text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping"></div>
          </div>
          <p className="text-white text-xl font-semibold animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      await signUp(
        formData.get('username') as string,
        formData.get('email') as string,
        formData.get('password') as string
      );
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validate form data
    if (!email || !password) {
      console.error('Missing email or password');
      setIsLoading(false);
      return;
    }

    try {
      await signIn(email, password);
    } catch (error) {
      console.error('Sign in error:', error);
      // Don't show error toast here as AuthContext already does it
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-pink-500 via-purple-500 to-cyan-500 opacity-80 animate-gradient-x"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-yellow-400 via-orange-500 to-red-500 opacity-60 animate-gradient-y"></div>

      {/* Floating Animated Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-float delay-0"></div>
      <div className="absolute top-20 right-20 w-24 h-24 bg-white/5 rounded-full animate-float delay-200"></div>
      <div className="absolute bottom-20 left-20 w-28 h-28 bg-white/5 rounded-full animate-float delay-400"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 bg-white/5 rounded-full animate-float delay-600"></div>

      {/* Sparkle Effects */}
      <Sparkles className="absolute top-16 left-16 w-6 h-6 text-yellow-300 animate-pulse delay-100" />
      <Sparkles className="absolute top-32 right-32 w-4 h-4 text-pink-300 animate-pulse delay-300" />
      <Sparkles className="absolute bottom-24 left-24 w-5 h-5 text-blue-300 animate-pulse delay-500" />
      <Heart className="absolute bottom-16 right-16 w-6 h-6 text-red-300 animate-pulse delay-700" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl animate-slide-up">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center animate-bounce-gentle">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent animate-fade-in">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-200 animate-fade-in delay-200">
              Join our amazing blogging community
            </CardDescription>
          </CardHeader>

          <CardContent className="animate-fade-in delay-300">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-sm border border-white/20">
                <TabsTrigger
                  value="signin"
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white transition-all duration-300"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white transition-all duration-300"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-6 animate-slide-in-left">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-white font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <div className="relative">
                      <Input
                        id="signin-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-white/40 transition-all duration-300 pl-4 pr-4"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-white font-medium flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="signin-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-white/40 transition-all duration-300 pl-4 pr-12"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Signing in...
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-6 animate-slide-in-right">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-username" className="text-white font-medium flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Username
                    </Label>
                    <div className="relative">
                      <Input
                        id="signup-username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-white/40 transition-all duration-300 pl-4 pr-4"
                        placeholder="Choose a username"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-white font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <div className="relative">
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-white/40 transition-all duration-300 pl-4 pr-4"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-white font-medium flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-white/40 transition-all duration-300 pl-4 pr-12"
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Creating account...
                      </div>
                    ) : (
                      'Sign Up'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;