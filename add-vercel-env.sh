#!/bin/bash
# =============================================================================
# Add environment variables to Vercel
# =============================================================================
# Run this script after installing Vercel CLI: npm i -g vercel
#
# SECURITY NOTE: Never commit actual secret values to this file.
# Get the actual values from your secure password manager or team lead.
# =============================================================================

echo "Adding environment variables to Vercel..."
echo "You will be prompted to enter each value securely."
echo ""

# Admin secret for protected API endpoints
echo "Adding ADMIN_SECRET..."
vercel env add ADMIN_SECRET production preview development
# Generate with: openssl rand -hex 32

# Cal.com API keys
echo "Adding CAL_API_KEY..."
vercel env add CAL_API_KEY production preview development

echo "Adding CAL_API_KEY_MARK..."
vercel env add CAL_API_KEY_MARK production preview development

echo "Adding CAL_TEAM_SLUG..."
vercel env add CAL_TEAM_SLUG production preview development

# Webhook URLs
echo "Adding N8N_BOOKING_WEBHOOK_URL..."
vercel env add N8N_BOOKING_WEBHOOK_URL production preview development

echo "Adding LEAD_WEBHOOK_URL..."
vercel env add LEAD_WEBHOOK_URL production preview development

# ActiveCampaign
echo "Adding ACTIVECAMPAIGN_API_URL..."
vercel env add ACTIVECAMPAIGN_API_URL production preview development

echo "Adding ACTIVECAMPAIGN_API_KEY..."
vercel env add ACTIVECAMPAIGN_API_KEY production preview development

echo "Adding ACTIVECAMPAIGN_LIST_ID..."
vercel env add ACTIVECAMPAIGN_LIST_ID production preview development

# Strapi CMS
echo "Adding STRAPI_API_TOKEN..."
vercel env add STRAPI_API_TOKEN production preview development

echo "Adding STRAPI_WEBHOOK_SECRET..."
vercel env add STRAPI_WEBHOOK_SECRET production preview development

# Anthropic
echo "Adding ANTHROPIC_API_KEY..."
vercel env add ANTHROPIC_API_KEY production preview development

echo ""
echo "Done! Environment variables added to Vercel."
echo "Now redeploy your site for changes to take effect: vercel --prod"
