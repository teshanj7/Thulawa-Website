// Environment Variables Loader for Client-Side
// This script loads environment variables for use in the browser

(function() {
    'use strict';
    
    // Initialize ENV object
    window.ENV = {};
    
    // MANUAL CONFIGURATION (Recommended for Production/Hosting)
    // Replace these values with your actual EmailJS credentials
    function setManualConfig() {
        window.ENV = {
            EMAILJS_PUBLIC_KEY: 'fNPJZQRNdpj8NdSY7',
            EMAILJS_SERVICE_ID: 'service_8i3aoi3',
            EMAILJS_TEMPLATE_ID: 'template_gf9iq3w'
        };
        console.log('Using manual environment configuration');
    }
    
    // Function to load environment variables from .env file (for local development)
    async function loadEnvVariables() {
        // Try different paths based on where the script might be called from
        const possiblePaths = [
            '.env',           // If called from root directory
            '../.env',        // If called from js/ directory
            '../../.env',     // If called from pages/ directory
            './.env'          // Alternative root path
        ];
        
        for (const path of possiblePaths) {
            try {
                const response = await fetch(path);
                
                if (response.ok) {
                    const envContent = await response.text();
                    parseEnvContent(envContent);
                    console.log(`Environment variables loaded successfully from: ${path}`);
                    return true;
                }
            } catch (error) {
                // Continue to next path
                continue;
            }
        }
        
        console.warn('Could not load .env file from any location. Using manual configuration.');
        return false;
    }
    
    // Function to parse .env file content
    function parseEnvContent(envContent) {
        // Parse the .env file content
        const envLines = envContent.split('\n');
        
        envLines.forEach(line => {
            // Skip empty lines and comments
            if (line.trim() === '' || line.trim().startsWith('#')) {
                return;
            }
            
            // Parse key=value pairs
            const [key, ...valueParts] = line.split('=');
            if (key && valueParts.length > 0) {
                const value = valueParts.join('=').trim();
                // Remove quotes if present
                const cleanValue = value.replace(/^["']|["']$/g, '');
                window.ENV[key.trim()] = cleanValue;
            }
        });
    }
    
    // Main initialization function
    async function initializeEnvironment() {
        // For production/hosting environments, use manual configuration
        if (window.location.hostname !== 'localhost' && 
            window.location.hostname !== '127.0.0.1' && 
            !window.location.hostname.includes('local')) {
            
            // Use manual configuration for hosted environments
            setManualConfig();
            return;
        }
        
        // For local development, try to load .env file first
        const envLoaded = await loadEnvVariables();
        
        // If .env loading fails, fallback to manual configuration
        if (!envLoaded) {
            setManualConfig();
        }
    }
    
    // Load environment variables when script loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeEnvironment);
    } else {
        initializeEnvironment();
    }
    
})();