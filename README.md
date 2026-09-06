# Daybook

A quiet daily planner for listing what needs doing today. Built with React and Vite. Tasks stay in the browser with `localStorage`, so nothing is sent to a server.

## Features

- Add tasks with priority, category, and an optional due date
- Mark tasks done, edit them, or delete them
- Search, then filter by **To do / All / Done** and **Work / Personal / General**
- Progress bar with open, finished, and overdue counts
- Overdue, due today, and due tomorrow labels
- Clear finished tasks in one click
- Data is saved locally and restored after refresh

## Tech stack

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) 8

## Getting started

**Requirements:** Node.js 18 or later.

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in the browser.

### Other scripts

```bash
npm run build     # production build
npm run preview   # preview the production build
npm run lint      # run ESLint
```

## Project structure

```text
├── index.html
├── public/
└── src/
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── main.jsx
    └── components/
        ├── progresstracker.jsx
        ├── taskform.jsx
        └── tasklist.jsx
```

| File | Role |
| --- | --- |
| `App.jsx` | Task state, filters, and localStorage |
| `taskform.jsx` | New task form |
| `tasklist.jsx` | List, complete, edit, delete |
| `progresstracker.jsx` | Counts and progress bar |
| `App.css` / `index.css` | Layout and theme |

## How tasks are stored

Tasks are saved under the `tasks` key in `localStorage`. Clearing site data in the browser will remove them.

## License

MIT
