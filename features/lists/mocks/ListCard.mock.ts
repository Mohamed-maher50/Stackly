import { ListColumnProps } from "../components/ListCard";

export const dummyListColumnProps: ListColumnProps = {
  boardId: "board-1",
  isExpanded: true,
  list: {
    id: "list-1",
    title: "Backlog",
    accentColor: "#6366f1",
    archived: false,
    order: 0,
    createdAt: new Date().toISOString(),
    wipLimit: 5,
    cards: [
      {
        id: "card-1",
        title: "Design database schema",
        description: "Create ERD and relations",
        priority: "urgent",
        labels: [{ id: "label-1", name: "Backend", color: "purple" }],
        attachments: [
          {
            id: "att-1",
            name: "schema.png",
            url: "https://example.com/schema.png",
            uploadedAt: new Date().toISOString(),
          },
        ],
        checklists: [
          { id: "chk-1", title: "Tables", completed: true },
          { id: "chk-2", title: "Indexes", completed: false },
        ],
        comments: [
          {
            id: "comment-1",
            user: "salvo",
            text: "This task looks good to start.",
            timestamp: new Date().toISOString(),
            avatar: "https://example.com/avatar1.png",
          },
          {
            id: "comment-2",
            user: "admin",
            text: "Please update the description before moving forward.",
            timestamp: new Date().toISOString(),
          },
        ],
        activityLog: [
          {
            id: "log-1",
            action: "created",
            user: "salvo",
            timestamp: new Date().toISOString(),
            details: "Initial card creation",
          },
        ],
        assignedTo: "salvo",
        done: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  },
};
