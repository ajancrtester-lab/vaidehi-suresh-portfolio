# 🌱 Database Seeding Instructions

## Quick Command

```bash
cd /app/backend
python seed_northflank_database.py
```

## What You'll Need

Before running the script, get your **Northflank MongoDB credentials**:

1. **Login to Northflank Dashboard**
2. **Navigate to:** Your Project → Addons (or Services)
3. **Click:** Your MongoDB addon/service
4. **Find:** Connection Details or Environment Variables section
5. **Copy:**
   - `MONGO_URL` - Full connection string (looks like: `mongodb+srv://user:pass@cluster.mongodb.net/...`)
   - `DB_NAME` - Database name (usually: `portfolio_db`)

## Step-by-Step Script Execution

```bash
# 1. Navigate to backend directory
cd /app/backend

# 2. Run the seed script
python seed_northflank_database.py
```

## Script Prompts & Responses

### Prompt 1: MongoDB URL
```
Enter Northflank MONGO_URL: 
```
**Paste your full connection string here**

### Prompt 2: Database Name
```
Enter DB_NAME (press Enter for 'portfolio_db'):
```
**Type:** `portfolio_db` (or press Enter for default)

### Prompt 3: Confirmation
```
Proceed with seeding? (yes/no):
```
**Type:** `yes`

### Prompt 4: Clear Existing Data (if any exists)
```
⚠️  Clear existing data? (yes/no):
```
**Type:** `yes` (to replace old data) or `no` (to keep existing and add new)

## Expected Output

```
============================================================
NORTHFLANK MONGODB SEEDING SCRIPT
============================================================

🔗 Connecting to MongoDB...
✅ Connected successfully!

📊 Checking existing performance gallery items...
Found 0 existing items

📥 Inserting 5 performance gallery items...
✅ Inserted 5 items successfully!

✅ Total items in database: 5

📸 Sample items:
  - Sree Krishna Leela (Order: 1)
  - Temple Festival Performance (Order: 2)
  - Margam Recital (Order: 3)

🎉 Database seeding complete!
```

## After Seeding

Test your live backend API:
```bash
curl https://p01-vaidehi-suresh-portfolio--wmu42ekx5d.code.run/api/performance-gallery
```

**You should see:** 5 performance gallery items in JSON format (not an empty array)

## Troubleshooting

### ❌ "No module named 'motor'"
**Solution:** Make sure you're in `/app/backend` directory before running

### ❌ Connection timeout or authentication failed
**Solution:** 
- Verify MONGO_URL is correct (check for typos)
- Ensure MongoDB addon is running in Northflank
- Check network/firewall settings allow external connections

### ❌ "Database connection refused"
**Solution:** 
- Verify Northflank MongoDB service is running (not paused)
- Check if IP whitelist is enabled (should allow all IPs or your current IP)

---

## Alternative: Seed Local Database (for testing)

If you want to test the script against your local Emergent MongoDB first:

```bash
cd /app/backend

# Check local .env file
cat .env | grep MONGO_URL

# Run script and use the local MONGO_URL from .env
python seed_northflank_database.py
```
