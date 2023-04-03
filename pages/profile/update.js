import Navbar from '@/component/navbar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function UpdateProfile() {
    const [dataUser, setDataUser] = useState(null);
    const [session, setSession] = useState(null);
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');
    const [phone, setPhone] = useState('');
    const [photo, setPhoto] = useState(null);

    const router = useRouter();

    useEffect(() => {
        console.log(router.query.id);
        if (router.query.id) {
            setId(router.query.id);
            setPhone(router.query.phone)
        }
    }, [router.query]);

    useEffect(() => {
        const session = sessionStorage.getItem('user')

        if (session) {
            setDataUser(JSON.parse(session));
            setSession(JSON.parse(session));
            setToken(JSON.parse(session).token)
        }
        if (!session) {
            router.push('/auth/login');
        }
    }, []);

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('id', id);
        formData.append('password', password);
        formData.append('phone', phone);
        formData.append('photo', photo);
        formData.append('token', token);

        try {
            const response = await fetch('/api/profile/update',
                {
                    method: 'POST',
                    body: formData
                });

            const data = await response.json();

            if (data === "User updated successfully") {
                router.push('/dashboard');
            }

            // console.log(data); // Do something with the response data
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <>
            <Navbar session={session} />
            <div className='container my-5'>
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-center mb-4">Update Profile</h5>
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Mobile Phone </label>
                                        <input type="phone" className="form-control" id="phone" name="phone" required value={phone} onChange={(event) => setPhone(event.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" name="password" required value={password} onChange={(event) => setPassword(event.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="formFile" className="form-label">Upload Photo</label>
                                        <input className="form-control" type="file" id="formFile" onChange={handlePhotoChange} />
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-primary">Update</button>
                                        {/* <button className="btn btn-secondary" onClick={() => router.push({ pathname: '/auth/login', query: { data } })}>Login</button> */}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}