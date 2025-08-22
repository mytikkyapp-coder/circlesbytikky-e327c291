import { useState } from "react";
import { Eye, EyeOff, Facebook, Mail, ArrowRight, MessageCircle, Users, Zap, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const FrontPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Dummy credentials for testing
  const dummyCredentials = {
    email: "demo@tikky.in",
    password: "demo123"
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Check if using dummy credentials
        if (email === dummyCredentials.email && password === dummyCredentials.password) {
          toast({
            title: "Demo Login Successful! 🎉",
            description: "Welcome to Circles by Tikky",
          });
          navigate("/dashboard");
          return;
        }

        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back! 🎉",
            description: "Successfully logged in to Circles",
          });
          navigate("/dashboard");
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`
          }
        });

        if (error) {
          toast({
            title: "Signup Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account Created! 🎉",
            description: "Check your email to verify your account",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        toast({
          title: "Facebook Login Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Facebook Login Error",
        description: "Unable to connect with Facebook",
        variant: "destructive",
      });
    }
  };

  const useDummyCredentials = () => {
    setEmail(dummyCredentials.email);
    setPassword(dummyCredentials.password);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Half - Brand & Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-primary/5 to-background p-12 flex-col justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-20 h-20 bg-secondary rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-32 left-32 w-24 h-24 bg-accent rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 bg-primary rounded-full animate-bounce delay-700"></div>
        </div>

        <div className="relative z-10 space-y-8">
          {/* Brand Header */}
          <div className="space-y-4">
            <Badge className="bg-primary/20 text-primary border-primary/30">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered Platform
            </Badge>
            <h1 className="text-5xl font-bold text-foreground leading-tight">
              Welcome to
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block">
                Circles by Tikky
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Transform your community marketing with AI-powered WhatsApp automation and instant campaign deployment.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg text-foreground">Smart Circles</h3>
                <p className="text-muted-foreground">Build and manage engaged WhatsApp communities with AI assistance</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg text-foreground">Instant Campaigns</h3>
                <p className="text-muted-foreground">Launch targeted ad campaigns across platforms in seconds</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg text-foreground">Multi-Platform</h3>
                <p className="text-muted-foreground">WhatsApp, Instagram, Threads - all in one dashboard</p>
              </div>
            </div>
          </div>

          {/* Social proof */}
          <div className="flex items-center space-x-8 pt-6 border-t border-border/50">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Active Circles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">500K+</div>
              <div className="text-sm text-muted-foreground">Messages Sent</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">99%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Half - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-background to-muted/20">
        <Card className="w-full max-w-md shadow-medium border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-foreground">
              {isLogin ? "Welcome Back!" : "Join Circles"}
            </CardTitle>
            <p className="text-muted-foreground">
              {isLogin ? "Sign in to your account" : "Create your account for instant access"}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Quick Demo Access */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="text-center space-y-3">
                  <CheckCircle className="w-8 h-8 text-primary mx-auto" />
                  <div>
                    <h4 className="font-semibold text-foreground">Try Demo Access</h4>
                    <p className="text-sm text-muted-foreground">Use demo credentials for instant access</p>
                  </div>
                  <Button 
                    onClick={useDummyCredentials}
                    variant="outline" 
                    className="w-full border-primary/30 text-primary hover:bg-primary/10"
                  >
                    Load Demo Credentials
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Email: {dummyCredentials.email} | Password: {dummyCredentials.password}
                  </p>
                </div>
              </CardContent>
            </Card>

            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 bg-background/50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pr-10 bg-background/50"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90" 
                disabled={loading}
              >
                {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-card px-4 text-muted-foreground text-sm">OR</span>
              </div>
            </div>

            <Button 
              onClick={handleFacebookLogin}
              variant="outline" 
              className="w-full border-blue-500/30 text-blue-600 hover:bg-blue-50"
            >
              <Facebook className="w-4 h-4 mr-2" />
              Continue with Facebook
            </Button>

            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline font-medium"
              >
                {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
              </button>
              
              {isLogin && (
                <div className="text-sm">
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Forgot your password?
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FrontPage;