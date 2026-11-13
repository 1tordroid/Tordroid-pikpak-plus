"use client";

import { useState } from "react";
import Link from "next/link";
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
import { forgotPassword } from "@/lib/auth-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await forgotPassword(email);
      setSuccess(
        "If a user with this email exists, a password reset link has been sent.",
      );
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to request password reset. Please try again.");
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
            <h1 className="td-title">Forgot Password</h1>
            <CardDescription className="td-desc">
              Enter your email to receive a password reset link
            </CardDescription>
          </CardHeader>
          <CardContent className="td-card-body">
            <form onSubmit={handleSubmit} className="td-form">
              {error && (
                <Alert variant="destructive" className="td-callout td-callout-danger">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert className="td-callout td-callout-ok">
                  <AlertDescription>{success}</AlertDescription>
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
              <Button
                className="td-btn td-btn-primary w-full"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending link...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="td-card-foot">
            <Link href="/login" className="td-link">
              Back to Sign In
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
