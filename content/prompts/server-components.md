# Server Components Prompts

## Prompt 1: Understanding Server Components

### Intent
Explanation

### Output Format
Explanation

### Target Language
JavaScript

### AI Level
Beginner

### Prompt
I'm confused about React Server Components in Next.js. Can you explain in simple terms what they are, how they differ from Client Components, and when I should use each?

### Example Input
I'm confused about React Server Components in Next.js. Can you explain in simple terms what they are, how they differ from Client Components, and when I should use each?

## Prompt 2: Converting Client Components to Server Components

### Intent
Code Conversion

### Output Format
Code with explanation

### Target Language
TypeScript

### AI Level
Intermediate

### Prompt
I have this Client Component in my Next.js application: [PASTE YOUR CODE]. I think it could be a Server Component instead. Can you help me convert it and explain what changes are needed?

### Example Input
I have this Client Component in my Next.js application:
\`\`\`tsx
'use client'
import { useState, useEffect } from 'react'

export default function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch('/api/users')
      const data = await res.json()
      setUsers(data)
      setLoading(false)
    }
    
    fetchUsers()
  }, [])
  
  if (loading) return <div>Loading...</div>
  
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
\`\`\`
I think it could be a Server Component instead. Can you help me convert it and explain what changes are needed?

## Prompt 3: Mixing Server and Client Components

### Intent
Architecture

### Output Format
Code with explanation

### Target Language
TypeScript

### AI Level
Advanced

### Prompt
I'm building a [DESCRIBE YOUR FEATURE] in Next.js and need to mix Server and Client Components effectively. I need to [DESCRIBE YOUR REQUIREMENTS]. How should I structure my components?

### Example Input
I'm building a dashboard in Next.js and need to mix Server and Client Components effectively. I need to fetch sensitive data on the server but also have interactive charts and filters on the client. How should I structure my components?
\`\`\`

Let me create a few more content items and prompts to complete the initial set:

```md file="content/README.md"
[v0-no-op-code-block-prefix]# Next.js Knowledge Library Content

This directory contains all the content for the Next.js Knowledge Library, organized by type and language.

## Structure

\`\`\`
content/
├── templates/         # Templates for creating new content
├── prompts/           # AI prompts for content items
├── en/                # English content
│   ├── tutorials/     # Step-by-step guides
│   ├── references/    # API-focused documentation
│   ├── explanations/  # Conceptual articles
│   ├── snippets/      # Code snippets
│   └── videos/        # Video content with transcripts
├── es/                # Spanish content (same structure as English)
├── fr/                # French content
├── de/                # German content
└── ...                # Other languages
\`\`\`

## Content Types

1. **Tutorials**: Step-by-step guides to complete specific tasks
2. **References**: API-focused documentation for Next.js features
3. **Explanations**: Conceptual articles explaining how things work
4. **Snippets**: Short, reusable code examples
5. **Videos**: Video content with transcripts and additional resources

## Creating New Content

Use the templates in the `templates/` directory as a starting point for creating new content.

## Prompts

Each content item can have associated AI prompts in the frontmatter or in adjacent `.prompt.md` files. The `prompts/` directory contains standalone prompt templates for various topics.
