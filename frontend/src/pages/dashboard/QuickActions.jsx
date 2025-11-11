import React from "react";
import { Card } from "react-bootstrap";
import { Plus, Video, MessageSquare } from "lucide-react";

export default function QuickActions({
  onStartMeeting,
  onJoinMeeting,
  onOpenChat,
}) {
  const actions = [
    {
      id: 1,
      title: "Start New Meeting",
      subtitle: "Create instant meeting",
      icon: <Plus size={24} className="text-primary" />,
      bg: "bg-primary-subtle",
      onClick: onStartMeeting,
    },
    {
      id: 2,
      title: "Join Meeting",
      subtitle: "Enter meeting code",
      icon: <Video size={24} className="text-success" />,
      bg: "bg-success-subtle",
      onClick: onJoinMeeting,
    },
    {
      id: 3,
      title: "Open Chat",
      subtitle: "View all messages",
      icon: <MessageSquare size={24} className="text-info" />,
      bg: "bg-info-subtle",
      onClick: onOpenChat,
    },
  ];

  return (
    <div className="row g-4 mb-4">
      {actions.map((action) => (
        <div className="col-md-4" key={action.id}>
          <Card
            onClick={action.onClick}
            className="h-100 shadow-sm hover-shadow cursor-pointer"
          >
            <Card.Body className="d-flex align-items-center gap-3">
              <div className={`${action.bg} p-3 rounded`}>{action.icon}</div>
              <div>
                <h6 className="mb-1">{action.title}</h6>
                <p className="text-muted small mb-0">{action.subtitle}</p>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}
