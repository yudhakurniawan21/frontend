import { useState, useEffect } from 'react';
import Navbar from "@/component/navbar"
import moment from 'moment';

export default function Summary() {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [dataTable, setDataTable] = useState([]);
    const [session, setSession] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const isSession = sessionStorage.getItem('user')

        if (isSession) {
            setSession(JSON.parse(isSession));
            setToken(JSON.parse(isSession).token)
        }

    }, []);

    useEffect(() => {
        if (session) {
            getDataSummary()
        }
    }, [session])



    const getDataSummary = async () => {

        try {
            const response = await fetch('/api/summary/monthly', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ users_id: session.user.id, from, to, token }),
            });

            const data = await response.json();


            setDataTable(data)
            data.map((item) => {
                if (item.status === "masuk") {
                    dataMasuk.push(item)
                }
            })

            console.log(data); // Do something with the response data
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/summary/filter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ users_id: session.user.id, from, to, token }),
            });

            const data = await response.json();


            setDataTable(data)
            data.map((item) => {
                if (item.status === "masuk") {
                    dataMasuk.push(item)
                }
            })

            console.log(data); // Do something with the response data
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Navbar session={session}/>
            <div className='container my-5'>
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">Dari Tanggal</label>
                                <input type="date" className="form-control" id="date" name="date" required value={from} onChange={(event) => setFrom(event.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">Sampai Tanggal</label>
                                <input type="date" className="form-control" id="date" name="date" required value={to} onChange={(event) => setTo(event.target.value)} />
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary">Cari</button>
                            </div>
                        </form>
                        <table className="table my-5">
                            <thead>
                                <tr>
                                    <th scope="col">Masuk</th>
                                    <th scope="col">Pulang</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataTable.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.status === "masuk" ? moment(item.tanggal).format("YYYY-MM-DD") + " " + item.jam : null}</td>
                                            <td>{item.status === "pulang" ? moment(item.tanggal).format("YYYY-MM-DD") + " " + item.jam : null}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}