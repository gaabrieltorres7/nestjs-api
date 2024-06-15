<h1 align="center" style="font-weight: bold;">Task Manager 💻</h1>

<p align="center">
 • <a href="#technologies">Technologies</a> • 
 <a href="#started">Getting Started</a> • 
 <a href="#colab">Collaborators</a>
</p>

<p align="center">
    <b>This project(DB diagram is in it) is for users who want to manage daily tasks and, for me, for learning and getting used to NestJS. I learned and used JWT authentication, logging, swagger, database(PostgreSQL) and Kafka with Docker, use guards, file uploads using Multer and send e-mails with nodemailer through a microservice for task notifications.</b>
</p>

<h2 id="technologies">💻 Technologies</h2>

- NodeJS
- TypeScript
- NestJS
- PostgreSQL
- Docker
- Microservice
- PrismaORM
- Kafka
- Supabase

<h2 id="started">🚀 Getting started</h2>

<h3>Prerequisites</h3>

- NodeJS
- Git
- Docker

<h3>Cloning</h3>

```bash
git clone https://github.com/gaabrieltorres7/riderize
```

<h3>Config .env variables</h2>

Use the `.env.example` as reference to create your configuration file `.env`

```yaml
DATABASE_URL="postgresql://test:test@localhost:5432/test?schema=public"
JWT_SECRET="secret"
SUPABASE_URL="url"
SUPABASE_KEY="key"
SUPABASE_BUCKET="bucket"
```

<h3>Starting</h3>

```bash
cd task-manager-nestjs
npm i
docker compose up
npm run start
npm run start:dev
```

<h2 id="colab">🤝 Collaborators</h2>

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/98062444?v=4" width="100px;" alt="Gabriel Torres Profile Picture"/><br>
        <sub>
          <b>Gabriel Torres</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

<h3>If you want to contribute, here are some documentations that might help</h3>

[📝 How to create a Pull Request](https://www.atlassian.com/br/git/tutorials/making-a-pull-request)

[💾 Commit pattern](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
