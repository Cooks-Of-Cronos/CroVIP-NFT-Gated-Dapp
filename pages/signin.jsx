import { InjectedConnector } from 'wagmi/connectors/injected';
import { signIn } from 'next-auth/react';
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi';
import { useRouter } from 'next/router';
import React, { Component } from 'react';
import styles from '../styles/Home.module.css'
import axios from 'axios';

function SignIn() {
    const { connectAsync } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const { push } = useRouter();

    const handleAuth = async () => {
        if (isConnected) {
            await disconnectAsync();
        }

        const { account, chain } = await connectAsync({ connector: new InjectedConnector() });

        const userData = { address: account, chain: chain.id, network: 'evm' };

        const { data } = await axios.post('/api/auth/request-message', userData, {
            headers: {
                'content-type': 'application/json',
            },
        });

        const message = data.message;

        const signature = await signMessageAsync({ message });

        // redirect user after success authentication to '/user' page
        const { url } = await signIn('credentials', { message, signature, redirect: false, callbackUrl: '/user' });
        /**
         * instead of using signIn(..., redirect: "/user")
         * we get the url from callback and push it to the router to avoid page refreshing
         */
        push(url);
    };

    

    return (
       
        
        <div
            style={{
                backgroundImage: `url(https://i.imgur.com/DVVNorR.png)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <h3>Web3 Authentication</h3>
            
                <h1 className="mb-4 font-weight-normal line-height-1_4">Sign Into Your Wallet! <span className="text-primary font-weight-medium">HODLRs!</span></h1>
                    <p className="text-muted mb-4 pb-2">More Wallet Options Coming Soon</p>
            <button onClick={() => handleAuth()}>Authenticate via Metamask</button>
        </div>
    );
}

export default SignIn;
