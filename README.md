# Table-Starr

Table-Starr helps you and your friends keep track of orders and split the bill easily—perfect for going out to eat or sharing expenses.

## Features

- Track everyone’s orders in one place
- Instantly split the bill (including shared items, tax, tips, etc.)
- Real-time updates for all users
- Works on any device

## Tech Stack

- **Next.js** (React + TypeScript)
- **MongoDB** (for data)
- **Tailwind CSS** (for styles)
- **Pusher** (for real-time updates)

## Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/Victor-starr/Table-Starr.git
   cd Table-Starr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your environment variables**  
   Create a `.env.local` file with your MongoDB and Pusher details.
   ```
   MONGODB_URI=your_mongodb_url
   PUSHER_APP_ID=your_pusher_app_id
   PUSHER_KEY=your_pusher_key
   PUSHER_SECRET=your_pusher_secret
   PUSHER_CLUSTER=your_pusher_cluster
   NEXT_PUBLIC_PUSHER_KEY=your_pusher_key
   NEXT_PUBLIC_PUSHER_CLUSTER=your_pusher_cluster
   ```

4. **Start the app**
   ```bash
   npm run dev
   ```
   Then go to [http://localhost:3000](http://localhost:3000)

## How It Works

1. Create a table and invite your friends (or roommates)
2. Everyone adds what they ordered
3. The app automatically splits the bill and shows what each person owes
4. See updates instantly as people add or change their orders

---

Enjoy your meal and stress-free bill splitting! 😄
