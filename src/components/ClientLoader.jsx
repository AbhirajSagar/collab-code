'use client';

import { useEffect, useState, ReactNode } from "react";
import Loading from "@/components/Loading";

export default function ClientLoader({ children })
{
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>
  {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading />;

  return <>{children}</>;
}
