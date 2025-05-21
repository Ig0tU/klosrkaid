const KLOS_TOKEN_ADDRESS = '0xC24D230a3CD9fac02269C670ca549B94c381112A'; // Replace with actual KLOS token address

class WalletManager {
    constructor() {
        this.provider = null;
        this.signer = null;
        this.tokenContract = null;
        // Don't auto-initialize, wait for explicit init call
        
        // Bind methods that will be called from HTML
        this.connectWallet = this.connectWallet.bind(this);
    }

    async _waitForDOM() {
        if (document.readyState === 'loading') {
            console.log('Waiting for DOM to be ready...');
            await new Promise(resolve => {
                document.addEventListener('DOMContentLoaded', resolve);
            });
        }
        return true;
    }

    async _initializeProvider() {
        console.log('Starting provider initialization...');
        try {
            // Wait for window.ethereum to be injected
            console.log('Waiting for window.ethereum...');
            let attempts = 0;
            const maxAttempts = 50; // 5 seconds total (50 * 100ms)
            
            while (!window.ethereum && attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 100));
                attempts++;
                if (attempts % 10 === 0) {
                    console.log(`Still waiting for window.ethereum... (${attempts/10}s)`);
                }
            }

            console.log('Checking for window.ethereum...', { exists: !!window.ethereum });
            if (!window.ethereum) {
                const message = 'MetaMask not detected. Please install MetaMask to connect your wallet.';
                console.error(message);
                this.showError(message);
                return false;
            }

