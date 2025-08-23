import { useState, useEffect } from "react";
import { Eye, EyeOff, Facebook, Phone, Mail, ArrowRight, MessageCircle, Sparkles, Users, Zap, Globe, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`
          }
        });
        
        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: "Account exists",
              description: "This email is already registered. Please sign in instead.",
              variant: "destructive"
            });
            setIsSignUp(false);
          } else {
            throw error;
          }
        } else {
          toast({
            title: "Account created",
            description: "Please check your email to confirm your account.",
          });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({
              title: "Invalid credentials",
              description: "Please check your email and password.",
              variant: "destructive"
            });
          } else {
            throw error;
          }
        } else {
          navigate("/");
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        {/* Left Half - Brand & Benefits */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 p-12 flex-col justify-center relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full animate-pulse"></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-secondary rounded-full animate-bounce"></div>
            <div className="absolute bottom-20 left-16 w-12 h-12 bg-accent rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-40 right-10 w-24 h-24 bg-primary/50 rounded-full animate-bounce delay-500"></div>
            <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-secondary rounded-full animate-pulse delay-700"></div>
          </div>

          {/* Floating elements */}
          <div className="absolute inset-0 opacity-20">
            <Sparkles className="absolute top-16 right-32 w-8 h-8 text-primary animate-pulse" />
            <Zap className="absolute bottom-32 left-20 w-6 h-6 text-secondary animate-bounce" />
            <Globe className="absolute top-2/3 right-16 w-10 h-10 text-accent animate-pulse delay-300" />
            <Users className="absolute bottom-16 right-32 w-7 h-7 text-primary animate-bounce delay-500" />
          </div>

          <div className="relative z-10">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Tikky
                </h1>
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-4 leading-tight">
                One platform for Your 
                <span className="text-primary"> Social Media Marketing</span>
              </h2>
              <p className="text-xl text-muted-foreground font-medium">
                Build communities, grow circles, and launch AI-powered campaigns
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="group hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4 p-6 rounded-2xl bg-background/40 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-all">
                    <Users className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Grow Circles</h3>
                    <p className="text-muted-foreground">Build engaged communities with AI-powered insights</p>
                  </div>
                </div>
              </div>

              <div className="group hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4 p-6 rounded-2xl bg-background/40 backdrop-blur-sm border border-secondary/20 hover:border-secondary/40 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-all">
                    <Zap className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">AI Campaigns</h3>
                    <p className="text-muted-foreground">Launch smart campaigns in seconds, not hours</p>
                  </div>
                </div>
              </div>

              <div className="group hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4 p-6 rounded-2xl bg-background/40 backdrop-blur-sm border border-accent/20 hover:border-accent/40 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-all">
                    <Globe className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Multi-Platform</h3>
                    <p className="text-muted-foreground">WhatsApp, Instagram, Threads & more</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Half - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background/95 backdrop-blur-sm">
          <Card className="w-full max-w-md shadow-2xl border border-border/50 backdrop-blur-sm bg-card/90">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {isSignUp ? "Join Tikky" : "Welcome back"}
                  </h2>
                </div>
                <p className="text-muted-foreground">
                  {isSignUp ? "Start your social media journey" : "Continue building your community"}
                </p>
              </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email or Username</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
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
                    className="pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full gap-2" 
                disabled={isLoading}
              >
                {isLoading 
                  ? (isSignUp ? "Creating Account..." : "Signing In...") 
                  : (isSignUp ? "Sign Up" : "Sign In")
                }
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </Button>
            </form>

            <div className="my-6">
              <div className="relative">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-card px-4 text-muted-foreground text-sm">OR</span>
                </div>
              </div>
            </div>

              <div className="space-y-3">
                <Button variant="outline" className="w-full group" type="button">
                  <MessageCircle className="w-4 h-4 mr-2 text-green-600 group-hover:scale-110 transition-transform" />
                  Continue with WhatsApp
                </Button>
                
                <Button variant="outline" className="w-full group" type="button">
                  <Facebook className="w-4 h-4 mr-2 text-blue-600 group-hover:scale-110 transition-transform" />
                  Continue with Facebook
                </Button>

                <Button variant="outline" className="w-full group" type="button">
                  <Phone className="w-4 h-4 mr-2 text-orange-600 group-hover:scale-110 transition-transform" />
                  Continue with Mobile
                </Button>
              </div>

              <div className="mt-6 text-center text-sm">
                <a href="#" className="text-primary hover:underline font-medium">
                  Forgot password?
                </a>
                <span className="text-muted-foreground mx-2">|</span>
                <button 
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-primary hover:underline font-medium"
                >
                  {isSignUp ? "Already have an account?" : "Create new account"}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 px-8 bg-background/90 backdrop-blur-sm border-t border-border/50">
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-muted-foreground">© 2024 Tikky. All rights reserved.</span>
          <span className="text-muted-foreground">|</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-foreground">Made in India</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="font-bold text-foreground">with love</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;