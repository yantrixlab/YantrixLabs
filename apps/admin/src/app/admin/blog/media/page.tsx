'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LegacyBlogMediaRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/admin/media');
  }, [router]);
  return null;
}
