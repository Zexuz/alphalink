import {dev} from '$app/environment';
import Web3 from "web3";
import Mono from '../../../../artifacts/contracts/Mono.sol/Mono.json';

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;