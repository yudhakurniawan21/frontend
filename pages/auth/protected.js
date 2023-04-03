import { useRouter } from 'next/router';

export default function Protected({ children }) {
    let session;
    // let router;
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        session = sessionStorage.getItem('user');
        // router = useRouter();
    }

    if (!session) {
        return {
          redirect: {
            destination: '/auth/login',
            permanent: false,
          },
        }
      }

    return;
}