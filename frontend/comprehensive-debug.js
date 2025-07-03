#!/usr/bin/env node

/**
 * Comprehensive Mobile Authentication Debug Script
 * Tests all aspects of the authentication flow for mobile debugging
 */

const https = require('https');
const http = require('http');

const API_URL = 'https://mj-fabrication-workspace-production.up.railway.app/api/v1';
const CREDENTIALS = {
    username: 'jatin',
    password: 'Jatin@24199'
};

// Helper function for making HTTP requests
function makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const isHttps = urlObj.protocol === 'https:';
        const client = isHttps ? https : http;
        
        const requestOptions = {
            hostname: urlObj.hostname,
            port: urlObj.port || (isHttps ? 443 : 80),
            path: urlObj.pathname + urlObj.search,
            method: options.method || 'GET',
            headers: {
                'User-Agent': 'MJ-Fabrication-Debug/1.0 (Mobile Test)',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...options.headers
            }
        };

        if (options.body) {
            requestOptions.headers['Content-Length'] = Buffer.byteLength(options.body);
        }

        const req = client.request(requestOptions, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const response = {
                        statusCode: res.statusCode,
                        statusMessage: res.statusMessage,
                        headers: res.headers,
                        body: data,
                        json: null
                    };
                    
                    try {
                        response.json = JSON.parse(data);
                    } catch (e) {
                        // Not JSON, that's okay
                    }
                    
                    resolve(response);
                } catch (error) {
                    reject(error);
                }
            });
        });

        req.on('error', reject);
        req.on('timeout', () => reject(new Error('Request timeout')));
        
        req.setTimeout(15000); // 15 second timeout

        if (options.body) {
            req.write(options.body);
        }
        
        req.end();
    });
}

// Test functions
async function testAPIHealth() {
    console.log('\n🔍 Testing API Health...');
    console.log('=' .repeat(50));
    
    try {
        const response = await makeRequest(`${API_URL}/health`);
        
        console.log(`Status: ${response.statusCode} ${response.statusMessage}`);
        console.log(`Headers:`, JSON.stringify(response.headers, null, 2));
        console.log(`Body:`, response.body);
        
        if (response.json) {
            console.log('✅ API is healthy');
            console.log('Environment:', response.json.environment);
            console.log('Service:', response.json.service);
            console.log('Version:', response.json.version);
            
            if (response.json.request) {
                console.log('\nRequest Info:');
                console.log('- Origin:', response.json.request.origin);
                console.log('- User-Agent:', response.json.request.userAgent);
                console.log('- Remote IP:', response.json.request.remoteAddr);
                console.log('- Server:', response.json.request.serverName + ':' + response.json.request.serverPort);
                console.log('- Request URL:', response.json.request.requestURL);
            }
        } else {
            console.log('❌ API response is not JSON');
        }
    } catch (error) {
        console.log('❌ API Health failed:', error.message);
    }
}

async function testCORSPreflight() {
    console.log('\n✈️ Testing CORS Preflight...');
    console.log('=' .repeat(50));
    
    try {
        const response = await makeRequest(`${API_URL}/auth/login`, {
            method: 'OPTIONS',
            headers: {
                'Origin': 'https://mjfabrication.in',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type, Authorization'
            }
        });
        
        console.log(`Status: ${response.statusCode} ${response.statusMessage}`);
        console.log(`Headers:`, JSON.stringify(response.headers, null, 2));
        
        const corsHeaders = {
            'access-control-allow-origin': response.headers['access-control-allow-origin'],
            'access-control-allow-methods': response.headers['access-control-allow-methods'],
            'access-control-allow-headers': response.headers['access-control-allow-headers'],
            'access-control-allow-credentials': response.headers['access-control-allow-credentials'],
            'access-control-max-age': response.headers['access-control-max-age']
        };
        
        console.log('\nCORS Headers:');
        Object.entries(corsHeaders).forEach(([key, value]) => {
            console.log(`- ${key}: ${value || 'MISSING'}`);
        });
        
        if (response.statusCode === 200) {
            console.log('✅ CORS preflight successful');
        } else {
            console.log('❌ CORS preflight failed');
        }
    } catch (error) {
        console.log('❌ CORS preflight error:', error.message);
    }
}

async function testLogin() {
    console.log('\n🔐 Testing Login...');
    console.log('=' .repeat(50));
    
    try {
        const loginData = JSON.stringify(CREDENTIALS);
        const response = await makeRequest(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Origin': 'https://mjfabrication.in',
                'Referer': 'https://mjfabrication.in/admin/login'
            },
            body: loginData
        });
        
        console.log(`Status: ${response.statusCode} ${response.statusMessage}`);
        console.log(`Headers:`, JSON.stringify(response.headers, null, 2));
        console.log(`Body:`, response.body);
        
        if (response.statusCode === 200 && response.json) {
            console.log('✅ Login successful');
            console.log('Username:', response.json.username);
            console.log('Token Length:', response.json.accessToken ? response.json.accessToken.length : 'NO TOKEN');
            console.log('Token Preview:', response.json.accessToken ? response.json.accessToken.substring(0, 50) + '...' : 'NO TOKEN');
            
            return response.json.accessToken;
        } else {
            console.log('❌ Login failed');
            if (response.json && response.json.message) {
                console.log('Error:', response.json.message);
            }
            return null;
        }
    } catch (error) {
        console.log('❌ Login error:', error.message);
        return null;
    }
}

