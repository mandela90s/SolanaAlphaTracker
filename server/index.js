require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { Connection, PublicKey } = require('@solana/web3.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Solana connection
const solanaConnection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com');

// Twitter API setup would go here (requires Twitter developer account)
// For now, we'll mock the responses

// API Routes
app.get('/api/whale-transactions', async (req, res) => {
    try {
        // In a real implementation, you would query Solana for recent transactions
        // from the tracked whale wallets and format the response
        
        // Mock response for now
        const mockTransactions = generateMockWhaleTransactions();
        res.json(mockTransactions);
    } catch (error) {
        console.error('Error fetching whale transactions:', error);
        res.status(500).json({ error: 'Failed to fetch whale transactions' });
    }
});

app.get('/api/tweets', async (req, res) => {
    try {
        // In a real implementation, you would fetch tweets from Twitter API
        // for the tracked accounts
        
        // Mock response for now
        const mockTweets = generateMockTweets();
        res.json(mockTweets);
    } catch (error) {
        console.error('Error fetching tweets:', error);
        res.status(500).json({ error: 'Failed to fetch tweets' });
    }
});

app.get('/api/kol-trending', async (req, res) => {
    try {
        // In a real implementation, you would fetch from your data source
        // that tracks KOL calls
        
        // Mock response for now
        const mockTrending = generateMockKOLTrending();
        res.json(mockTrending);
    } catch (error) {
        console.error('Error fetching KOL trending:', error);
        res.status(500).json({ error: 'Failed to fetch KOL trending' });
    }
});

app.get('/api/check-bundle/:address', async (req, res) => {
    try {
        const { address } = req.params;
        // In a real implementation, you would analyze the token for bundling
        
        // Mock response for now
        const mockResult = generateMockBundleResult(address);
        res.json(mockResult);
    } catch (error) {
        console.error('Error checking bundle:', error);
        res.status(500).json({ error: 'Failed to check bundle' });
    }
});

app.get('/api/check-rug/:address', async (req, res) => {
    try {
        const { address } = req.params;
        // In a real implementation, you would analyze the token for rug potential
        
        // Mock response for now
        const mockResult = generateMockRugCheckResult(address);
        res.json(mockResult);
    } catch (error) {
        console.error('Error checking rug:', error);
        res.status(500).json({ error: 'Failed to check rug' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Helper functions (similar to frontend mock generators)
function generateMockWhaleTransactions() {
    // Same as frontend version
}

function generateMockTweets() {
    // Same as frontend version
}

function generateMockKOLTrending() {
    // Same as frontend version
}

function generateMockBundleResult(address) {
    // Same as frontend version
}

function generateMockRugCheckResult(address) {
    // Same as frontend version
}
