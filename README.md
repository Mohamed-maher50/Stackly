# Stackly

A modern, full-stack web application built with Next.js 15, TypeScript, and Prisma.

## 🚀 Features

- **Modern Tech Stack**: Built with the latest Next.js 15 App Router
- **Type Safety**: Full TypeScript implementation for robust development
- **Database Integration**: Prisma ORM for seamless database management
- **UI Components**: Comprehensive component library with Storybook
- **Code Quality**: ESLint, Prettier, and Husky for consistent code standards
- **Testing**: Vitest for unit and integration testing
- **Developer Experience**: Hot reload, TypeScript support, and modern tooling

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: CSS with modern styling solutions
- **UI Development**: [Storybook](https://storybook.js.org/)

### Backend

- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Runtime**: Node.js

### Development Tools

- **Package Manager**: pnpm
- **Code Quality**: ESLint, Prettier
- **Git Hooks**: Husky
- **Commit Standards**: Commitlint
- **Testing**: Vitest
- **Pre-commit**: lint-staged

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version specified in `.nvmrc` (use nvm for easy version management)
- **pnpm**: Latest version
- **Database**: Compatible with your Prisma configuration

## 🚦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Mohamed-maher50/Stackly.git
cd Stackly
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and configure your environment variables:

```env
# Database
DATABASE_URL="your-database-connection-string"

# Add other environment variables as needed
```

### 4. Database Setup

```bash
# Generate Prisma Client
pnpm prisma generate

# Run database migrations
pnpm prisma migrate dev

# (Optional) Seed the database
pnpm prisma db seed
```

### 5. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📜 Available Scripts

### Development

- `pnpm dev` - Start the development server
- `pnpm build` - Build the production application
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests with Vitest

### Storybook

- `pnpm storybook` - Start Storybook development server
- `pnpm build-storybook` - Build Storybook for production

### Database

- `pnpm prisma studio` - Open Prisma Studio
- `pnpm prisma migrate dev` - Create and apply migrations
- `pnpm prisma generate` - Generate Prisma Client

## 📁 Project Structure

```
Stackly/
├── app/                # Next.js App Router pages and layouts
├── components/         # Reusable React components
├── features/          # Feature-based modules
├── hooks/             # Custom React hooks
├── lib/               # Utility libraries and configurations
├── prisma/            # Prisma schema and migrations
├── public/            # Static assets
├── utils/             # Utility functions
├── .husky/            # Git hooks configuration
├── .storybook/        # Storybook configuration
└── .vscode/           # VSCode settings
```

## 🎨 Component Development

This project uses Storybook for component development and documentation. To develop components in isolation:

```bash
pnpm storybook
```

Visit [http://localhost:6006](http://localhost:6006) to view the component library.

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

## 🔧 Code Quality

This project enforces code quality through:

- **ESLint**: Linting rules for consistent code style
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **Commitlint**: Conventional commit message format
- **lint-staged**: Run linters on staged files

Commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
type(scope): subject

[optional body]

[optional footer]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## 🚀 Deployment

### Deploy on Vercel

The easiest way to deploy this Next.js application is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Mohamed-maher50/Stackly)

### Environment Variables

Ensure all required environment variables are configured in your deployment platform:

- `DATABASE_URL`
- Add other production environment variables

### Build Steps

1. Install dependencies: `pnpm install`
2. Generate Prisma Client: `pnpm prisma generate`
3. Build the application: `pnpm build`
4. Start the server: `pnpm start`

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Prisma Documentation](https://www.prisma.io/docs) - Learn about Prisma ORM
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript language reference
- [Storybook Documentation](https://storybook.js.org/docs) - Component development guide

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please ensure your code:

- Follows the existing code style
- Passes all tests
- Includes appropriate documentation
- Uses conventional commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mohamed Maher**

- GitHub: [@Mohamed-maher50](https://github.com/Mohamed-maher50)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Vercel](https://vercel.com/) for hosting and deployment platform
- All contributors and open-source libraries used in this project

---

Made with ❤️ using Next.js and TypeScript