async function testTokenVerification(token) {
    console.log('\n🔍 Testing Token Verification...');
    console.log('=' .repeat(50));
    
    if (!token) {
        console.log('❌ No token provided');
        return false;
    }
    
    try {
        const response = await makeRequest(`${API_URL}/auth/verify`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Origin': 'https://mjfabrication.in'
            }
        });
        
        console.log(`Status: ${response.statusCode} ${response.statusMessage}`);
        console.log(`Headers:`, JSON.stringify(response.headers, null, 2));
        console.log(`Body:`, response.body);
        
        if (response.statusCode === 200) {
            console.log('✅ Token verification successful');
            if (response.json) {
                console.log('Token Data:', JSON.stringify(response.json, null, 2));
            }
            return true;
        } else {
            console.log('❌ Token verification failed');
            if (response.json && response.json.message) {
                console.log('Error:', response.json.message);
            }
            return false;
        }
    } catch (error) {
        console.log('❌ Token verification error:', error.message);
        return false;
    }
}

async function testAuthenticatedRequest(token) {
    console.log('\n🔒 Testing Authenticated Request...');
    console.log('=' .repeat(50));
    
    if (!token) {
        console.log('❌ No token provided');
        return false;
    }
    
    try {
        const response = await makeRequest(`${API_URL}/customers`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Origin': 'https://mjfabrication.in'
            }
        });
        
        console.log(`Status: ${response.statusCode} ${response.statusMessage}`);
        console.log(`Headers:`, JSON.stringify(response.headers, null, 2));
        
        if (response.statusCode === 200) {
            console.log('✅ Authenticated request successful');
            if (response.json) {
                console.log('Data length:', Array.isArray(response.json) ? response.json.length : 'Not an array');
                console.log('Sample data:', JSON.stringify(response.json).substring(0, 200) + '...');
            }
            return true;
        } else {
            console.log('❌ Authenticated request failed');
            console.log('Response:', response.body);
            return false;
        }
    } catch (error) {
        console.log('❌ Authenticated request error:', error.message);
        return false;
    }
}

async function testMobileSpecificHeaders() {
    console.log('\n📱 Testing Mobile-Specific Headers...');
    console.log('=' .repeat(50));
    
    const mobileHeaders = {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
        'Origin': 'https://mjfabrication.in',
        'Referer': 'https://mjfabrication.in/',
        'DNT': '1'
    };
    
    try {
        const response = await makeRequest(`${API_URL}/health`, {
            method: 'GET',
            headers: mobileHeaders
        });
        
        console.log(`Status: ${response.statusCode} ${response.statusMessage}`);
        console.log(`Headers:`, JSON.stringify(response.headers, null, 2));
        
        if (response.statusCode === 200) {
            console.log('✅ Mobile headers accepted');
            if (response.json && response.json.request) {
                console.log('Detected User-Agent:', response.json.request.userAgent);
                console.log('Detected Origin:', response.json.request.origin);
            }
        } else {
            console.log('❌ Mobile headers rejected');
        }
    } catch (error) {
        console.log('❌ Mobile headers test error:', error.message);
    }
}

async function testNetworkConnectivity() {
    console.log('\n🌐 Testing Network Connectivity...');
    console.log('=' .repeat(50));
    
    const testUrls = [
        'https://mj-fabrication-workspace-production.up.railway.app',
        'https://mj-fabrication-workspace-production.up.railway.app/api/v1',
        'https://mj-fabrication-workspace-production.up.railway.app/api/v1/health',
        'https://mjfabrication.in'
    ];
    
    for (const url of testUrls) {
        console.log(`\nTesting: ${url}`);
        try {
            const startTime = Date.now();
            const response = await makeRequest(url);
            const endTime = Date.now();
            const duration = endTime - startTime;
            
            console.log(`  Status: ${response.statusCode} ${response.statusMessage}`);
            console.log(`  Duration: ${duration}ms`);
            console.log(`  Content-Type: ${response.headers['content-type']}`);
            console.log(`  Content-Length: ${response.headers['content-length']}`);
            
            if (response.statusCode < 400) {
                console.log('  ✅ Reachable');
            } else {
                console.log('  ❌ HTTP Error');
            }
        } catch (error) {
            console.log(`  ❌ Network Error: ${error.message}`);
        }
    }
}

// Main execution
async function main() {
    console.log('🔧 MJ Fabrication - Mobile Authentication Debug');
    console.log('=' .repeat(60));
    console.log('Starting comprehensive authentication tests...');
    console.log('API URL:', API_URL);
    console.log('Credentials:', `${CREDENTIALS.username}:${'*'.repeat(CREDENTIALS.password.length)}`);
    console.log('Timestamp:', new Date().toISOString());
    
    // Run all tests
    await testNetworkConnectivity();
    await testAPIHealth();
    await testCORSPreflight();
    await testMobileSpecificHeaders();
    
    const token = await testLogin();
    if (token) {
        await testTokenVerification(token);
        await testAuthenticatedRequest(token);
    }
    
    console.log('\n' + '=' .repeat(60));
    console.log('🏁 All tests completed');
    console.log('=' .repeat(60));
}

// Run the tests
main().catch(console.error);
