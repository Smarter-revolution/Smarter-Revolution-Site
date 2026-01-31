#!/bin/bash
# Add environment variables to Vercel
# Run this script after installing Vercel CLI: npm i -g vercel

echo "Adding environment variables to Vercel..."

# Add Mark's Cal.com API key
vercel env add CAL_API_KEY_MARK production preview development
# When prompted, paste: cal_live_74eba6cee134394712dcf70d3f5352e4

# Add Cal.com Team slug
vercel env add CAL_TEAM_SLUG production preview development
# When prompted, paste: smarter-revolution

# Add Make.com webhook URL
vercel env add N8N_BOOKING_WEBHOOK_URL production preview development
# When prompted, paste: https://hook.eu1.make.com/aklkp9c4ct3r7bryui1f1olb0kctitk5

echo "Done! Environment variables added to Vercel."
echo "Now redeploy your site for changes to take effect."
