"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BrandLogo } from "@/components/brand-logo";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      // Redirect handled by AuthProvider/Router
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to login. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="td-auth">
      <div className="td-auth-inner">
        <BrandLogo tone="plain" />

        <Card className="td-card">
          <CardHeader className="td-card-head">
            <h1 className="td-title">Sign In</h1>
            <CardDescription className="td-desc">
              Enter your email to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="td-card-body">
            <form onSubmit={handleSubmit} className="td-form">
              {error && (
                <Alert variant="destructive" className="td-callout td-callout-danger">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="td-field">
                <label htmlFor="email" className="td-label">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="td-input"
                />
              </div>
              <div className="td-field">
                <div className="td-field-row">
                  <label htmlFor="password" className="td-label">
                    Password
                  </label>
                  <Link href="/forgot-password" className="td-link">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="td-input"
                />
              </div>
              <Button
                className="td-btn td-btn-primary w-full"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="td-card-foot">
            <p className="td-meta">
              Don't have an account?{" "}
              <Link href="/register" className="td-link">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
