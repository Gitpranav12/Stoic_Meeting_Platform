// src/data/chatData.js

export const groupChats = [
  {
    id: "team-alpha",
    name: "Team Alpha",
    lastMessage:
      "Great work on the presentation! Great work on the presentation! Great work on the presentation!Great work on the presentation!Great work on the presentation!Great work on the presentation!Great work on the presentation!",
    time: "2h ago",
    unread: 3,
  },
  {
    id: "design-team",
    name: "Design Team",
    lastMessage: "Updated mockups shared",
    time: "4h ago",
    unread: 0,
  },
  {
    id: "all-hands",
    name: "All Hands",
    lastMessage: "Meeting at 3 PM",
    time: "1d ago",
    unread: 1,
  },
];

export const privateChats = [
  {
    id: "sarah",
    name: "Sarah Johnson",
    lastMessage: "Can we reschedule?",
    time: "5m ago",
    unread: 2,
  },
  {
    id: "mike",
    name: "Mike Chen",
    lastMessage: "Thanks for the update!",
    time: "1h ago",
    unread: 1,
  },
  {
    id: "alex",
    name: "Alex Rivera",
    lastMessage: "See you tomorrow",
    time: "3h ago",
    unread: 0,
  },
];

export const chatMessages = {
  // -----------------------------------------
  // TEAM ALPHA
  // -----------------------------------------
  "team-alpha": [
    { id: "ta-1", user: "Sarah Johnson", text: "Hey everyone! Ready for the presentation?", time: "10:00 AM", isOwn: false },
    { id: "ta-2", user: "Mike Chen", text: "Yes, all set! The slides look great.", time: "10:02 AM", isOwn: false },
    { id: "ta-3", user: "You", text: "Thanks! I added the final metrics.", time: "10:05 AM", isOwn: true },

    { id: "ta-4", user: "Sarah Johnson", text: "We should rehearse one more time before the call.", time: "10:07 AM", isOwn: false },
    { id: "ta-5", user: "You", text: "Sure, let’s do it in 10 mins.", time: "10:08 AM", isOwn: true },
  ],

  // -----------------------------------------
  // DESIGN TEAM
  // -----------------------------------------
  "design-team": [
    { id: "dt-1", user: "Alex Rivera", text: "I uploaded the new mockups to Figma.", time: "9:00 AM", isOwn: false },
    { id: "dt-2", user: "You", text: "Great! Checking it now.", time: "9:05 AM", isOwn: true },

    { id: "dt-3", user: "Emily Park", text: "Let me know if the header spacing works for you.", time: "9:10 AM", isOwn: false },
    { id: "dt-4", user: "You", text: "Looks good, maybe reduce padding a bit.", time: "9:12 AM", isOwn: true },

    { id: "dt-5", user: "Alex Rivera", text: "Updated! Refresh and check again.", time: "9:16 AM", isOwn: false },
  ],

  // -----------------------------------------
  // ALL HANDS GROUP
  // -----------------------------------------
  "all-hands": [
    { id: "ah-1", user: "HR Team", text: "Reminder: All-hands meeting at 3 PM.", time: "8:00 AM", isOwn: false },
    { id: "ah-2", user: "You", text: "Got it!", time: "8:05 AM", isOwn: true },

    { id: "ah-3", user: "CEO – Mark", text: "Please prepare any team updates before the meeting.", time: "9:00 AM", isOwn: false },

    { id: "ah-4", user: "You", text: "Will do. Sending our report by noon.", time: "9:10 AM", isOwn: true },

    { id: "ah-5", user: "Finance Team", text: "Slides updated in the shared drive.", time: "11:30 AM", isOwn: false },
  ],

  // -----------------------------------------
  // PRIVATE CHATS (unchanged)
  // -----------------------------------------
  sarah: [
    { id: "s-1", user: "Sarah Johnson", text: "Hi! Do you have a moment?", time: "9:00 AM", isOwn: false },
    { id: "s-2", user: "You", text: "Sure! What's up?", time: "9:02 AM", isOwn: true },
    { id: "s-3", user: "Sarah Johnson", text: "Can we reschedule the meeting?", time: "9:05 AM", isOwn: false },
  ],

  mike: [
    { id: "m-1", user: "Mike Chen", text: "All good here — updated the document.", time: "11:00 AM", isOwn: false },
    { id: "m-2", user: "You", text: "Nice. I'll review it.", time: "11:05 AM", isOwn: true },
  ],

  alex: [
    { id: "a-1", user: "Alex Rivera", text: "See you tomorrow", time: "8:00 AM", isOwn: false },
  ],
};
