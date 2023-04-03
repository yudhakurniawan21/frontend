import { useState, useEffect } from 'react';
import Navbar from "@/component/navbar"
import { useRouter } from 'next/router';

export default function SummaryAbsensi() {
    const [session, setSession] = useState(null);
    const [token, setToken] = useState(null);
    const [dataTable, setDataTable] = useState([]);

    useEffect(() => {
        const isSession = sessionStorage.getItem('user')

        console.log(JSON.parse(isSession));
        if (isSession) {
            setSession(JSON.parse(isSession));
            setToken(JSON.parse(isSession).token)
        }

    }, []);

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
            getDataSummary()
        }
    }, [session])



    const getDataSummary = async () => {

        try {
            const response = await fetch('/api/admin/summary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            const data = await response.json();


            setDataTable(data.data)

            console.log(data); // Do something with the response data
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Navbar session={session} />
            <div className='container my-5'>
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-6">
                        <h3 className="text-center">Summary Absensi</h3>
                        <table className="table my-5">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Tanggal</th>
                                    <th scope="col">Waktu</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataTable.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.users_id}</td>
                                            <td>{item.tanggal}</td>
                                            <td>{item.jam}</td>
                                            <td>{item.status}</td>
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