"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = require("http");
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
// Public Routes Imports
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
// Admin Routes Imports
const auth_routes_2 = __importDefault(require("./routes/admin/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/admin/user.routes"));
const settings_routes_1 = __importDefault(require("./routes/admin/settings.routes"));
const treatment_routes_1 = __importDefault(require("./routes/admin/treatment.routes"));
const doctor_routes_1 = __importDefault(require("./routes/admin/doctor.routes"));
const appointment_routes_1 = __importDefault(require("./routes/admin/appointment.routes"));
const analytics_routes_1 = __importDefault(require("./routes/admin/analytics.routes"));
// Middleware
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        process.env.FRONTEND_URL,
        process.env.ADMIN_URL
    ].filter(Boolean).map(url => url.replace(/\/$/, '')),
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
// ==========================================
// ROUTES
// ==========================================
// Public
app.use('/api/auth', auth_routes_1.default);
// Admin
app.use('/api/admin/auth', auth_routes_2.default);
app.use('/api/admin/users', user_routes_1.default);
app.use('/api/admin/settings', settings_routes_1.default);
app.use('/api/admin/analytics', analytics_routes_1.default);
// SkinLuxe Specific Admin Routes
app.use('/api/admin/treatments', treatment_routes_1.default);
app.use('/api/admin/doctors', doctor_routes_1.default);
app.use('/api/admin/appointments', appointment_routes_1.default);
// Basic Route
app.get('/', (req, res) => {
    res.json({ message: 'SkinLuxe Aesthetics & Academy API' });
});
const PORT = 5001;
if (process.env.NODE_ENV !== 'production') {
    httpServer.listen(PORT, () => {
        console.log(`SkinLuxe Server running on port ${PORT}`);
    });
}
exports.default = app;
