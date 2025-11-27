package com.example.lostandfound.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

    @GetMapping("/")
    @ResponseBody
    public String home() {
        return """
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Lost & Found API</title>
                    <style>
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            max-width: 900px;
                            margin: 0 auto;
                            padding: 20px;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            min-height: 100vh;
                        }
                        .container {
                            background: white;
                            border-radius: 8px;
                            padding: 40px;
                            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                        }
                        h1 {
                            color: #333;
                            text-align: center;
                            margin-bottom: 10px;
                        }
                        .subtitle {
                            text-align: center;
                            color: #666;
                            margin-bottom: 40px;
                            font-size: 16px;
                        }
                        .section {
                            margin-bottom: 40px;
                        }
                        h2 {
                            color: #667eea;
                            border-bottom: 2px solid #667eea;
                            padding-bottom: 10px;
                            margin-top: 0;
                        }
                        .endpoint {
                            background: #f5f5f5;
                            padding: 15px;
                            margin: 10px 0;
                            border-left: 4px solid #667eea;
                            border-radius: 4px;
                        }
                        .method {
                            display: inline-block;
                            padding: 4px 8px;
                            border-radius: 4px;
                            color: white;
                            font-weight: bold;
                            margin-right: 10px;
                            min-width: 60px;
                            text-align: center;
                        }
                        .get { background: #61affe; }
                        .post { background: #49cc90; }
                        .put { background: #fca130; }
                        .delete { background: #f93e3e; }
                        .path {
                            font-family: 'Courier New', monospace;
                            color: #333;
                            font-weight: 500;
                        }
                        .description {
                            color: #666;
                            margin-top: 5px;
                            font-size: 14px;
                        }
                        .auth-note {
                            background: #fff3cd;
                            border: 1px solid #ffc107;
                            padding: 10px;
                            border-radius: 4px;
                            margin-top: 5px;
                            font-size: 13px;
                            color: #856404;
                        }
                        .credentials {
                            background: #e7f3ff;
                            border: 1px solid #b3d9ff;
                            padding: 15px;
                            border-radius: 4px;
                            margin: 20px 0;
                            font-family: monospace;
                        }
                        .credentials-title {
                            font-weight: bold;
                            margin-bottom: 10px;
                            color: #004085;
                        }
                        .cred-line {
                            margin: 5px 0;
                            color: #004085;
                        }
                        .links {
                            text-align: center;
                            margin-top: 30px;
                            padding-top: 20px;
                            border-top: 2px solid #eee;
                        }
                        .btn {
                            display: inline-block;
                            padding: 10px 20px;
                            margin: 5px;
                            background: #667eea;
                            color: white;
                            text-decoration: none;
                            border-radius: 4px;
                            transition: background 0.3s;
                        }
                        .btn:hover {
                            background: #764ba2;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>🔍 Lost & Found API</h1>
                        <p class="subtitle">Backend service for managing lost and found items</p>
                        
                        <div class="credentials">
                            <div class="credentials-title">📋 Test Credentials</div>
                            <div class="cred-line"><strong>Admin:</strong> username: <code>admin</code> | password: <code>adminpass</code></div>
                            <div class="cred-line"><strong>User:</strong> username: <code>user</code> | password: <code>userpass</code></div>
                        </div>
                        
                        <div class="section">
                            <h2>🔐 Authentication</h2>
                            <div class="endpoint">
                                <div><span class="method post">POST</span><span class="path">/api/auth/login</span></div>
                                <div class="description">Login with username and password</div>
                                <div class="auth-note">Request body: {"username": "string", "password": "string"}</div>
                            </div>
                            <div class="endpoint">
                                <div><span class="method get">GET</span><span class="path">/api/auth/me</span></div>
                                <div class="description">Get current authenticated user info</div>
                                <div class="auth-note">✅ Requires authentication (HTTP Basic Auth)</div>
                            </div>
                        </div>
                        
                        <div class="section">
                            <h2>📦 Items Management</h2>
                            <div class="endpoint">
                                <div><span class="method get">GET</span><span class="path">/api/items</span></div>
                                <div class="description">List all items</div>
                            </div>
                            <div class="endpoint">
                                <div><span class="method post">POST</span><span class="path">/api/items</span></div>
                                <div class="description">Create a new item</div>
                                <div class="auth-note">✅ Requires authentication (HTTP Basic Auth)</div>
                            </div>
                            <div class="endpoint">
                                <div><span class="method get">GET</span><span class="path">/api/items/{id}</span></div>
                                <div class="description">Get item by ID</div>
                            </div>
                            <div class="endpoint">
                                <div><span class="method get">GET</span><span class="path">/api/items/status/{status}</span></div>
                                <div class="description">Filter items by status (LOST or FOUND)</div>
                            </div>
                            <div class="endpoint">
                                <div><span class="method get">GET</span><span class="path">/api/items/user/{username}</span></div>
                                <div class="description">Get items posted by a specific user</div>
                            </div>
                            <div class="endpoint">
                                <div><span class="method put">PUT</span><span class="path">/api/items/{id}</span></div>
                                <div class="description">Update an existing item</div>
                                <div class="auth-note">✅ Requires authentication (HTTP Basic Auth)</div>
                            </div>
                            <div class="endpoint">
                                <div><span class="method delete">DELETE</span><span class="path">/api/items/{id}</span></div>
                                <div class="description">Delete an item</div>
                                <div class="auth-note">✅ Requires authentication (HTTP Basic Auth)</div>
                            </div>
                        </div>
                        
                        <div class="links">
                            <a href="/h2-console" class="btn">📊 H2 Database Console</a>
                            <a href="/api/items" class="btn">📋 View Items (JSON)</a>
                        </div>
                    </div>
                </body>
                </html>
                """;
    }
}
