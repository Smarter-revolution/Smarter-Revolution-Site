# Team Event Type Setup for Combined Bookings (Cal.com)

## Current Setup (Using Cal.com Team Plan)

### Team Event Type Configuration
- **Event Type ID:** `4588541`
- **URL Slug:** `combined-booking-wolf-mark`
- **Event Name:** Combined Booking Wolf & Mark
- **Type:** Collective (shows only times when ALL hosts are available)
- **Duration:** 45 minutes
- **Hosts:** Wolf Krammel + Mark Alouf
- **Cal.com URL:** https://app.cal.com/event-types/4588541

### How It Works
1. **Both hosts receive notifications automatically** - Cal.com Team feature handles this natively
2. **Both hosts are added to calendar invite** - No manual intervention needed
3. **Availability checking** - Only shows times when BOTH Wolf and Mark are free
4. **ActiveCampaign sync** - Website automatically syncs contact with tags `booking`, `booking-combined`, `booking-wolf`, `booking-mark`
5. **Make.com webhook** - Still fires as backup notification (optional)

### Environment Variables
```bash
# Cal.com API Keys
CAL_API_KEY=cal_live_2ad40f9177163702e5bd200ebbce2502  # Wolf's API key
CAL_API_KEY_MARK=cal_live_74eba6cee134394712dcf70d3f5352e4  # Mark's API key
CAL_TEAM_SLUG=smarter-revolution

# Make.com Webhook (optional backup)
N8N_BOOKING_WEBHOOK_URL=https://hook.eu1.make.com/aklkp9c4ct3r7bryui1f1olb0kctitk5
```

### Website Configuration
File: `lib/calBookingConfig.ts`

```typescript
{
  slug: "discovery-wolf-mark",
  calEventTypeSlug: "combined-booking-wolf-mark",
  eventTypeId: 4588541,
  title: "Discovery Call with Wolf & Mark",
  durationMinutes: 45,
  hostUsername: "wolfkrammel",
  hostUsernames: ["wolfkrammel", "mark314"],
  // Team event handles availability automatically
}
```

### Booking Flow
1. User visits `/book/discovery-wolf-mark`
2. Website fetches combined availability from Cal.com Team Event
3. User selects time and fills booking form
4. Website creates booking via Cal.com API
5. **Cal.com automatically:**
   - Sends email to Wolf ✅
   - Sends email to Mark ✅
   - Adds both to calendar invite ✅
6. **Website automatically:**
   - Syncs contact to ActiveCampaign ✅
   - Sends webhook to Make.com (optional) ✅

### Other Event Types (Unchanged)
- **Virtual Coffee with Wolf** - Only Wolf receives notifications
- **Virtual Coffee with Mark** - Only Mark receives notifications
- **AI Video Discovery** - Only Wolf receives notifications
- **All single-host events** - Work as before

### ActiveCampaign Integration
**Still works for ALL bookings** - Handled in `app/api/cal/book/route.ts`:
- Single-host bookings → Tagged with host name
- Combined bookings → Tagged with both hosts + "booking-combined"

---

## Optional: Make.com Backup Notification

### Purpose (Now Optional)
With Team Event Type, Make.com is no longer required since Cal.com handles notifications.
However, you can keep it as:
- Backup notification system
- Custom notification formatting
- Integration with other tools (Slack, CRM, etc.)

### Make.com Setup (If Desired)
1. Webhook URL already configured: `https://hook.eu1.make.com/aklkp9c4ct3r7bryul1f1olb0kctitk5`
2. Receives payload for ALL bookings (not just combined)
3. Add filter if you only want combined meeting notifications:
   - Condition: `combinedMeeting` equals `true`

### Payload Structure
```json
{
  "booking": { "id": 123, "uid": "abc", "startTime": "...", "endTime": "..." },
  "responses": { "name": "...", "email": "...", "company": "..." },
  "eventTypeSlug": "discovery-wolf-mark",
  "combinedMeeting": true,
  "primaryHost": "wolfkrammel",
  "secondaryHosts": ["mark314"],
  "allHosts": ["wolfkrammel", "mark314"],
  "activeCampaignResult": { "success": true, "contactId": "..." }
}
```

