import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { IRecord } from "../../types";
import RecordList from ".";

const meta = {
  title: "Components/RecordList",
  component: RecordList,
  parameters: {
    layout: "centered",
  },
  args: {
    onClick: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RecordList>;

export default meta;
type Story = StoryObj<typeof RecordList>;

// Sample card data
const baseCard: IRecord = {
  activityLog: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  listId: "sdfs",
  assignedTo: "",
  id: "1",
  title: "Complete project documentation",
  description:
    "Write comprehensive documentation for the new feature including API references and user guides",
  done: false,
  priority: "high",
  labels: [],
  dueDate: "2026-02-15",
  checklists: [
    { id: "1", title: "API Reference", completed: true },
    { id: "2", title: "User Guide", completed: false },
    { id: "3", title: "Examples", completed: false },
  ],
  comments: [
    { id: "1", text: "Great progress so far!", author: "John" },
    { id: "2", text: "Need to review the API section", author: "Jane" },
  ],
  attachments: [],
};

// Default story
export const Default: Story = {
  args: {
    card: baseCard,
    onDoneToggle: (done: boolean) => console.log("Done toggled:", done),
    onClick: () => console.log("Card clicked"),
  },
};

// Completed card
export const Completed: Story = {
  args: {
    card: {
      ...baseCard,
      done: true,
    },
    onDoneToggle: (done: boolean) => console.log("Done toggled:", done),
    onClick: () => console.log("Card clicked"),
  },
};

// High priority
export const HighPriority: Story = {
  args: {
    card: {
      ...baseCard,
      priority: "high",
    },
  },
};

// Low priority
export const LowPriority: Story = {
  args: {
    card: {
      ...baseCard,
      priority: "low",
      title: "Update README file",
    },
  },
};

// Medium priority (no badge shown)
export const MediumPriority: Story = {
  args: {
    card: {
      ...baseCard,
      priority: "medium",
      title: "Review pull requests",
    },
  },
};

// Minimal card
export const MinimalCard: Story = {
  args: {
    card: {
      ...baseCard,

      id: "2",
      title: "Simple task without extras",
      description: "",
      done: false,
      priority: "medium",
      labels: [],
      dueDate: "",
      checklists: [],
      comments: [],
      attachments: [],
    },
  },
};

// Card with many labels
// export const ManyLabels: Story = {
//   args: {
//     card: {
//       ...baseCard,
//       labels: [],
//     },
//   },
// };

// Card without description
export const NoDescription: Story = {
  args: {
    card: {
      ...baseCard,
      description: "",
    },
  },
};

// Card with long title
export const LongTitle: Story = {
  args: {
    card: {
      ...baseCard,
      title:
        "This is a very long title that demonstrates how the card handles extended text content that might wrap to multiple lines",
    },
  },
};

// Card with all checklist items completed
export const AllChecklistsCompleted: Story = {
  args: {
    card: {
      ...baseCard,
      checklists: [
        { id: "1", title: "Task 1", completed: true },
        { id: "2", title: "Task 2", completed: true },
        { id: "3", title: "Task 3", completed: true },
      ],
    },
  },
};

// Overdue card
export const OverdueCard: Story = {
  args: {
    card: {
      ...baseCard,
      dueDate: "2026-01-20",
      priority: "high",
    },
  },
};

// Card with multiple attachments
export const MultipleAttachments: Story = {
  args: {
    card: {
      ...baseCard,
      attachments: [],
    },
  },
};

// // Interactive demo with multiple cards
export const MultipleCards: Story = {
  render: () => (
    <div className="space-y-3 max-w-md">
      <RecordList
        card={{ ...baseCard, id: "1", title: "First task", priority: "high" }}
        onDoneToggle={(done: boolean) => console.log("Card 1 done:", done)}
        onClick={() => console.log("Card 1 clicked")}
      />
      <RecordList
        card={{
          ...baseCard,
          id: "2",
          title: "Second task",
          priority: "medium",
          done: true,
        }}
        onDoneToggle={(done: boolean) => console.log("Card 2 done:", done)}
        onClick={() => console.log("Card 2 clicked")}
      />
      <RecordList
        card={{
          ...baseCard,
          id: "3",
          title: "Third task",
          priority: "low",
          labels: [],
        }}
        onDoneToggle={(done: boolean) => console.log("Card 3 done:", done)}
        onClick={() => console.log("Card 3 clicked")}
      />
    </div>
  ),
};
