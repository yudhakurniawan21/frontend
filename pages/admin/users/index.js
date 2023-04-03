import { useState, useEffect } from 'react';
import Navbar from "@/component/navbar"
import { useRouter } from 'next/router';

export default function UserManagement() {

    const router = useRouter();

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
        if (session) {
            getDataUsers()
        }
    }, [session])

    const getDataUsers = async () => {

        try {
            const response = await fetch('/api/admin/all_users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            const data = await response.json();


            setDataTable(data)

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
                        <h3 className="text-center">List User</h3>
                        <button type="button" className="btn btn-primary" onClick={() => router.push({ pathname: "/auth/register", query: { isEdit: true } })}>Tambah User</button>
                        <table className="table my-3">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nama</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Jabatan</th>
                                    <th scope="col">No. Handphone</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataTable.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.job}</td>
                                            <td>{item.phone}</td>
                                            <td><button type="button" className="btn btn-primary" onClick={() => router.push({ pathname: "/auth/register", query: { id: item.id } })}>Edit</button></td>
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