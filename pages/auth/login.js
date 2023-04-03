import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        const session = sessionStorage.getItem('user')

        if (session) {
            router.push('/dashboard');
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.user) {
                router.push('/dashboard');
                sessionStorage.setItem("user", JSON.stringify(data))
            }

            console.log(data); // Do something with the response data
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title text-center mb-4">Login</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email" name="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" required value={password} onChange={(event) => setPassword(event.target.value)} />
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                    {/* <button className="btn btn-secondary" onClick={() => router.push('/auth/register')}>Register</button> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}