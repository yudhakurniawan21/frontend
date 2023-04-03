import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from "@/component/navbar"

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [job, setJob] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState(null);
    const [session, setSession] = useState(null);
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);

    const router = useRouter();

    useEffect(() => {
        console.log(router.query.id);
        if (router.query.id) {
            setId(router.query.id);
        }
    }, [router.query]);

    useEffect(() => {
        const isSession = sessionStorage.getItem('user')

        console.log(JSON.parse(isSession));
        if (isSession) {
            setSession(JSON.parse(isSession));
            setToken(JSON.parse(isSession).token)
        }

    }, []);

    useEffect(() => {
        if (session) {
            getDataUserById()
        }
    }, [session])

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        if (id) {
            formData.append('id', id);
        }
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('job', job);
        formData.append('phone', phone);
        formData.append('photo', photo);
        formData.append('token', token);

        try {
            if (id) {
                const response = await fetch('/api/admin/update_user',
                    {
                        method: 'POST',
                        body: formData
                    });

                const data = await response.json();

                if (data === "User updated successfully") {
                    router.push('/admin/users');
                }
            } else {
                const response = await fetch('/api/register',
                    {
                        method: 'POST',
                        body: formData
                    });

                const data = await response.json();

                if (data === "User registered successfully") {
                    router.push('/admin/users');
                }
            }


            // console.log(data); // Do something with the response data
        } catch (error) {
            console.error(error);
        }
    };

    const getDataUserById = async () => {

        try {
            const response = await fetch('/api/admin/user_id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, token }),
            });

            const data = await response.json();


            if (data) {
                setEmail(data[0].email)
                setJob(data[0].job);
                setName(data[0].name);
                setPhone(data[0].phone);
                setEmail(data[0].email);
            }


            console.log(data); // Do something with the response data
        } catch (error) {
            console.error(error);
        }
    }

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };



    return (
        <>
            <Navbar session={session} />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-center mb-4">{id ? "Edit User" : "Tambah User"}</h5>
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="email" name="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="name" className="form-control" id="name" name="name" required value={name} onChange={(event) => setName(event.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" name="password" required value={password} onChange={(event) => setPassword(event.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="job" className="form-label">Job</label>
                                        <input type="job" className="form-control" id="job" name="job" required value={job} onChange={(event) => setJob(event.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Mobile Phone </label>
                                        <input type="phone" className="form-control" id="phone" name="phone" required value={phone} onChange={(event) => setPhone(event.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="formFile" className="form-label">Upload Photo</label>
                                        <input className="form-control" type="file" id="formFile" onChange={handlePhotoChange} />
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-primary">{id ? "Update" : "Register"}</button>
                                        {/* <button className="btn btn-secondary" onClick={() => router.push('/auth/login')}>Login</button> */}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}