// Configuration
const config = {
    solanaRpcUrl: "https://api.mainnet-beta.solana.com",
    twitterAccounts: [
        "RobinhoodApp", "Jpmorgan", "blknoiz06", "coinbase", "Breaking911", 
        "Banks", "BitcoinMagazine", "RobertKennedyJr", "Cobratate", "VitalikButerin",
        "IGGYAZALEA", "DeeZe", "MelaniaTrump", "Russia", "Tether_to", "Deltacne",
        "coingecko", "CIA", "aeyakovenko", "CoinMarketCap", "Cointelegraph",
        "Polkadot", "chainlink", "milesdeutscher", "Krakenfx", "CoinDesk",
        "NVIDIAAIDev", "binance", "cryptocom", "WhiteHouse45", "CoinbaseWallet",
        "adinross", "mikadontlouz", "OpenAI", "XGaming", "MetaMask", "farokh",
        "MorningBrew", "zachxbt", "RealRossU", "Bybit_Official", "DecryptMedia",
        "Blockworks_", "solana", "elliotrades", "coffeebreak_YT", "kucoincom",
        "coinbureau", "cz_binance", "justinsuntron", "neuralink", "trondao",
        "probablynothing", "pumpdotfun", "RoundtableSpace", "SolJakey", "aTlon9",
        "frankdegods", "SolanaFloor", "EasyEatsBodega", "RipJalens", "bubblemaps",
        "MeteoraAG", "phantom", "greg16676935420", "MarioNawfal", "MINHKDYNASTY",
        "AutismCapital", "SpiderCrypto0x", "Polymarket", "ZssBecker", "WhaleInsider",
        "VivekGRamaswamy", "TrumpWarRoom", "BNBCHAIN", "Ishowspeedsul", "LeadingReport"
    ],
    whaleWallets: [
        // Your whale wallet objects here (from the JSON you provided)
        { "name": "Danny", "address": "9FNz4MjPUmnJqTf6yEDbL1D4SsHVh7uA8zRHhR5K138r", "emoji": "🦹‍♂️" },
        // Include all other wallets from your JSON
    ]
};

// DOM Elements
const whaleTransactionsEl = document.getElementById('whale-transactions');
const tweetContainerEl = document.getElementById('tweet-container');
const kolTrendingEl = document.getElementById('kol-trending');
const bundleResultEl = document.getElementById('bundle-result');
const rugResultEl = document.getElementById('rug-result');
const refreshBtn = document.getElementById('refresh-btn');
const pauseTweetsBtn = document.getElementById('pause-tweets');
const addAccountBtn = document.getElementById('add-account-btn');
const addAccountInput = document.getElementById('add-account');
const bundleAddressInput = document.getElementById('bundle-address');
const checkBundleBtn = document.getElementById('check-bundle');
const rugAddressInput = document.getElementById('rug-address');
const checkRugBtn = document.getElementById('check-rug');

// State
let isTweetFeedPaused = false;
let trackedAccounts = [...config.twitterAccounts];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadWhaleTransactions();
    loadTweets();
    loadKOLTrending();
    
    // Set up event listeners
    refreshBtn.addEventListener('click', refreshAll);
    pauseTweetsBtn.addEventListener('click', toggleTweetFeed);
    addAccountBtn.addEventListener('click', addTwitterAccount);
    checkBundleBtn.addEventListener('click', checkBundle);
    checkRugBtn.addEventListener('click', checkRug);
    
    // Set up periodic refreshes
    setInterval(loadWhaleTransactions, 30000); // Refresh every 30 seconds
    setInterval(() => {
        if (!isTweetFeedPaused) loadTweets();
    }, 60000); // Refresh tweets every minute
    setInterval(loadKOLTrending, 300000); // Refresh KOL trending every 5 minutes
});