            console.log('Initializing Web3Provider...');
            try {
                this.provider = new window.ethers.providers.Web3Provider(window.ethereum);
                console.log('Web3Provider successfully initialized');
                
                // Test provider by requesting chain ID
                const network = await this.provider.getNetwork();
                console.log('Connected to network:', network);
                
                return true;
            } catch (error) {
                console.error('Error initializing Web3Provider:', error);
                this.showError('Failed to initialize wallet connection. Please try again.');
                return false;
            }
        } catch (error) {
            console.error('Provider initialization failed:', error);
            this.showError('Failed to initialize wallet connection. Please try again.');
            return false;
        }
    }

    async init() {
        console.log('init method called');
        try {
            console.log('Initializing wallet manager...');
            
            try {
                // Wait for DOM to be ready
                await this._waitForDOM();
                console.log('DOM ready for event listeners');
            } catch (error) {
                console.error('Error waiting for DOM:', error);
                throw error;
            }
            
            try {
                // Initialize provider first
                await this._initializeProvider();
                console.log('Provider initialized');
            } catch (error) {
                console.error('Error initializing provider:', error);
                throw error;
            }
            
            try {
                // Setup event listeners after provider is ready
                await this.setupEventListeners();
                console.log('Event listeners setup complete');
            } catch (error) {
                console.error('Error setting up event listeners:', error);
                throw error;
            }
            
            try {
                // Enable connect wallet buttons and add listeners
                console.log('Setting up wallet buttons...');
                this.enableConnectButtons();
                console.log('Buttons enabled');
                
                const buttons = document.querySelectorAll('#connectWalletBtn, #heroConnectBtn');
                console.log(`Found ${buttons.length} buttons to setup`);
                
                buttons.forEach(button => {
                    console.log(`Adding click listener to ${button.id}`);
                    button.addEventListener('click', async (e) => {
                        console.log(`${button.id} clicked!`);
                        e.preventDefault();
                        try {
                            await this.connectWallet();
                        } catch (error) {
                            console.error('Connect wallet error:', error);
                            this.showError(error.message);
                        }
                    });
                    console.log(`Click listener added to ${button.id}`);
                });
            } catch (error) {
                console.error('Error setting up wallet buttons:', error);
                throw error;
            }
            
            try {
                // Initial UI update
                await this.updateUI();
                console.log('Initial UI update complete');
            } catch (error) {
                console.error('Error updating UI:', error);
                throw error;
            }
            
            console.log('Wallet manager initialized successfully');
            return true;
        } catch (error) {
            console.error('Wallet initialization error:', error);
            this.showError(error.message);
            throw error; // Re-throw to handle in the calling code
        }
    }

    addConnectButtonListeners() {
        const buttons = document.querySelectorAll('#connectWalletBtn, #heroConnectBtn');
        buttons.forEach(button => {
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                console.log(`Button clicked: ${button.id}`);
                try {
                    await this.connectWallet();
                } catch (error) {
                    console.error('Connect wallet error:', error);
                    this.showError(error.message);
                }
            });
        });
    }

    enableConnectButtons() {
        console.log('Enabling connect wallet buttons...');
        const buttons = document.querySelectorAll('#connectWalletBtn, #heroConnectBtn');
        buttons.forEach(button => {
            console.log(`Enabling button: ${button.id}`);
            button.disabled = false;
        });
    }

    async setupEventListeners() {
        console.log('Setting up event listeners...');

        try {
            // Bind methods to preserve context
            const handleConnect = this.connectWallet.bind(this);
            const handleGameAccess = this.handleGameAccess.bind(this);

            // Find all connect wallet buttons
            const buttons = document.querySelectorAll('#connectWalletBtn, #heroConnectBtn');
            console.log(`Found ${buttons.length} connect buttons`);

            buttons.forEach(button => {
                console.log(`Setting up listener for button: ${button.id}`);
                
                // Remove any existing listeners by cloning the button
                const newButton = button.cloneNode(true);
                button.parentNode.replaceChild(newButton, button);
                
                // Add new click listener
                newButton.addEventListener('click', async (e) => {
                    e.preventDefault();
                    console.log(`Button clicked: ${newButton.id}`);
                    try {
                        await handleConnect();
                    } catch (error) {
                        console.error('Connect wallet error:', error);
                        this.showError(error.message);
                    }
                });
                
                console.log(`Listener setup complete for button: ${newButton.id}`);
            });

            // Setup game access buttons
            const gameButtons = document.querySelectorAll('.game-access-btn');
            console.log(`Found ${gameButtons.length} game buttons`);

            gameButtons.forEach(button => {
                console.log('Setting up game access button');
                
                // Remove any existing listeners by cloning the button
                const newButton = button.cloneNode(true);
                button.parentNode.replaceChild(newButton, button);
                
                // Add new click listener
                newButton.addEventListener('click', handleGameAccess);
                
                console.log('Game access button listener setup complete');
            });

            console.log('All button listeners setup complete');
        } catch (error) {
            console.error('Error setting up event listeners:', error);
            this.showError('Failed to setup wallet connection');
        }

        // Setup ethereum event listeners only if they haven't been set up
        if (window.ethereum && !window.ethereum._events) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    this.handleDisconnect();
                } else {
                    this.updateUI();
                }
            });
            
            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            });
        }
    }

    async connectWallet() {
        console.log('connectWallet method called');
        try {
            console.log('Connecting wallet...');
            
            if (!this.provider) {
                throw new Error('Provider not initialized');
            }
            
            // Request account access
            console.log('Requesting accounts...');
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            console.log('Accounts received:', accounts);

            if (accounts.length === 0) {
                throw new Error('No accounts found');
            }

            console.log('Getting signer...');
            this.signer = this.provider.getSigner();
            const address = await this.signer.getAddress();
            console.log('Connected address:', address);
            
            // Check if we're on Polygon network
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            if (chainId !== '0x89') { // 0x89 is Polygon mainnet
                await this.switchNetwork();
            }

            document.getElementById('walletStatus').classList.remove('hidden');
            document.getElementById('walletAddress').textContent = this.formatAddress(address);
            
            await this.checkKLOSBalance(address);
            this.updateGameAccess();

            // Show success message
            this.showSuccess('Wallet connected successfully!');
        } catch (error) {
            console.error('Error connecting wallet:', error);
            if (error.code === 4001) {
                this.showError('Connection rejected. Please approve MetaMask connection.');
            } else {
                this.showError(error.message);
            }
        }
    }

    async switchNetwork() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x89' }], // Polygon mainnet
            });
        } catch (error) {
            if (error.code === 4902) {
                // Network not added, try to add it
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0x89',
                            chainName: 'Polygon Mainnet',
                            nativeCurrency: {
                                name: 'MATIC',
                                symbol: 'MATIC',
                                decimals: 18
                            },
                            rpcUrls: ['https://polygon-rpc.com/'],
                            blockExplorerUrls: ['https://polygonscan.com/']
                        }]
                    });
                } catch (addError) {
                    this.showError('Failed to add Polygon network to MetaMask');
                    throw addError;
                }
            } else {
                this.showError('Failed to switch to Polygon network');
                throw error;
            }
        }
    }

    handleDisconnect() {
        document.getElementById('walletStatus').classList.add('hidden');
        this.updateGameAccess();
        this.showError('Wallet disconnected');
    }

    showError(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    showSuccess(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    async checkKLOSBalance(address) {
        try {
            const tokenABI = ['function balanceOf(address) view returns (uint256)'];
            this.tokenContract = new window.ethers.Contract(KLOS_TOKEN_ADDRESS, tokenABI, this.provider);
            const balance = await this.tokenContract.balanceOf(address);
            
            const statusElement = document.getElementById('tokenStatus');
            if (balance.gt(0)) {
                statusElement.innerHTML = `
                    <span class="text-sm font-medium px-3 py-1 rounded-full bg-emerald-900/50 text-emerald-300">
                        <i class="fas fa-check-circle mr-1"></i> KLOS Verified
                    </span>`;
                // Initialize frames when KLOS tokens are verified
                if (typeof initializeFrames === 'function') {
                    initializeFrames();
                }
                return true;
            } else {
                statusElement.innerHTML = `
                    <span class="text-sm font-medium px-3 py-1 rounded-full bg-red-900/50 text-red-300">
                        <i class="fas fa-exclamation-circle mr-1"></i> No KLOS Found
                    </span>`;
                // Clear frame sources if no KLOS tokens
                document.querySelectorAll('.game-frame').forEach(frame => {
                    frame.src = 'about:blank';
                });
                return false;
            }
        } catch (error) {
            console.error('Error checking KLOS balance:', error);
            return false;
        }
    }

    async handleGameAccess(event) {
        event.preventDefault();
        console.log('Game access requested');

        // Check if wallet is connected
        const accounts = await this.provider.listAccounts();
        if (accounts.length === 0) {
            this.showError('Please connect your wallet first');
            return;
        }

        // Check if on correct network
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId !== '0x89') {
            this.showError('Please switch to Polygon network');
            return;
        }

        // Check KLOS balance
        const hasKLOS = document.querySelector('#tokenStatus .bg-emerald-900\\/50') !== null;
        if (!hasKLOS) {
            this.showError('You need KLOS tokens to access games');
            return;
        }

        // Get game name from button's parent card
        const gameCard = event.target.closest('.game-card');
        const gameName = gameCard ? gameCard.querySelector('h3').textContent : 'the game';
        
        // Allow access
        this.showSuccess(`Launching ${gameName}...`);
        // Here you would typically redirect to the game or launch it
        // For now we just show the success message
    }

    updateGameAccess() {
        const hasKLOS = document.querySelector('#tokenStatus .bg-emerald-900\\/50') !== null;
        const gameButtons = document.querySelectorAll('.game-access-btn');
        
        gameButtons.forEach(btn => {
            if (hasKLOS) {
                btn.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
                btn.classList.add('bg-emerald-600', 'hover:bg-emerald-700');
                btn.querySelector('i').classList.remove('fa-lock');
                btn.querySelector('i').classList.add('fa-play');
            } else {
                btn.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
                btn.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
                btn.querySelector('i').classList.add('fa-lock');
                btn.querySelector('i').classList.remove('fa-play');
            }
        });
    }

    formatAddress(address) {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }

    async updateUI() {
        const connected = await this.provider.listAccounts().then(accounts => accounts.length > 0);
        const connectBtns = document.querySelectorAll('#connectWalletBtn, #heroConnectBtn');
        
        connectBtns.forEach(btn => {
            btn.innerHTML = connected ? 
                '<i class="fas fa-wallet"></i><span>Connected</span>' :
                '<i class="fab fa-ethereum"></i><span>Connect Wallet</span>';
            btn.classList.toggle('bg-emerald-600', connected);
            btn.classList.toggle('hover:bg-emerald-700', connected);
            btn.classList.toggle('bg-indigo-600', !connected);
            btn.classList.toggle('hover:bg-indigo-700', !connected);
        });

        if (!connected) {
            document.getElementById('walletStatus').classList.add('hidden');
        }
    }
}

// WalletManager will be initialized from index.html after all dependencies are loaded
