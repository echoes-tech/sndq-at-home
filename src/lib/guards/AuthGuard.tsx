"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ACCESS_TOKEN_KEY, routePaths } from "@/lib/constants/system";
import { useProfile } from "@/lib/api/auth/useAuth";
import { useAuthStore } from "@/lib/stores/authStore";
import { Loading } from "@/components/ui/loading";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    isAuthenticated,
    isLoading,
    setIsAuthenticated,
    setIsLoading,
    setUser,
    logout,
  } = useAuthStore();

  const hasAccessToken = () => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem(ACCESS_TOKEN_KEY);
  };

  const token = hasAccessToken();

  const {
    data: profile,
    isError,
    isInitialLoading,
  } = useProfile({
    enabled: token,
  });

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    logout();
    router.push(routePaths.home);
  };

  useEffect(() => {
    useAuthStore.setState({ logout: handleLogout });
  }, []);

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      setUser(null);
      return;
    }

    if (profile) {
      setIsAuthenticated(true);
      setUser(profile);
      setIsLoading(false);
    } else if (isError) {
      handleLogout();
    }

    // While the profile is being fetched for the first time
    if (isInitialLoading) {
      setIsLoading(true);
    }
  }, [
    token,
    profile,
    isError,
    isInitialLoading,
    setIsAuthenticated,
    setIsLoading,
    setUser,
  ]);

  // Handle redirects based on auth state
  useEffect(() => {
    const isAuthRoute = [
      routePaths.home,
      routePaths.login,
      routePaths.firstTime,
      routePaths.onboarding,
      routePaths.welcome,
    ].some((route) => route === pathname);

    const isProtectedRoute = [routePaths.overview, "/(dashboard)"].some(
      (route) => pathname.startsWith(route)
    );

    if (isLoading) return; // Don't redirect while loading

    if (isAuthenticated && isAuthRoute) {
      router.push(routePaths.overview);
    }

    if (!isAuthenticated && isProtectedRoute) {
      router.push(routePaths.home);
    }
  }, [isLoading, isAuthenticated, pathname, router]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}
