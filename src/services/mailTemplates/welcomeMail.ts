export const welcomeMailOptions = (email: string, name: string) => ({
    from: `"Book Your Seat" <${process.env.NEXT_PUBLIC_EMAIL}>`,
    to: email,
    subject: 'Welcome to Book Your Seat',
    html: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Book Your Seat</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
      
      :root {
        --primary: #6366f1;
        --primary-dark: #4f46e5;
        --secondary: #ec4899;
        --dark: #1e293b;
        --light: #f8fafc;
        --gray: #64748b;
      }
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Poppins', sans-serif;
        background-color: #f1f5f9;
        color: var(--dark);
        line-height: 1.6;
      }
      
      .container {
        max-width: 600px;
        margin: 30px auto;
        background: var(--light);
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      }
      
      .header {
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        padding: 30px 20px;
        text-align: center;
        position: relative;
        overflow: hidden;
      }
      
      .header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('https://i.imgur.com/2yXzLxP.png');
        background-size: cover;
        opacity: 0.1;
        mix-blend-mode: overlay;
      }
      
      .logo {
        margin-bottom: 15px;
      }
      
      .logo img {
        height: 50px;
        width: auto;
      }
      
      .header h1 {
        color: white;
        font-size: 26px;
        font-weight: 700;
        letter-spacing: 1px;
        margin: 0;
        text-transform: uppercase;
      }
      
      .header p {
        color: rgba(255, 255, 255, 0.9);
        font-size: 14px;
        margin-top: 5px;
      }
      
      .content {
        padding: 40px 30px;
      }
      
      .greeting {
        display: flex;
        align-items: center;
        margin-bottom: 25px;
      }
      
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        font-weight: 600;
        margin-right: 15px;
      }
      
      .greeting-text h2 {
        font-size: 20px;
        font-weight: 600;
        color: var(--dark);
        margin: 0;
      }
      
      .greeting-text p {
        font-size: 14px;
        color: var(--gray);
        margin: 0;
      }
      
      .message {
        margin-bottom: 30px;
      }
      
      .message p {
        font-size: 15px;
        color: var(--dark);
        margin-bottom: 15px;
      }
      
      .message strong {
        color: var(--primary);
        font-weight: 600;
      }
      
      .ticket-card {
        background: var(--dark);
        background-image: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1));
        border-radius: 12px;
        padding: 25px;
        margin: 30px 0;
        position: relative;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .ticket-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('https://i.imgur.com/8kMKh1A.png');
        background-size: cover;
        opacity: 0.05;
        mix-blend-mode: overlay;
      }
      
      .ticket-card .icon {
        font-size: 24px;
        color: var(--primary);
        margin-bottom: 15px;
      }
      
      .ticket-card h3 {
        font-size: 18px;
        font-weight: 600;
        color: white;
        margin-bottom: 10px;
      }
      
      .ticket-card p {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 15px;
      }
      
      .ticket-benefits {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 15px;
      }
      
      .benefit {
        background: rgba(255, 255, 255, 0.1);
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 12px;
        color: white;
      }
      
      .cta-button {
        display: inline-block;
        padding: 14px 30px;
        background: linear-gradient(to right, var(--primary), var(--primary-dark));
        color: white;
        text-decoration: none;
        border-radius: 30px;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-align: center;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(79, 70, 229, 0.3);
      }
      
      .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 7px 20px rgba(79, 70, 229, 0.4);
      }
      
      .features {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        margin: 30px 0;
      }
      
      .feature {
        background: white;
        border-radius: 10px;
        padding: 15px;
        text-align: center;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
        border: 1px solid rgba(0, 0, 0, 0.05);
        transition: transform 0.3s ease;
      }
      
      .feature:hover {
        transform: translateY(-3px);
      }
      
      .feature-icon {
        font-size: 24px;
        color: var(--primary);
        margin-bottom: 10px;
      }
      
      .feature h4 {
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 5px;
      }
      
      .feature p {
        font-size: 13px;
        color: var(--gray);
      }
      
      .social-links {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin: 30px 0 15px;
      }
      
      .social-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        background: #f1f5f9;
        border-radius: 50%;
        color: var(--gray);
        font-size: 16px;
        transition: all 0.3s ease;
      }
      
      .social-link:hover {
        background: var(--primary);
        color: white;
        transform: translateY(-3px);
      }
      
      .footer {
        background-color: #f1f5f9;
        padding: 20px;
        text-align: center;
        border-top: 1px solid rgba(0, 0, 0, 0.05);
      }
      
      .footer p {
        font-size: 12px;
        color: var(--gray);
        margin-bottom: 10px;
      }
      
      .footer a {
        color: var(--primary);
        text-decoration: none;
      }
      
      .unsubscribe {
        font-size: 11px;
        color: var(--gray);
      }
      
      @media screen and (max-width: 500px) {
        .container {
          margin: 15px;
        }
        
        .content {
          padding: 30px 20px;
        }
        
        .features {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.82 22H4.18C2.97602 22 2 21.024 2 19.82V4.18C2 2.97602 2.97602 2 4.18 2H19.82C21.024 2 22 2.97602 22 4.18V19.82C22 21.024 21.024 22 19.82 22Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 8.5V15.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17 8.5V15.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12H22" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.5 22V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16.5 22V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h1>Book Your Seat</h1>
        <p>Your premier movie booking platform</p>
      </div>
      
      <div class="content">
        <div class="greeting">
          <div class="greeting-text">
            <h2>Welcome, ${name}!</h2>
            <p>Your cinematic journey begins today</p>
          </div>
        </div>
        
        <div class="message">
          <p>We're thrilled to have you join the <strong>Book Your Seat</strong> community. Get ready for an enhanced movie-watching experience with premium seats, exclusive screenings, and special offers.</p>
          <p>Your account is now active and ready to use. Start browsing the latest releases and book your first cinema experience!</p>
        </div>
        
        <div class="ticket-card">
          <div class="icon">🎟️</div>
          <h3>Your VIP Pass is Active</h3>
          <p>Enjoy these exclusive benefits as a new member:</p>
          <div class="ticket-benefits">
            <span class="benefit">10% Off First Booking</span>
            <span class="benefit">Priority Seating</span>
            <span class="benefit">Free Popcorn</span>
            <span class="benefit">No Booking Fees</span>
          </div>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://bookyourseat.vercel.app" class="cta-button">Start Booking Now</a>
        </div>
        
        <div class="features">
          <div class="feature">
            <div class="feature-icon">🎬</div>
            <h4>Latest Releases</h4>
            <p>Access to all new movies</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🍿</div>
            <h4>Concession Deals</h4>
            <p>Special combos & discounts</p>
          </div>
          <div class="feature">
            <div class="feature-icon">📱</div>
            <h4>Mobile Tickets</h4>
            <p>Paperless entry system</p>
          </div>
          <div class="feature">
            <div class="feature-icon">⭐</div>
            <h4>Loyalty Program</h4>
            <p>Earn points with every booking</p>
          </div>
        </div>
      
      <div class="footer">
        <p>&copy; 2025 Book Your Seat. All rights reserved.</p>
        <p><a href="#">Terms of Service</a> · <a href="#">Privacy Policy</a></p>
        <p class="unsubscribe">If you no longer wish to receive these emails, <a href="#">unsubscribe here</a></p>
      </div>
    </div>
  </body>
  </html>`
  });