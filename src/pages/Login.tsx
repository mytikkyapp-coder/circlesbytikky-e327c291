import { useState } from "react";
import { Eye, EyeOff, Facebook, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex">
      {/* Left Half - Brand & Benefits */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 to-primary/5 p-12 flex-col justify-center relative overflow-hidden">
        {/* Subtle background doodles */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
            <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="2" />
            <circle cx="300" cy="150" r="15" stroke="currentColor" strokeWidth="2" />
            <circle cx="150" cy="300" r="25" stroke="currentColor" strokeWidth="2" />
            <path d="M50 200 Q 100 150, 150 200 T 250 200" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M200 50 Q 250 100, 300 50" stroke="currentColor" strokeWidth="2" fill="none" />
            <rect x="80" y="250" width="30" height="30" stroke="currentColor" strokeWidth="2" rx="5" />
            <polygon points="350,80 370,120 330,120" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Circles by <span className="text-primary">Tikky</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              AI-powered community marketing
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-bold text-sm">🚀</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Grow Circles</h3>
                <p className="text-muted-foreground">Build engaged communities</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-bold text-sm">⚡</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">AI Campaigns</h3>
                <p className="text-muted-foreground">Launch ads in seconds</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-bold text-sm">📱</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Multi-Platform</h3>
                <p className="text-muted-foreground">WhatsApp, Instagram, Threads</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Half - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-medium border-0">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
              <p className="text-muted-foreground mt-2">Sign in to Tikky</p>
            </div>

            <form className="space-y-6">
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

              <Button type="submit" className="w-full">
                Sign In
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
              <Button variant="outline" className="w-full" type="button">
                <Phone className="w-4 h-4 mr-2" />
                Login with Mobile
              </Button>
              
              <Button variant="outline" className="w-full" type="button">
                <Facebook className="w-4 h-4 mr-2" />
                Login with Facebook
              </Button>
            </div>

            <div className="mt-6 text-center text-sm">
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
              <span className="text-muted-foreground mx-2">|</span>
              <a href="#" className="text-primary hover:underline">
                Sign Up
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;