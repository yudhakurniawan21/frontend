import { useState, useEffect } from 'react';
import Navbar from "@/component/navbar"
import { useRouter } from 'next/router';

export default function Absen() {
    const router = useRouter();
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [status, setStatus] = useState('');
    const [session, setSession] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const isSession = sessionStorage.getItem('user')

        if (isSession) {
            setSession(JSON.parse(isSession));
            setToken(JSON.parse(isSession).token)
        }

    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/absen',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ users_id: session.user.id, jam: time, tanggal: date, status, token }),
                });

            const data = await response.json();

            if (data === "Data kehadiran berhasil ditambahkan.") {
                router.reload()
            }

            console.log(data); // Do something with the response data
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Navbar session={session} />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-center mb-4">Absensi</h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="date" className="form-label">Tanggal</label>
                                        <input type="date" className="form-control" id="date" name="date" required value={date} onChange={(event) => setDate(event.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="time" className="form-label">Waktu</label>
                                        <input type="time" className="form-control" id="time" name="time" required value={time} onChange={(event) => setTime(event.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="time" className="form-label">Status</label>
                                        <select className="form-select" aria-label="Default select example" defaultValue={status} onChange={(event) => setStatus(event.target.value)}>
                                            <option value='' selected>Pilih status kehadiran</option>
                                            <option value="masuk">Masuk</option>
                                            <option value="pulang">Pulang</option>
                                        </select>
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-primary">Submit</button>
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