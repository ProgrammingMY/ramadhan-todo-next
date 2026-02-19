# Ramadhan Garden (now Sunnah Garden)

A modern web application built with Next.js to help users track and manage their Sunnah activities and progress. This application provides a beautiful and interactive interface for users to maintain their Sunnah journey.

## Features

- 📱 Progressive Web App (PWA) support
- 🤖 AI-powered weekly analysis
- 🌙 Hijri calendar integration
- 🌱 Progress tracking in form of Garden
- 👤 User profiles
- 📖 Interactive handbook
- 🔔 Push notifications
- 🎨 Modern UI with Tailwind CSS
- 🌓 Dark/Light mode support

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Custom implementation with bcrypt
- **AI Integration**: Google Generative AI
- **Deployment**: SST (Serverless Stack)

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm (Package manager)
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd ramadhan-todo-next
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up your environment variables:
Create a `.env` file in the root directory. Use `.env.example` as a template.

4. Set up the database:
```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

5. Run the development server:
```bash
pnpm dev
```


### Building for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── _components/       # Shared components
│   ├── _context/         # React context providers
│   ├── api/              # API routes
│   ├── handbook/         # Ramadhan handbook pages
│   ├── profile/          # User profile pages
│   └── progress/         # Progress tracking pages
├── db/                    # Database related files
├── public/               # Static assets
└── lambda/               # Serverless functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [SST](https://sst.dev/)
