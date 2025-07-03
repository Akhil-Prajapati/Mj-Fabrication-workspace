#!/usr/bin/env node

// Quick test script to verify login functionality
const API_URL = "https://mj-fabrication-workspace-production.up.railway.app/api/v1";

async function testLogin() {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "jatin",
        password: "Jatin@24199"
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log("✅ Login successful!");
      console.log("Response:", JSON.stringify(data, null, 2));
      
      // Test token verification
      const verifyResponse = await fetch(`${API_URL}/auth/verify`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${data.accessToken}`
        }
      });
      
      const verifyData = await verifyResponse.json();
      console.log("✅ Token verification:", verifyData);
      
    } else {
      console.log("❌ Login failed:");
      console.log("Status:", response.status);
      console.log("Response:", data);
    }
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

testLogin();
