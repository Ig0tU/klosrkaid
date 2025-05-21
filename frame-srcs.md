```
        /* Carousel Styles */
        .carousel-container {
            width: 80vw;
            max-width: 700px;
            height: 500px;
            perspective: 1500px;
            position: relative;
            background-color: #111;
            border-radius: 12px;
            overflow: hidden;
            margin-left: auto;
            margin-right: auto;
        }

        .carousel-container:-webkit-full-screen {
            width: 100vw !important; height: 100vh !important; max-width: none !important;
            perspective: 2000px; background-color: #000; border-radius: 0;
        }
        .carousel-container:-moz-full-screen {
            width: 100vw !important; height: 100vh !important; max-width: none !important;
            perspective: 2000px; background-color: #000; border-radius: 0;
        }
        .carousel-container:-ms-fullscreen {
            width: 100vw !important; height: 100vh !important; max-width: none !important;
            perspective: 2000px; background-color: #000; border-radius: 0;
        }
        .carousel-container:fullscreen {
            width: 100vw !important; height: 100vh !important; max-width: none !important;
            perspective: 2000px; background-color: #000; border-radius: 0;
        }

        .carousel-stage {
            width: 100%;
            height: 100%;
            position: absolute;
            transform-style: preserve-3d;
            transition: transform 0.8s ease-in-out;
        }

        .carousel-card {
            position: absolute;
            width: 320px;
            height: 400px;
            left: calc(50% - 160px);
            top: calc(50% - 200px);
            border: none;
            background-color: #222;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            overflow: hidden;
            backface-visibility: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2em;
            color: #aaa;
            transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
            border-radius: 8px;
        }

        .carousel-card iframe {
            width: 100%;
            height: 100%;
            border: none;
            background-color: #111;
            border-radius: 8px;
        }

        /* CAROUSEL POINTERS CSS START */
        .carousel-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 10;
            background-color: rgba(110, 0, 255, 0.7);
            color: white;
            border: none;
            padding: 12px 18px;
            font-size: 24px;
            cursor: pointer;
            border-radius: 50%;
            transition: all 0.3s;
            backdrop-filter: blur(5px);
        }
        .carousel-nav:hover {
            background-color: rgba(110, 0, 255, 0.9);
            transform: translateY(-50%) scale(1.1);
        }
        .prev-button { left: 20px; }
        .next-button { right: 20px; }

        .fullscreen-toggle {
            position: absolute;
            bottom: 20px;
            right: 20px;
            z-index: 102;
            background-color: rgba(110, 0, 255, 0.7);
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s;
            backdrop-filter: blur(5px);
        }
        .fullscreen-toggle:hover {
            background-color: rgba(110, 0, 255, 0.9);
        }
        /* CAROUSEL POINTERS CSS END */

        /* CSS for carousel pointers and cards in fullscreen mode */
        .carousel-container:is(:fullscreen, :-webkit-full-screen, :-moz-full-screen, :-ms-fullscreen) .carousel-stage.stage-fullscreen-mode .carousel-card {
            opacity: 0 !important;
            pointer-events: none !important;
        }
        .carousel-container:is(:fullscreen, :-webkit-full-screen, :-moz-full-screen, :-ms-fullscreen) .carousel-stage.stage-fullscreen-mode .carousel-card.fullscreen-active-card {
            width: 100% !important; height: 100% !important; left: 0 !important; top: 0 !important;
            transform: rotateY(0deg) translateZ(0px) !important;
            opacity: 1 !important; pointer-events: auto !important; z-index: 100 !important;
            border-radius: 0; border: none; background-color: #000;
        }
        .carousel-container:is(:fullscreen, :-webkit-full-screen, :-moz-full-screen, :-ms-fullscreen) .carousel-stage.stage-fullscreen-mode .carousel-card.fullscreen-active-card iframe {
            width: 100% !important; height: 100% !important; border-radius: 0;
        }
         .carousel-container:is(:fullscreen, :-webkit-full-screen, :-moz-full-screen, :-ms-fullscreen) .carousel-nav {
            z-index: 101 !important;
            background-color: rgba(110, 0, 255, 0.9);
        }


        /* Modal Styles */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            visibility: hidden;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .modal-overlay.visible {
            visibility: visible;
            opacity: 1;
        }

        .modal-content {
            background: linear-gradient(135deg, #1a0a33 0%, #2a1a4a 100%);
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            width: 90%;
            max-width: 500px;
            color: white;
            position: relative;
            transform: translateY(-20px);
            transition: transform 0.3s ease;
        }
         .modal-overlay.visible .modal-content {
             transform: translateY(0);
         }

        .modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
            color: #aaa;
            transition: color 0.2s ease;
        }
        .modal-close:hover {
            color: #fff;
        }

        .modal-content h3 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            text-align: center;
            color: #d8b4fe; /* Using Tailwind purple-300 hex */
        }

        .modal-content label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: #ccc;
        }

        .modal-content input[type="text"],
        .modal-content input[type="email"],
        .modal-content input[type="tel"] {
            width: 100%;
            padding: 12px;
            margin-bottom: 15px;
            border: 1px solid #555;
            border-radius: 8px;
            background-color: #333;
            color: white;
            font-size: 16px;
            box-sizing: border-box;
        }
        .modal-content input[type="text"]::placeholder,
        .modal-content input[type="email"]::placeholder,
        .modal-content input[type="tel"]::placeholder {
             color: #888;
        }

        .modal-content button {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 8px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .modal-content .submit-button {
             background-color: #9333ea; /* Using Tailwind purple-600 hex */
             color: white;
        }
        .modal-content .submit-button:hover {
             background-color: #7e22ce; /* Using Tailwind purple-700 hex */
        }

        .modal-content .discord-link {
            display: block;
            text-align: center;
            margin-top: 20px;
            color: #7289da; /* Discord color */
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
        }
        .modal-content .discord-link:hover {
            color: #99aab5;
        }

        /* Style for the inactive button */
        .btn-coming-soon {
            background-color: #555 !important;
            cursor: not-allowed !important;
            opacity: 0.7;
            box-shadow: none !important;
            transform: none !important;
        }
        .btn-coming-soon:hover {
             box-shadow: none !important;
             transform: none !important;
        }

        /* Style for the Add to Metamask button */
        .metamask-button {
            background-color: #f6851a; /* MetaMask orange */
            color: white;
            display: inline-flex; /* Use flex for icon+text alignment */
            align-items: center; /* Center icon and text vertically */
            justify-content: center; /* Center content horizontally */
            padding: 10px 20px; /* Adjust padding */
            border-radius: 25px; /* Pill shape */
            font-weight: bold;
            transition: background-color 0.3s ease;
        }
        .metamask-button:hover {
            background-color: #e57300; /* Darker orange on hover */
        }
        .metamask-button i {
            margin-right: 8px; /* Space between icon and text */
        }

        /* Dropdown Styles */
        .dropdown {
            position: relative;
            display: inline-block; /* Or 'block' depending on layout */
        }

        .dropdown-content {
            display: none;
            position: absolute;
            background-color: #333; /* Dark background for dropdown */
            min-width: 200px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
            border-radius: 8px;
            overflow: hidden; /* Ensures border-radius applies to children */
            top: 100%; /* Position below the dropdown trigger */
            left: 0; /* Align left edge */
            margin-top: 8px; /* Space below the trigger */
        }

        .dropdown-content a {
            color: white;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            transition: background-color 0.2s ease;
        }

        .dropdown-content a:hover {
            background-color: #575757; /* Slightly lighter dark on hover */
        }

        .dropdown:hover .dropdown-content {
            display: block;
        }


    </style>
</head>
<body class="gradient-bg text-white min-h-screen font-sans">
    <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <i class="fas fa-infinity text-xl"></i>
            </div>
            <span class="text-2xl font-bold">Kyklos</span>
        </div>
        <div class="hidden md:flex space-x-8">
            <a href="#features" class="hover:text-purple-300 transition">Features</a>
            <a href="#fun-quiz" class="hover:text-purple-300 transition">Quiz</a>
            <div class="dropdown">
                <a href="#carousel" class="hover:text-purple-300 transition">Demos</a>
                <div class="dropdown-content">
                    <a href="demos/dogter.html">The Dogter AI PetVet Assistant</a>
                    <a href="demos/healthycat.html">The HealthyCat AI PetVet Assistant</a>
                    <a href="demos/poli-imagen.html">Poli Imagen - Image Series Generation</a>
                </div>
            </div>
            <a href="#community" class="hover:text-purple-300 transition">Community</a>
        </div>
        <button id="join-waitlist-btn" class="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full glow-on-hover transition">
            Join Waitlist
        </button>
    </nav>

    <section class="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 mb-12 md:mb-0">
            <h1 class="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Build. Learn. <span class="text-purple-300">Earn.</span>
            </h1>
            <p class="text-xl text-gray-300 mb-8">
                Kyklos is a revolutionary community-powered platform combining cryptocurrency, AI tools, and blockchain gaming.
                Earn while you learn to develop and monetize your creations.
            </p>
            <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button id="pre-stake-btn" class="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-full glow-on-hover transition pulse btn-coming-soon">
                    Pre-Stake (Coming Soon) <i class="fas fa-coins ml-2"></i>
                </button>
                <a href="https://polygonscan.com/address/0xc24d230a3cd9fac02269c670ca549b94c381112a" target="_blank" class="inline-block">
                    <button class="border border-purple-400 hover:bg-purple-900/50 px-8 py-4 rounded-full transition">
                        Contract Address <i class="fas fa-external-link-alt ml-2"></i>
                    </button>
                </a>
            </div>
        </div>
        <div class="md:w-1/2 flex justify-center">
            <div class="relative floating">
                <div class="w-64 h-64 md:w-80 md:h-80 bg-purple-900/30 rounded-full absolute -inset-0 m-auto blur-xl"></div>
                <div class="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center relative">
                    <div class="text-center p-6">
                        <i class="fas fa-brain text-6xl mb-4"></i>
                        <h3 class="text-2xl font-bold">Kyklos AI</h3>
                        <p class="text-sm mt-2">Coming Soon</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

     <section id="fun-quiz" class="py-10 md:py-16">
        <div class="container mx-auto px-6">
            <h2 class="text-4xl font-bold text-center mb-4">While You Wait...</h2>
            <p class="text-xl text-center text-gray-300 mb-10 max-w-2xl mx-auto">
                Pre-staking is almost here! In the meantime, why not try this fun quiz?
            </p>
            <div class="max-w-3xl mx-auto bg-gray-900/50 p-2 md:p-4 rounded-xl shadow-2xl gradient-border">
                 <iframe class="standalone-iframe w-full h-[500px] md:h-[600px] border-none rounded-lg"
                           src="about:blank"
                           title="Fun Quiz"
                           data-src="https://asim.sh/frame/198191/">
                 </iframe>
            </div>
        </div>
    </section>

    <section id="features" class="py-20 bg-black/20">
        <div class="container mx-auto px-6">
            <h2 class="text-4xl font-bold text-center mb-16">Why <span class="text-purple-300">Kyklos?</span></h2>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="gradient-border p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm">
                    <div class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                        <i class="fas fa-robot text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-3">Premium AI Tools</h3>
                    <p class="text-gray-300">
                        Access cutting-edge AI models for content creation, development, and analysis - all powered by our community.
                    </p>
                </div>
                <div class="gradient-border p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm">
                    <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                        <i class="fas fa-gamepad text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-3">Blockchain Gaming</h3>
                    <p class="text-gray-300">
                        Play-to-earn games with real cryptocurrency rewards. Beta testing opportunities available now.
                    </p>
                </div>
                <div class="gradient-border p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm">
                    <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                        <i class="fas fa-wallet text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-3">Dapp Wallet</h3>
                    <p class="text-gray-300">
                        Secure, user-friendly wallet for managing your Kyks and interacting with our ecosystem.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section id="carousel" class="py-20">
        <div class="container mx-auto px-6">
            <h2 class="text-4xl font-bold text-center mb-4">Explore Our <span class="text-purple-300">Ecosystem Demos</span></h2>
            <p class="text-xl text-center text-gray-300 mb-12 max-w-3xl mx-auto">
                Preview some of the powerful tools and applications you'll have access to through Kyklos.
            </p>
            <div class="carousel-container">
                <div class="carousel-stage">
                    <div class="carousel-card">
                        <iframe src="about:blank" title="Video/Image Generation" data-src="https://asim.sh/frame/180092"></iframe>
                    </div>
                    <div class="carousel-card">
                        <iframe src="about:blank" title="NFTftw" data-src="https://asim.sh/frame/198227"></iframe>
                    </div>
                    <div class="carousel-card">
                        <iframe src="about:blank" title="Botnet Creator" data-src="https://asim.sh/frame/194190/"></iframe>
                    </div>
                    <div class="carousel-card">
                        <iframe src="about:blank" title="PetVet With Image Analysis" data-src="https://asim.sh/frame/194464"></iframe>
                    </div>
                    <div class="carousel-card">
                        <iframe src="about:blank" title="ZeroSearch - Search without the internet" data-src="https://asim.sh/frame/191134/"></iframe>
                    </div>
                </div>
                <button class="carousel-nav prev-button" aria-label="Previous Slide">&lt;</button>
                <button class="carousel-nav next-button" aria-label="Next Slide">&gt;</button>
                <button class="fullscreen-toggle" id="fullscreen-button" aria-label="Toggle Fullscreen">
                    <i class="fas fa-expand"></i>
                </button>
                </div>
        </div>
    </section>
    ```