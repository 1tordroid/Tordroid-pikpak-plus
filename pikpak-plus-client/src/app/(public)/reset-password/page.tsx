"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BrandLogo } from "@/components/brand-logo";
import { Loader2 } from "lucide-react";
import { resetPassword } from "@/lib/auth-client";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

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
      await resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to reset password. Token may be invalid or expired.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <Card className="td-card">
        <div className="td-card-state">
          <h1 className="td-title td-status-danger">Invalid Link</h1>
          <p className="td-desc">
            The password reset link is invalid or missing the token.
          </p>
          <Button asChild variant="outline" className="td-btn">
            <Link href="/forgot-password">Request New Link</Link>
          </Button>
        </div>
      </Card>
    );
  }

  if (success) {
    return (
      <Card className="td-card">
        <div className="td-card-state" role="status">
          <h1 className="td-title td-status-ok">Password Reset Successful</h1>
          <p className="td-desc">
            Your password has been updated. Redirecting to login...
          </p>
          <Loader2
            className="td-spinner h-6 w-6 animate-spin mx-auto"
            aria-hidden="true"
          />
        </div>
      </Card>
    );
  }

  return (
    <Card className="td-card">
      <CardHeader className="td-card-head">
        <h1 className="td-title">Reset Password</h1>
        <CardDescription className="td-desc">
          Enter your new password below
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
            <label htmlFor="password" className="td-label">
              New Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="td-input"
              placeholder="New password"
            />
          </div>
          <div className="td-field">
            <label htmlFor="confirmPassword" className="td-label">
              Confirm New Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="td-input"
              placeholder="Confirm new password"
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
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="td-auth">
      <div className="td-auth-inner">
        <BrandLogo tone="plain" />
        <Suspense
          fallback={
            <Card className="td-card">
              <div className="flex justify-center items-center py-12">
                <Loader2
                  className="td-spinner h-6 w-6 animate-spin"
                  aria-hidden="true"
                />
              </div>
            </Card>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}
