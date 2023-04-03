import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Navbar({ ...props }) {

    const router = useRouter();

    const isAdmin = props?.session?.user.role === 2 ? true : false;


    const signout = () => {
        sessionStorage.clear();
        router.push('/auth/login');
    }

    return (
        <>
            {
                props.session ?
                    isAdmin ?
                        <nav className="navbar navbar-expand-lg bg-body-tertiary">
                            <div className="container-fluid">
                                <a className="navbar-brand" href="/dashboard">Admin App</a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNav">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a className={`${router.pathname === "/admin/summary" ? "active" : ""} nav-link`} aria-current="page" href="/admin/summary">Summary Absensi</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`${router.pathname === "/admin/users" ? "active" : ""} nav-link`} href="/admin/users">Users</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#" onClick={() => signout()}><small>{`(${props.session ? props.session.user.name : null})`}</small>Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav >
                        :
                        <nav className="navbar navbar-expand-lg bg-body-tertiary">
                            <div className="container-fluid">
                                <a className="navbar-brand" href="#">Absensi App</a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNav">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a className={`${router.pathname === "/dashboard" ? "active" : ""} nav-link`} aria-current="page" href="/dashboard">Profile</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`${router.pathname === "/absen" ? "active" : ""} nav-link`} href="/absen">Absen</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`${router.pathname === "/summary" ? "active" : ""} nav-link`} href="/summary">Summary Absen</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#" onClick={() => signout()}><small>{`(${props.session ? props.session.user.name : null})`}</small>Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav >
                    : null
            }
        </>
    )
}