import express from "express";
import authRoutes from "./presentation/routes/authRoutes";
import tutorRoutes from "./presentation/routes/tutorRoutes";
import appointmentRoutes from "./presentation/routes/appointmentRoutes";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tutors", tutorRoutes);
app.use("/api/appointments", appointmentRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send(`
        <html>
            <head>
                <title>Tutor Appointment Booking API</title>
                <style>
                    body {
                        font-family: Arial;
                        padding: 20px;
                        background-color: #f5f5f5;
                    }
                    h1 {
                        color: #2c3e50;
                    }
                    ul {
                        background: white;
                        padding: 15px;
                        border-radius: 8px;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    }
                    li {
                        margin: 8px 0;
                    }
                </style>
            </head>
            <body>
                <h1>Tutor Appointment Booking API</h1>
                <p>Server is running successfully.</p>

                <h3>Available Endpoints:</h3>
                <ul>
                    <li><b>POST</b> /api/auth/register</li>
                    <li><b>POST</b> /api/auth/login</li>
                    <li><b>GET</b> /api/tutors</li>
                    <li><b>GET</b> /api/tutors/secure</li>
                    <li><b>POST</b> /api/appointments</li>
                    <li><b>GET</b> /api/appointments</li>
                    <li><b>GET</b> /api/appointments/my</li>
                    <li><b>PATCH</b> /api/appointments/:id/approve</li>
                    <li><b>PATCH</b> /api/appointments/:id/decline</li>
                    <li><b>PATCH</b> /api/appointments/:id/edit</li>
                </ul>

                <p>Use Postman to test the API.</p>
            </body>
        </html>
    `);
});

export default app;
