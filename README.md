# Nia Auto — inventory management

Vue 3 + Vite + Express + MongoDB. Uzbek interface, desktop and mobile, three filials, Kuzof / Motor xodovoy, admin / superadmin, receiving, sales, stock transfer, inventory history, camera and USB scanner, and A4 QR labels.

## Before running (Windows 11)

1. Install **Node.js 20+** and **MongoDB Community Server**. Start the MongoDB service.
2. In `backend`, copy `.env.example` to `.env` and replace `JWT_SECRET` with a random string of **at least 24 characters**. You can generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
3. In `backend`, run `npm install` and `npm run setup`. **Save the temporary superadmin password shown once in the terminal.** The first login requires a password change.
4. In `frontend`, run `npm install`.
5. Run `START_NIA_AUTO.bat`, or start `npm run dev` in both backend and frontend terminals.
6. Open **http://localhost:5173** on the PC.

## Phones / LAN link in terminal

The Vite terminal prints a real LAN URL automatically, for example:

`http://192.168.1.20:5173`

This is **not** `localhost` on the phone. Both devices must be on the same Wi-Fi and Windows Firewall must allow Node.js on private networks. The LAN address can change when the computer reconnects. The Express API is accessed through the Vite `/api` proxy, so you do not need a separate phone backend URL.

**Important camera limitation:** mobile browsers normally block camera access on plain `http://192.168.x.x` even though the UI works. To use the phone camera, expose the frontend over trusted **HTTPS** (e.g. Cloudflare Tunnel / ngrok HTTPS forwarding to `http://localhost:5173`, or a properly trusted LAN HTTPS certificate). A self-signed certificate that the phone does not trust may not work. USB HID scanner and manual code entry work on HTTP.

## Sticker PDF

A4 portrait, exactly **40 × 30 mm**, 5 columns × 9 rows, **zero spacing**, 45 labels per sheet. Thin shared cutting borders. QR + product name below, faint vertical NIA AUTO on left. QR holds a stable internal product code. In print settings choose **Actual size / 100%**, not Fit to page. Standard PDF fonts have limited Unicode support: names with non-Latin characters may show `?` in this initial build; a future embedded Unicode font will address this. Test with a ruler and phone scanner before large print runs.

## Permissions

All admins may view and update all three filials. Superadmin can create, disable, and reset admin passwords. Existing passwords cannot be viewed (secure hashes). Admin password resets require the admin to change their password on next login. Product prices are not collected.

## Database

Single MongoDB database `nia_auto`, with **logically separated inventory** by filial and branch and one shared product catalog. Filial quantities are separate; QR codes identify product types, not locations. This is intentionally one database, not three physical databases. A future change can use multiple databases in the same MongoDB cluster if strictly required.

## Transfer caveat

Stock transfers are transactional and **require MongoDB replica-set mode** (including a single-node replica set). On a standalone MongoDB server, receiving/selling work but transfers return a clear error. For local replica-set setup, follow official MongoDB instructions (`replication.replSetName: rs0`, restart service, then `mongosh` → `rs.initiate()`). Do not enable replica-set settings on a production database without a backup and migration plan.

## Production checklist

This is a development starter, **not production hardened**. Before real deployment: use HTTPS for frontend and API, restrict CORS to the actual origin, deploy with backups, use MongoDB replica-set transactions for stock and movement logging together, add robust validation and audit trails for every change, add pagination and data exports, confirm security and rate limiting, and test multi-admin concurrent transactions. Keep the API/database private, and do not expose MongoDB directly to the Internet.
