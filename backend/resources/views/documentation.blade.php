<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dokumentasi API Backend (v1)</title>
    <style>
      body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    margin: 0;
    background-color: #f8f9fa;
    color: #333;
    display: flex;
    min-height: 100vh;
}

.container {
    display: flex;
    width: 100%;
    max-width: 1200px;
    margin: 20px auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.sidebar {
    background-color: #343a40;
    color: #fff;
    padding: 20px;
    width: 250px;
    flex-shrink: 0;
}

.sidebar-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #555;
}

.sidebar-nav {
    list-style: none;
    padding: 0;
}

.sidebar-nav li {
    margin-bottom: 10px;
}

.sidebar-nav li a {
    color: #ddd;
    text-decoration: none;
    display: block;
    padding: 8px 15px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.sidebar-nav li a:hover {
    background-color: #495057;
}

.main-content {
    padding: 30px;
    flex-grow: 1;
}

h1,
h2,
h3 {
    color: #007bff;
    margin-top: 20px;
}

h1:first-of-type {
    margin-top: 0;
}

p {
    margin-bottom: 15px;
}

ul {
    margin-bottom: 15px;
    padding-left: 20px;
}

li {
    margin-bottom: 8px;
}

strong {
    font-weight: bold;
}

code {
    font-family: 'Consolas', 'Courier New', monospace;
    background-color: #e9ecef;
    padding: 2px 5px;
    border-radius: 4px;
    font-size: 0.9em;
}

pre {
    background-color: #e9ecef;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-word;
    margin-bottom: 20px;
}

.method {
    font-weight: bold;
    text-transform: uppercase;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.8em;
}

.get {
    background-color: #28a745;
}

.post {
    background-color: #007bff;
}

.delete {
    background-color: #dc3545;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

th,
td {
    border: 1px solid #dee2e6;
    padding: 10px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
    font-weight: bold;
}

a {
    color: #007bff;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

    </style>
  </head>
  <body>
    <div class="container">
      <aside class="sidebar">
        <div class="sidebar-title">JobNetra Api</div>
        <ul class="sidebar-nav">
          <li><a href="#endpoint">Endpoint</a></li>
          <li><a href="#register">Register</a></li>
          <li><a href="#login">Login</a></li>
          <li><a href="#logout">Logout</a></li>
          <li><a href="#me">Get Authenticated User (Me)</a></li>
          <li><a href="#reset-password">Reset Password (Email Link)</a></li>
          <li>
            <a href="#new-password">Set New Password (from Email Link)</a>
          </li>
          <li>
            <a href="#change-password">Change Password (Authenticated User)</a>
          </li>
          <li><a href="#predict-skill">Predict Skill</a></li>
        </ul>
      </aside>
      <main class="main-content">
        <section id="decoding-story">
          <h1>JobNetra Api</h1>
          <p>
            api ini adalah bagian dari aplikasi JobNetra yang digunakan untuk
            mengelola pengguna, otentikasi, dan prediksi keterampilan.
          </p>
        </section>

        <section id="endpoint">
          <h2>Endpoint</h2>
          <p>
            <a href="https://your-api-domain.com/v1"
              >https://your-api-domain.com/v1</a
            >
          </p>
        </section>

        <section id="register">
          <h2>Register</h2>
          <ul>
            <li><strong>URL:</strong> <code>/register</code></li>
            <li>
              <strong>Method:</strong> <span class="method post">POST</span>
            </li>
            <li>
              <strong>Request Body:</strong>
              <ul>
                <li><code>name</code> as <code>string</code></li>
                <li>
                  <code>email</code> as <code>string</code>, must be unique
                </li>
                <li>
                  <code>password</code> as <code>string</code>, must be at least
                  8 characters
                </li>
                <li>
                  <code>password_confirmation</code> as <code>string</code>,
                  must be at least 8 characters
                </li>
                <li>
                  <code>device_name</code> as <code>string</code>, sesuaikan
                  dengna perangkat yang digunakan
                </li>
              </ul>
            </li>
            <li>
              <strong>Response:</strong>
              <pre><code class="language-json">
                {
                    "massage": "User created successfully",
                    "user": {
                        "name": "John Doe",
                        "email": "johndeo@email.com",
                        "updated_at": "2025-06-05T12:46:47.000000Z",
                        "created_at": "2025-06-05T12:46:47.000000Z",
                        "id": 3
                    }
                }
      </code></pre>
            </li>
          </ul>
        </section>

        <section id="login">
          <h2>Login</h2>
          <ul>
            <li><strong>URL:</strong> <code>/login</code></li>
            <li>
              <strong>Method:</strong> <span class="method post">POST</span>
            </li>
            <li>
              <strong>Request Body:</strong>
              <ul>
                <li><code>email</code> as <code>string</code></li>
                <li><code>password</code> as <code>string</code></li>
                <li>
                  <code>device_name</code> as <code>string</code>, sesuaikan
                  dengna perangkat yang digunakan
                </li>
              </ul>
            </li>
            <li>
              <strong>Response:</strong>
              <pre><code class="language-json">
                {
                    "token": "5|u4cVRYhfhRXhbxUBMXAuHXYTsq7B9pP4xDpz6fhZ5afc9369",
                    "user": {
                        "id": 2,
                        "name": "John Doe",
                        "email": "admin@email.com",
                        "email_verified_at": null,
                        "created_at": "2025-05-29T14:23:05.000000Z",
                        "updated_at": "2025-06-05T09:15:51.000000Z"
                    }
                }
      </code></pre>
            </li>
          </ul>
        </section>

        <section id="logout">
          <h2>Logout</h2>
          <ul>
            <li><strong>URL:</strong> <code>/logout</code></li>
            <li>
              <strong>Method:</strong> <span class="method delete">DELETE</span>
            </li>
            <li>
              <strong>Headers:</strong>
              <code>Authorization: Bearer YOUR_AUTH_TOKEN</code>
            </li>
            <li>
              <strong>Response:</strong>
              <pre><code class="language-json">
      {
        "error": false,
        "message": "Successfully logged out"
      }
      </code></pre>
            </li>
          </ul>
        </section>

        <section id="me">
          <h2>Get Authenticated User (Me)</h2>
          <ul>
            <li><strong>URL:</strong> <code>/me</code></li>
            <li>
              <strong>Method:</strong> <span class="method get">GET</span>
            </li>
            <li>
              <strong>Headers:</strong>
              <code>Authorization: Bearer YOUR_AUTH_TOKEN</code>
            </li>
            <li>
              <strong>Response:</strong>
              <pre><code class="language-json">
                {
                    "message": "User retrieved successfully",
                    "data": {
                        "id": 2,
                        "name": "John Doe",
                        "email": "admin@email.com",
                        "email_verified_at": null,
                        "created_at": "2025-05-29T14:23:05.000000Z",
                        "updated_at": "2025-06-05T09:15:51.000000Z"
                    }
                }
      </code></pre>
            </li>
          </ul>
        </section>

        <section id="reset-password">
          <h2>Reset Password (Email Link)</h2>
          <ul>
            <li><strong>URL:</strong> <code>/resetPassword</code></li>
            <li>
              <strong>Method:</strong> <span class="method post">POST</span>
            </li>
            <li>
              <strong>Request Body:</strong>
              <ul>
                <li>
                  <code>email</code> as <code>string</code> - The email of the
                  user who forgot their password.
                </li>
              </ul>
            </li>
            <li>
              <strong>Response:</strong>
              <pre><code class="language-json">
      {
        "error": false,
        "message": "Password reset link sent to your email."
      }
      </code></pre>
            </li>
          </ul>
        </section>

        <section id="new-password">
          <h2>Set New Password (from Email Link)</h2>
          <ul>
            <li><strong>URL:</strong> <code>/NewPassword</code></li>
            <li>
              <strong>Method:</strong> <span class="method post">POST</span>
            </li>
            <li>
              <strong>Request Body:</strong>
              <ul>
                <li>
                  <code>token</code> as <code>string</code> - The token received
                  in the password reset email.
                </li>
                <li>
                  <code>email</code> as <code>string</code> - The email of the
                  user.
                </li>
                <li>
                  <code>password</code> as <code>string</code> - The new
                  password (at least 8 characters).
                </li>
                <li>
                  <code>password_confirmation</code> as <code>string</code> -
                  Confirmation of the new password.
                </li>
              </ul>
            </li>
            <li>
              <strong>Response:</strong>
              <pre><code class="language-json">
      {
        "error": false,
        "message": "Password has been reset successfully."
      }
      </code></pre>
            </li>
          </ul>
        </section>

        <section id="change-password">
          <h2>Change Password (Authenticated User)</h2>
          <ul>
            <li><strong>URL:</strong> <code>/changepassword</code></li>
            <li>
              <strong>Method:</strong> <span class="method post">patch</span>
            </li>
            <li>
              <strong>Headers:</strong>
              <code>Authorization: Bearer YOUR_AUTH_TOKEN</code>
            </li>
            <li>
              <strong>Request Body:</strong>
              <ul>
                <li>
                  <code>current_password</code> as <code>string</code> - The
                  user's current password.
                </li>
                <li>
                  <code>new_password</code> as <code>string</code> - The new
                  password (at least 8 characters).
                </li>
                <li>
                  <code>new_password_confirmation</code> as
                  <code>string</code> - Confirmation of the new password.
                </li>
              </ul>
            </li>
            <li>
              <strong>Response:</strong>
              <pre><code class="language-json">
      {
        "error": false,
        "message": "Password changed successfully."
      }
      </code></pre>
            </li>
          </ul>
        </section>

        <section id="predict-skill">
          <h2>Predict Skill</h2>
          <ul>
            <li><strong>URL:</strong> <code>/predict</code></li>
            <li>
              <strong>Method:</strong> <span class="method post">POST</span>
            </li>
            <li>
              <strong>Headers:</strong>
              <code>Authorization: Bearer YOUR_AUTH_TOKEN</code>
            </li>
            <li>
              <strong>Request Body:</strong>
              <p>
                The specific structure of the request body for prediction needs
                to be defined based on your `PredictionController`'s `predict`
                method. Please replace `...` with the actual expected fields.
              </p>
              <pre><code class="language-json">
      {
        "input_skills": "...",
      }
              </code></pre>
            </li>
            <li>
              <strong>Response:</strong>
              <p>
                The specific structure of the response for prediction needs to
                be defined based on your `PredictionController`'s `predict`
                method. Please replace `...` with the actual expected fields.
              </p>
              <pre><code class="language-json">
                {
                    "message": "Prediction successful",
                    "data": {
                        "input_skills": "backend, frontend, mysql, php, java script",
                        "top_predictions": [
                            {
                                "label": "Registered Nurse",
                                "probability": 0.00721309008076787
                            },
                            {
                                "label": "Nurse Manager",
                                "probability": 0.007026528939604759
                            },
                            {
                                "label": "Family Nurse Practitioner",
                                "probability": 0.006960407830774784
                            }
                        ]
                    }
                }
              </code></pre>
            </li>
          </ul>
        </section>
      </main>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-json.min.js"></script>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css"
    />
  </body>
</html>