// Functions
async function loadWhaleTransactions() {
    try {
        // In a real implementation, you would fetch from your backend API
        // For now, we'll simulate with mock data
        const mockTransactions = generateMockWhaleTransactions();
        
        whaleTransactionsEl.innerHTML = '';
        mockTransactions.forEach(tx => {
            const txEl = document.createElement('div');
            txEl.className = 'whale-transaction';
            txEl.innerHTML = `
                <div class="whale-emoji">${tx.emoji}</div>
                <div class="whale-details">
                    <div class="whale-name">${tx.name}</div>
                    <div class="whale-amount">${tx.action} ${tx.amount} of ${tx.token}</div>
                </div>
                <div class="token-info">
                    <img src="${tx.image}" alt="${tx.token}" class="token-image" onerror="this.src='https://via.placeholder.com/40'">
                    <div class="token-link" onclick="copyToClipboard('${tx.contract}')">${shortenAddress(tx.contract)}</div>
                </div>
            `;
            whaleTransactionsEl.appendChild(txEl);
        });
    } catch (error) {
        console.error('Error loading whale transactions:', error);
    }
}

async function loadTweets() {
    try {
        // In a real implementation, you would fetch from your backend API
        // For now, we'll simulate with mock data
        const mockTweets = generateMockTweets();
        
        // Only update if not paused
        if (!isTweetFeedPaused) {
            tweetContainerEl.innerHTML = '';
            mockTweets.forEach(tweet => {
                const tweetEl = document.createElement('div');
                tweetEl.className = 'tweet';
                
                let imageHtml = '';
                if (tweet.image) {
                    imageHtml = `<img src="${tweet.image}" alt="Tweet image" class="tweet-image">`;
                }
                
                tweetEl.innerHTML = `
                    <div class="tweet-header">
                        <img src="${tweet.avatar}" alt="${tweet.user}" class="tweet-avatar" onerror="this.src='https://via.placeholder.com/40'">
                        <div class="tweet-user">${tweet.user}</div>
                        <div class="tweet-handle">@${tweet.handle}</div>
                        <div class="tweet-time">${formatTime(tweet.time)}</div>
                    </div>
                    <div class="tweet-content">${tweet.content}</div>
                    ${imageHtml}
                `;
                tweetContainerEl.appendChild(tweetEl);
            });
        }
    } catch (error) {
        console.error('Error loading tweets:', error);
    }
}

async function loadKOLTrending() {
    try {
        // In a real implementation, you would fetch from your backend API
        // For now, we'll simulate with mock data
        const mockTrending = generateMockKOLTrending();
        
        kolTrendingEl.innerHTML = '';
        mockTrending.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'trending-item';
            itemEl.innerHTML = `
                <div class="trending-rank">#${index + 1}</div>
                <div class="trending-name">${item.name}</div>
                <div class="trending-mc">MC: $${formatNumber(item.mc)}</div>
                <div class="trending-calls">Calls: ${item.calls}</div>
            `;
            kolTrendingEl.appendChild(itemEl);
        });
    } catch (error) {
        console.error('Error loading KOL trending:', error);
    }
}

async function checkBundle() {
    const address = bundleAddressInput.value.trim();
    if (!address) return;
    
    try {
        // Simulate API call
        bundleResultEl.innerHTML = '<div class="loading">Checking bundle status...</div>';
        
        // Simulate delay for API call
        setTimeout(() => {
            const mockResult = generateMockBundleResult(address);
            bundleResultEl.innerHTML = `
                <div class="result-header">Bundle Analysis for ${shortenAddress(address)}</div>
                <div class="result-item"><strong>Total Bundles:</strong> ${mockResult.totalBundles}</div>
                <div class="result-item"><strong>Total SOL Spent:</strong> ${mockResult.solSpent} SOL</div>
                <div class="result-item"><strong>Current Held Percentage:</strong> ${mockResult.heldPercentage}%</div>
                <div class="result-item"><strong>Bonded:</strong> ${mockResult.bonded ? 'Yes' : 'No'}</div>
                ${mockResult.topBundles ? `
                <div class="result-subheader">Top Bundles:</div>
                ${mockResult.topBundles.map(bundle => `
                    <div class="result-item">
                        <strong>Slot ${bundle.slot}:</strong> ${bundle.tokensBought} tokens (${bundle.percentage}% of supply)
                    </div>
                `).join('')}
                ` : ''}
            `;
        }, 1000);
    } catch (error) {
        bundleResultEl.innerHTML = '<div class="error">Error checking bundle status</div>';
        console.error('Error checking bundle:', error);
    }
}

