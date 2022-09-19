import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from "../components/Layout";
import Header from "../components/Header";
import Link from 'next/link';


function Secret() {
    return (
        <Layout pageTitle="Secret Page">
            <Header />
        </Layout>
    )
}

export default Secret