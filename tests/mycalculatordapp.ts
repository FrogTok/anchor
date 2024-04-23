const assert = require('assert');
const anchor = require('@project-serum/anchor');
const { Connection, Keypair } = require('@solana/web3.js');
const {SystemProgram} = anchor.web3;

describe('mycalculatordapp', () => {
    let provider, calculator, program;

    before(async () => {
        const connection = new Connection('http://127.0.0.1:8899', 'confirmed');
        const walletKeyPair = Keypair.generate();
        const wallet = new anchor.Wallet(walletKeyPair);    
        provider = new anchor.AnchorProvider(connection, wallet, {
            preflightCommitment: 'confirmed'
        });
        anchor.setProvider(provider);
        calculator = anchor.web3.Keypair.generate();
        program = anchor.workspace.Mycalculatordapp;
    });

    it('Create a calculator', async() => {
        await program.rpc.create("Welcome to Solana", {
            accounts: {
                calculator: calculator.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId
            },
            signers: [calculator]
        });
        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.greeting === "Welcome to Solana");
    })
})