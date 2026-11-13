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

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      await register(email, password, inviteCode);
      // Redirect handled by AuthProvider/Router
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to register. Please try again.");
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
            <h1 className="td-title">Create Account</h1>
            <CardDescription className="td-desc">
              Family only — you need the invite code to sign up
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
                <label htmlFor="inviteCode" className="td-label">
                  Family Invite Code
                </label>
                <Input
                  id="inviteCode"
                  type="text"
                  autoComplete="off"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  required
                  className="td-input"
                />
              </div>
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
                <label htmlFor="password" className="td-label">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="td-input"
                />
              </div>
              <div className="td-field">
                <label htmlFor="confirmPassword" className="td-label">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                    Creating account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="td-card-foot">
            <p className="td-meta">
              Already have an account?{" "}
              <Link href="/login" className="td-link">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
