"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./login.module.scss";
import { AuthLayoutComp } from "components";
import { useAsyncClick } from "scripts";
import { PATH } from "data";
import { authApi } from "../api/auth";
import {
  Button,
  TextField,
  Box,
  Snackbar,
  Alert,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { Mail, Lock } from "lucide-react";

const LoginComp: React.FC = () => {
  const router = useRouter();
  const [snack, setSnack] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);

  const handleClose = () => setSnack((s) => ({ ...s, open: false }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = (form.get("username") as string | null)?.trim() ?? "";
    const password = (form.get("password") as string | null) ?? "";

    if (!email || !password) {
      setSnack({
        open: true,
        message: "Please provide both email and password.",
        severity: "error",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSnack({
        open: true,
        message: "The input is not valid E-mail!",
        severity: "error",
      });
      return;
    }

    setLoading(true);
    setSnack({
      open: true,
      message: "Signed in successfully (dummy). Redirecting...",
      severity: "success",
    });
    // simulate async work / redirect
    setTimeout(() => {
      setLoading(false);
      router.push("/panel");
    }, 700);
  };

  return (
    <>
      {/* Top-left logo (fixed so it sits on page top-left) */}
      <img
        src="/main-logo.svg"
        alt="Main logo"
        style={{
          position: "fixed",
          top: 16,
          left: 16,
          width: 120,
          height: "auto",
          zIndex: 1500,
        }}
      />

      <AuthLayoutComp
        title="Log in to your account"
        subtitle="Welcome back! Please login to your account."
        imageOnRight={true}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "12px",
            color: "#666",
          }}
        ></div>

        {/* use a native form with MUI inputs */}
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            name="username"
            label="Email"
            required
            type="email"
            placeholder="Enter your email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail size={16} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="password"
            label="Password"
            required
            type="password"
            placeholder="Enter your password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock size={16} />
                </InputAdornment>
              ),
            }}
          />

          {/* replaced forgotPassword div with a row: remember checkbox + right-aligned forgot link */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <FormControlLabel
              control={<Checkbox name="remember" />}
              label="Remember me"
              sx={{
                ".MuiFormControlLabel-label": { color: "#999", fontSize: 14 },
              }}
            />
            <Link
              href="/forgot-password"
              style={{ color: "#999", fontSize: 14 }}
            >
              Forgot password?
            </Link>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                flex: 1,
                backgroundColor: "#63EB9A",
                color: "#fff",
                boxShadow: "none",
                textTransform: "none",
                "&:hover": { backgroundColor: "#53d288", boxShadow: "none" },
              }}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Login"}
            </Button>

            <Button
              type="button"
              variant="outlined"
              onClick={() => router.push("/signup")}
              disabled={loading}
              sx={{
                flex: 1,
                backgroundColor: "#fff",
                color: "#63EB9A",
                borderColor: "#63EB9A",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#f7fff9",
                  borderColor: "#53d288",
                },
              }}
            >
              Sign up
            </Button>
          </Box>

          {/* divider + social login */}
          <Box
            sx={{ mt: 1, mb: 1, display: "flex", alignItems: "center", gap: 2 }}
          >
            <Divider sx={{ flex: 1 }} />
            <Box
              component="span"
              sx={{ color: "#999", fontSize: 13, whiteSpace: "nowrap" }}
            >
              Or login with
            </Box>
            <Divider sx={{ flex: 1 }} />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => console.log("login with facebook")}
              sx={{
                backgroundColor: "#1877F2",
                color: "#fff",
                textTransform: "none",
                "&:hover": { backgroundColor: "#1466d8" },
              }}
            >
              Facebook
            </Button>

            <Button
              fullWidth
              variant="contained"
              onClick={() => console.log("login with linkedin")}
              sx={{
                backgroundColor: "#0A66C2",
                color: "#fff",
                textTransform: "none",
                "&:hover": { backgroundColor: "#0957a8" },
              }}
            >
              LinkedIn
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => console.log("login with google")}
              sx={{
                color: "#000",
                borderColor: "#ddd",
                backgroundColor: "#fff",
                textTransform: "none",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              Google
            </Button>
          </Box>
        </Box>

        <Snackbar
          open={snack.open}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={snack.severity}
            sx={{ width: "100%" }}
          >
            {snack.message}
          </Alert>
        </Snackbar>
      </AuthLayoutComp>
    </>
  );
};

export default LoginComp;
