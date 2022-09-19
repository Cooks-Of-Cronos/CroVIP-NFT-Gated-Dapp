import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from "../components/Layout";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Feature from '../components/Feature';
import Service from '../components/Service';
import About from '../components/About';
import Link from 'next/link';


const Index = () => {
    return (
        <Layout pageTitle="Token Gated VIP Landing Page">
            <Header />
            <Hero />
          
        </Layout>
    )
}
export default Index;