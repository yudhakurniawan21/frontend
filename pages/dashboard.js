import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import Navbar from '@/component/navbar';

export default function Dashboard() {
    const [dataUser, setDataUser] = useState(null);
    const [dataUserDetail, setDataUserDetail] = useState(null);
    const [sourceImage, setSourceImage] = useState("");
    const [session, setSession] = useState(null);
    const [token, setToken] = useState(null);


    const router = useRouter();

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

    useEffect(() => {
        if (session) {
            getDataUserById()
        }
    }, [session])

    useEffect(() => {
        if (dataUser) {
            setSourceImage(dataUser.user.photo_path);
        }
    }, [dataUser])

    const getDataUserById = async () => {

        try {
            const response = await fetch('/api/admin/user_id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: dataUser.user.id, token }),
            });

            const data = await response.json();

            setDataUserDetail(data[0]);

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
                    <div className="col-md-6 col-lg-4">
                        <div className="card">
                            {/* <img src={dataUser.user.photo} className="card-img-top" alt="..." /> */}
                            <Image
                                src={`http://localhost:4000/${sourceImage}`}
                                alt="Picture of the author"
                                width={200}
                                height={500}
                                className="card-img-top"
                            />
                            < div className="card-body" >
                                <h5 className="card-title">Profile Karyawan</h5>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Nama : {dataUserDetail?.name}</li>
                                <li className="list-group-item">Email : {dataUserDetail?.email}</li>
                                <li className="list-group-item">Jabatan : {dataUserDetail?.job}</li>
                                <li className="list-group-item">No. Handpone : {dataUserDetail?.phone}</li>
                            </ul>
                            <div className="card-body">
                                <a href="#" className="card-link" onClick={() => router.push({ pathname: '/profile/update', query: { id: dataUser.user.id, phone: dataUser.user.phone } })}>Edit</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}