async function checkRug() {
    const address = rugAddressInput.value.trim();
    if (!address) return;
    
    try {
        // Simulate API call
        rugResultEl.innerHTML = '<div class="loading">Checking rug status...</div>';
        
        // Simulate delay for API call
        setTimeout(() => {
            const mockResult = generateMockRugCheckResult(address);
            
            let riskHtml = '';
            if (mockResult.risk === 'High') {
                riskHtml = '<div class="risk-high"><i class="fas fa-exclamation-triangle"></i> High Risk</div>';
            } else if (mockResult.risk === 'Medium') {
                riskHtml = '<div class="risk-medium"><i class="fas fa-exclamation-circle"></i> Medium Risk</div>';
            } else {
                riskHtml = '<div class="risk-low"><i class="fas fa-check-circle"></i> Low Risk</div>';
            }
            
            rugResultEl.innerHTML = `
                <div class="result-header">Rug Check for ${shortenAddress(address)}</div>
                ${riskHtml}
                <div class="result-item"><strong>Token:</strong> ${mockResult.tokenName}</div>
                <div class="result-item"><strong>Supply:</strong> ${mockResult.supply}</div>
                <div class="result-item"><strong>Market Cap:</strong> $${formatNumber(mockResult.marketCap)}</div>
                <div class="result-item"><strong>Holders:</strong> ${mockResult.holders}</div>
                <div class="result-item"><strong>LP Locked:</strong> ${mockResult.lpLocked}%</div>
                <div class="result-item"><strong>Creator Holdings:</strong> ${mockResult.creatorHoldings}%</div>
                ${mockResult.issues.length > 0 ? `
                <div class="result-subheader">Potential Issues:</div>
                <ul class="issue-list">
                    ${mockResult.issues.map(issue => `<li>${issue}</li>`).join('')}
                </ul>
                ` : '<div class="no-issues">No major issues detected</div>'}
            `;
        }, 1000);
    } catch (error) {
        rugResultEl.innerHTML = '<div class="error">Error checking rug status</div>';
        console.error('Error checking rug:', error);
    }
}

function refreshAll() {
    loadWhaleTransactions();
    loadTweets();
    loadKOLTrending();
}

function toggleTweetFeed() {
    isTweetFeedPaused = !isTweetFeedPaused;
    pauseTweetsBtn.innerHTML = isTweetFeedPaused 
        ? '<i class="fas fa-play"></i> Resume Feed' 
        : '<i class="fas fa-pause"></i> Pause Feed';
}

function addTwitterAccount() {
    const handle = addAccountInput.value.trim();
    if (handle && !trackedAccounts.includes(handle)) {
        trackedAccounts.push(handle);
        addAccountInput.value = '';
        loadTweets();
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard: ' + text);
    });
}

// Helper functions
function shortenAddress(address) {
    return address ? `${address.substring(0, 4)}...${address.substring(address.length - 4)}` : '';
}

function formatTime(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = (now - time) / 1000; // difference in seconds
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(2) + 'K';
    }
    return num.toString();
}

// Mock data generators (replace with real API calls in production)
function generateMockWhaleTransactions() {
    const tokens = [
        { name: 'DISNEY++', contract: '13b4sd0n7a4MchHVMAZbpLsz14NgJhKcSdTNStUpung', image: 'https://logo.clearbit.com/disney.com' },
        { name: 'POPCAT', contract: '7Bffdhza5V7zBK7EyEQ5eFQ4fkxvutjMsiJjJUs9ZfkC', image: 'https://logo.clearbit.com/popcat.com' },
        { name: 'DIMA', contract: '89.2KDIMA89.2KDIMA89.2KDIMA89.2KDIMA89.2K', image: 'https://logo.clearbit.com/dima.com' },
        { name: 'SFBM', contract: '300.1KSFBM300.1KSFBM300.1KSFBM300.1KSFBM', image: 'https://logo.clearbit.com/sfbm.com' },
        { name: 'KAPIBALA', contract: '7.7MKAPIBALA7.7MKAPIBALA7.7MKAPIBALA', image: 'https://logo.clearbit.com/kapibala.com' }
    ];
    
    const actions = ['Bought', 'Sold'];
    const amounts = ['$600', '$2K', '$800', '$8K', '$1.5K', '$3.2K', '$5K'];
    
    return config.whaleWallets.slice(0, 10).map(wallet => {
        const token = tokens[Math.floor(Math.random() * tokens.length)];
        return {
            name: wallet.name,
            emoji: wallet.emoji,
            action: actions[Math.floor(Math.random() * actions.length)],
            amount: amounts[Math.floor(Math.random() * amounts.length)],
            token: token.name,
            contract: token.contract,
            image: token.image
        };
    });
}

