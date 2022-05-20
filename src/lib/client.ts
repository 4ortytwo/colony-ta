import { getColonyNetworkClient, Network } from '@colony/colony-js';
import { Wallet } from 'ethers';
import { InfuraProvider } from 'ethers/providers';

const MAINNET_NETWORK_ADDRESS = `0x5346D0f80e2816FaD329F2c140c870ffc3c3E2Ef`;
const MAINNET_BETACOLONY_ADDRESS = `0x869814034d96544f3C62DE2aC22448ed79Ac8e70`;

export const provider = new InfuraProvider();

const wallet = Wallet.createRandom();
const connectedWallet = wallet.connect(provider);

const getColonyClient = async () => {
  const networkClient = await getColonyNetworkClient(Network.Mainnet, connectedWallet, {
    networkAddress: MAINNET_NETWORK_ADDRESS,
  });
  return await networkClient.getColonyClient(MAINNET_BETACOLONY_ADDRESS);
};

export { getColonyClient };
