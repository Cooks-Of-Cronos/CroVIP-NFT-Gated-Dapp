import { getSession } from 'next-auth/react';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';

import Layout from "../components/Layout";
import Header from "../components/Header";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardTitle,
    CardText,
} from "reactstrap";
import { useRouter } from 'next/router';

const cardStyle = { width: "18rem" };










function Protected({ message, nftList, nativeBalance, nftBalance }) {
    const { push } = useRouter();
    console.log(nftBalance);

    

    return (

        <div>
            <button onClick={() => push('/user')}>Profile</button>
            <Layout pageTitle="Gated Content Page">
                <Header />
            </Layout>
            <h3>Protected content</h3>
            <div>{message}</div>
            <div>{nativeBalance}</div>


            {nftList.map((e) => {


            })}
            
            <pre>{JSON.stringify(nftList.metadata, null, 2)}</pre>

            <Container>
                <Row>
                <Col><Card style={cardStyle}>
                    <CardImg
                        alt="..."
                        src="https://i.imgur.com/69sF9qC.png"
                        top
                    ></CardImg>
                    <CardBody>
                        <CardTitle><b>Cro Crooks Merch Redeem</b></CardTitle>
                        <CardText>
                            Redeem your Merch as a Cro Crooks nFT Holder. Must pay cGOLD to start order processing. Shipments will be started in Q4 (October) (Initial Limit: 1 Redeem Per Wallet), All $cGOLD used for Redemption are burned to ensure for healthy Tokenomics.
                        </CardText>
                    
                            <Button color="primary" onclick="">
                            Redeem T-Shirt - 1,500 $cGOLD 
                        </Button>
                    </CardBody>
                </Card></Col>


                <Card style={cardStyle}>
                    <CardImg
                        alt="..."
                        src="https://i.imgur.com/GmEJyCo.png"
                        top
                    ></CardImg>
                    <CardBody>
                        <CardTitle><b>Increase Your Rewards! :)</b></CardTitle>
                        <CardText>
                            Purchase More Crooks to accrue More $cGOLD. Buy a CroBadge to be eligible for More Giveaways!
                        </CardText>
                            <Button color="primary" href="https://swap.crodex.app/#/swap">
                            Buy More $cGOLD! :)
                        </Button>
                            <Button color="primary" href="https://www.crosea.io/collection/0x230Bb7ce185CD0042973202f5F38B7072440e2C9">
                            Purchase a Crook on Secondary!
                        </Button>
                        
                    </CardBody>
                </Card>
             </Row>
                <Row><Card style={cardStyle}>
                    <CardImg
                        alt="..."
                        src="https://i.imgur.com/L2ypkch.png"
                        top
                    ></CardImg>
                    <CardBody>
                        <CardTitle><b>Support The Tokenomics! :)</b></CardTitle>
                        <CardText>
                            Purchase More Crooks to accrue More $cGOLD. Buy a CroBadge to be eligible for More Giveaways!
                        </CardText>
                        <Button color="primary" href="javascript:;">
                            Burn $cGOLD! :)
                        </Button>
                        

                    </CardBody>
                </Card></Row>
            </Container>
    
        </div>


    );
}





export async function getServerSideProps(context) {

    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        };
    }

    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

    const nftList = await Moralis.EvmApi.account.getNFTsForContract({
        address: session.user.address,
        tokenAddress: '0x230Bb7ce185CD0042973202f5F38B7072440e2C9',
        chain: 25, // defualt 1 (ETH)



    });

    let nftBalance = nftList.result;
    


    const nativeBalance = await Moralis.EvmApi.account.getNativeBalance({
        address: session.user.address,

        chain: 25
    });

    

    
    return {
        props: {
            message:
                nftList.raw.total > 0 ? 'Nice! You have our NFT' : "Sorry, you don't have our NFT",
            nftList: nftList.raw.result,
            nativeBalance: nativeBalance.result.balance.ether, 
            
            
            // Return the native balance formatted in ether via the .ether getter
            
        },
    };

}

export default Protected;