function generateMockTweets() {
    const tweets = [
        {
            user: 'Leading Report',
            handle: 'LeadingReport',
            content: 'BREAKING: President Trump says he will make a deal with China.',
            time: new Date(Date.now() - 60000), // 1 minute ago
            avatar: 'https://logo.clearbit.com/twitter.com',
            image: null
        },
        {
            user: 'meechie',
            handle: '973Meech',
            content: 'big if true',
            time: new Date(Date.now() - 30000), // 30 seconds ago
            avatar: 'https://logo.clearbit.com/twitter.com',
            image: null
        },
        {
            user: 'Ansem',
            handle: 'blknoiz06',
            content: 'Just discovered a new gem on Solana! Check out $DIMA - massive potential!',
            time: new Date(Date.now() - 120000), // 2 minutes ago
            avatar: 'https://logo.clearbit.com/twitter.com',
            image: null
        },
        {
            user: 'CoinGecko',
            handle: 'coingecko',
            content: 'New token alert: Disney++ is trending on Solana with 3000% gains in the last 24 hours!',
            time: new Date(Date.now() - 180000), // 3 minutes ago
            avatar: 'https://logo.clearbit.com/coingecko.com',
            image: 'https://pbs.twimg.com/media/FXJgWj1X0AE9nJv?format=jpg'
        }
    ];
    
    return tweets;
}

function generateMockKOLTrending() {
    return [
        { name: '$Base', mc: 10700000, calls: 1960 },
        { name: '$broke boil', mc: 69400, calls: 1268 },
        { name: '$DIMA', mc: 89200, calls: 1265 },
        { name: '$SFBM', mc: 300100, calls: 1245 },
        { name: '$ASSET', mc: 541700, calls: 953 },
        { name: '$Kekels', mc: 204200, calls: 850 },
        { name: '$Disney++', mc: 575500, calls: 837 },
        { name: '$KAPIBALA', mc: 7700000, calls: 595 },
        { name: '$GCATS', mc: 253700, calls: 591 },
        { name: '$SPERM', mc: 590000, calls: 380 }
    ];
}

function generateMockBundleResult(address) {
    return {
        totalBundles: Math.floor(Math.random() * 10) + 1,
        solSpent: (Math.random() * 100).toFixed(2),
        heldPercentage: (Math.random() * 1).toFixed(4),
        bonded: Math.random() > 0.5,
        topBundles: [
            {
                slot: Math.floor(Math.random() * 1000000),
                tokensBought: (Math.random() * 10000000).toFixed(0),
                percentage: (Math.random() * 1).toFixed(2)
            }
        ]
    };
}

function generateMockRugCheckResult(address) {
    const risks = ['High', 'Medium', 'Low'];
    const issues = [
        'Creator holds more than 10% of supply',
        'Low liquidity pool lock',
        'Multiple wallets with similar holdings',
        'Recent large dumps detected'
    ];
    
    const selectedIssues = [];
    for (let i = 0; i < Math.floor(Math.random() * issues.length); i++) {
        selectedIssues.push(issues[i]);
    }
    
    return {
        tokenName: ['DISNEY++', 'POPCAT', 'DIMA', 'SFBM', 'KAPIBALA'][Math.floor(Math.random() * 5)],
        supply: (Math.random() * 1000000000).toFixed(0),
        marketCap: (Math.random() * 10000000).toFixed(0),
        holders: Math.floor(Math.random() * 10000),
        lpLocked: (Math.random() * 100).toFixed(2),
        creatorHoldings: (Math.random() * 50).toFixed(2),
        risk: risks[Math.floor(Math.random() * risks.length)],
        issues: selectedIssues
    };
}
