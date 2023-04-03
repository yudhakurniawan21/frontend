import { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();

  const [session, setSession] = useState(null);

  useEffect(() => {
    const isSession = sessionStorage.getItem('user')

    if (isSession) {
      setSession(JSON.parse(session));
    }
    if (!isSession) {
      router.push('/auth/login');
    } else {
      router.push('/dashboard')
    }
  }, []);

  return

}
