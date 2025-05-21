class FrameManager {
    constructor() {
        this.allowedOrigins = [
            'https://asim.sh'
        ];
        this.setupFrameHandlers();
        this.setupButtonListeners();
    }

    setupFrameHandlers() {
        // Add security headers to all game frames
        document.querySelectorAll('.game-frame').forEach(frame => {
            // Set security attributes
            frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-forms');
            frame.setAttribute('loading', 'lazy');
            
            // Add security headers through CSP
            const csp = "default-src 'self' https://asim.sh; frame-src https://asim.sh; script-src 'self' https://asim.sh 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';";
            frame.setAttribute('csp', csp);
            
            // Handle frame loading
            frame.addEventListener('load', () => this.onFrameLoad(frame));
        });
    }

    setupButtonListeners() {
        // Setup fullscreen buttons
        document.querySelectorAll('.fullscreen-toggle').forEach(button => {
            button.addEventListener('click', (e) => this.toggleFullscreen(e));
        });

        // Setup game access buttons
        document.querySelectorAll('.game-access-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.game-card');
                if (!card) return;

                const frame = card.querySelector('.game-frame');
                if (!frame) return;

                const hasKLOS = document.querySelector('#tokenStatus .bg-emerald-900\\/50') !== null;
                if (!hasKLOS) {
                    window.walletManager?.showError('You need KLOS tokens to access games');
                    return;
                }

                // Load frame content if not loaded
                if (frame.src === 'about:blank') {
                    const src = frame.getAttribute('data-src');
                    if (src) frame.src = src;
                }

                // Toggle fullscreen
                this.toggleFullscreen(e);
            });
        });

        // Setup social media links
        document.querySelectorAll('a[href*="tiktok"], a[href*="twitter"], a[href*="instagram"], a[href*="reddit"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                window.open(link.href, '_blank', 'noopener,noreferrer');
            });
        });
    }

    onFrameLoad(frame) {
        // Verify origin
        const frameOrigin = new URL(frame.src).origin;
        if (!this.allowedOrigins.includes(frameOrigin)) {
            console.error('Invalid frame origin:', frameOrigin);
            frame.remove();
            return;
        }

        // Add message event listener
        window.addEventListener('message', (event) => {
            if (!this.allowedOrigins.includes(event.origin)) {
                console.error('Invalid message origin:', event.origin);
                return;
            }
            // Handle frame messages here
            console.log('Frame message:', event.data);
        });
    }

    async toggleFullscreen(event) {
        const container = event.target.closest('.game-frame-container') || 
                         event.target.closest('.game-card')?.querySelector('.game-frame-container');
        if (!container) return;

        try {
            if (!document.fullscreenElement) {
                await container.requestFullscreen();
                container.querySelector('.fullscreen-toggle i').className = 'fas fa-compress';
            } else {
                await document.exitFullscreen();
                document.querySelector('.fullscreen-toggle i').className = 'fas fa-expand';
            }
        } catch (err) {
            console.error('Fullscreen error:', err);
        }
    }

    static validateFrameUrl(url) {
        try {
            const parsed = new URL(url);
            return parsed.hostname === 'asim.sh' && parsed.pathname.startsWith('/frame/');
        } catch {
            return false;
        }
    }
}

// Initialize frame manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.frameManager = new FrameManager();
});
