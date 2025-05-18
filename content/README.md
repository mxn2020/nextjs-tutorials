# Next.js Knowledge Library Content

This directory contains all the content for the Next.js Knowledge Library, organized by type and language.

## Structure

\`\`\`
content/
├── templates/         # Templates for creating new content
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

Each content item can have associated AI prompts in the frontmatter or in adjacent `.prompt.md` files.
\`\`\`

Now, let's create the templates for each content type:

```mdx file="content/templates/tutorial.mdx"
---
title: "Tutorial Title"
slug: "tutorial-slug"
description: "A brief description of the tutorial"
author: "Author Name"
authorGithub: "author-github-username"
date: "YYYY-MM-DD"
lastUpdated: "YYYY-MM-DD"
language: "en"
difficulty: "beginner" # beginner, intermediate, advanced
tags: ["tag1", "tag2", "tag3"]
prerequisites: ["prerequisite1", "prerequisite2"]
prompts: [
  {
    intent: "practice",
    output_format: "code",
    target_language: "javascript",
    ai_level: "intermediate",
    prompt: "Create a practice exercise for implementing the concepts covered in this tutorial."
  },
  {
    intent: "debug",
    output_format: "explanation",
    target_language: "javascript",
    ai_level: "beginner",
    prompt: "I'm getting an error when implementing this tutorial: [ERROR]. What might be causing it?"
  },
  {
    intent: "extend",
    output_format: "code",
    target_language: "typescript",
    ai_level: "advanced",
    prompt: "How can I extend this tutorial to include [FEATURE]?"
  }
]
---

# Tutorial Title

## Introduction

Brief introduction to the tutorial, explaining what the reader will learn and why it's important.

## Prerequisites

- List of prerequisites
- Knowledge or tools needed

## Step 1: First Step Title

Detailed explanation of the first step.

\`\`\`jsx
// Code example for step 1
function Example() {
  return <div>Example code</div>
}
\`\`\`

## Step 2: Second Step Title

Detailed explanation of the second step.

\`\`\`jsx
// Code example for step 2
function AnotherExample() {
  return <div>More example code</div>
}
\`\`\`

## Step 3: Third Step Title

Detailed explanation of the third step.

## Common Issues and Troubleshooting

Address common issues that readers might encounter.

## Conclusion

Summarize what the reader has learned and suggest next steps or related tutorials.

## Further Reading

- [Link to related resource](https://example.com)
- [Another related resource](https://example.com)
\`\`\`

```mdx file="content/templates/reference.mdx"
---
title: "Reference Title"
slug: "reference-slug"
description: "A brief description of the reference"
author: "Author Name"
authorGithub: "author-github-username"
date: "YYYY-MM-DD"
lastUpdated: "YYYY-MM-DD"
language: "en"
tags: ["tag1", "tag2", "tag3"]
version: "Next.js 14.0.0+"
prompts: [
  {
    intent: "usage",
    output_format: "code",
    target_language: "javascript",
    ai_level: "intermediate",
    prompt: "Show me how to use [FEATURE] in a real-world example."
  },
  {
    intent: "compare",
    output_format: "explanation",
    target_language: "javascript",
    ai_level: "intermediate",
    prompt: "How does [FEATURE] compare to [ALTERNATIVE]?"
  },
  {
    intent: "troubleshoot",
    output_format: "explanation",
    target_language: "javascript",
    ai_level: "advanced",
    prompt: "I'm having an issue with [FEATURE]: [ISSUE]. How can I resolve it?"
  }
]
---

# Reference Title

## Overview

Brief overview of the feature or API being documented.

## API Reference

### Function/Component/API Name

\`\`\`tsx
function ExampleFunction(param1: string, param2: number): ReturnType
\`\`\`

#### Parameters

- `param1` (string): Description of param1
- `param2` (number): Description of param2

#### Returns

- `ReturnType`: Description of the return value

#### Example

\`\`\`tsx
// Example usage
const result = ExampleFunction('example', 123)
\`\`\`

### Another Function/Component/API

\`\`\`tsx
interface ExampleProps {
  prop1: string
  prop2?: number
}

function ExampleComponent(props: ExampleProps): JSX.Element
\`\`\`

#### Props

- `prop1` (string): Description of prop1
- `prop2` (number, optional): Description of prop2

#### Example

\`\`\`tsx
// Example usage
<ExampleComponent prop1="example" prop2={123} />
\`\`\`

## Best Practices

Guidelines for using this feature or API effectively.

## Common Pitfalls

Common mistakes and how to avoid them.

## Related Resources

- [Link to related resource](https://example.com)
- [Another related resource](https://example.com)
\`\`\`

```mdx file="content/templates/explanation.mdx"
---
title: "Explanation Title"
slug: "explanation-slug"
description: "A brief description of the explanation"
author: "Author Name"
authorGithub: "author-github-username"
date: "YYYY-MM-DD"
lastUpdated: "YYYY-MM-DD"
language: "en"
difficulty: "beginner" # beginner, intermediate, advanced
tags: ["tag1", "tag2", "tag3"]
prompts: [
  {
    intent: "simplify",
    output_format: "explanation",
    target_language: "javascript",
    ai_level: "beginner",
    prompt: "Can you explain [CONCEPT] in simpler terms?"
  },
  {
    intent: "compare",
    output_format: "explanation",
    target_language: "javascript",
    ai_level: "intermediate",
    prompt: "How does [CONCEPT] compare to [ALTERNATIVE]?"
  },
  {
    intent: "deep_dive",
    output_format: "explanation",
    target_language: "javascript",
    ai_level: "advanced",
    prompt: "Can you provide a more in-depth explanation of how [CONCEPT] works under the hood?"
  }
]
---

# Explanation Title

## Introduction

Brief introduction to the concept being explained.

## Core Concept

Detailed explanation of the core concept.

### Key Aspects

Breakdown of key aspects or components.

\`\`\`jsx
// Example code illustrating the concept
function ConceptExample() {
  return <div>Example illustrating the concept</div>
}
\`\`\`

## How It Works

Explanation of how the concept works, possibly with diagrams or illustrations.

## Use Cases

Common use cases and scenarios where this concept is applicable.

## Comparison with Alternatives

How this concept compares to alternative approaches.

## Best Practices

Guidelines for applying this concept effectively.

## Common Misconceptions

Address common misconceptions or confusions about the concept.

## Conclusion

Summarize the key points and provide context for when to use this concept.

## Further Reading

- [Link to related resource](https://example.com)
- [Another related resource](https://example.com)
\`\`\`

```mdx file="content/templates/snippet.mdx"
---
title: "Snippet Title"
slug: "snippet-slug"
description: "A brief description of the snippet"
author: "Author Name"
authorGithub: "author-github-username"
date: "YYYY-MM-DD"
lastUpdated: "YYYY-MM-DD"
language: "en"
tags: ["tag1", "tag2", "tag3"]
framework: "Next.js" # Next.js, React, etc.
version: "Next.js 14.0.0+"
prompts: [
  {
    intent: "modify",
    output_format: "code",
    target_language: "javascript",
    ai_level: "intermediate",
    prompt: "How can I modify this snippet to [MODIFICATION]?"
  },
  {
    intent: "explain",
    output_format: "explanation",
    target_language: "javascript",
    ai_level: "beginner",
    prompt: "Can you explain how this snippet works?"
  },
  {
    intent: "optimize",
    output_format: "code",
    target_language: "javascript",
    ai_level: "advanced",
    prompt: "How can I optimize this snippet for better performance?"
  }
]
---

# Snippet Title

## Purpose

Brief explanation of what this snippet does and when to use it.

## Code

\`\`\`tsx
// The code snippet
function ExampleSnippet() {
  const [state, setState] = useState(initialState)
  
  useEffect(() => {
    // Effect logic
  }, [dependencies])
  
  return <div>Example snippet</div>
}
\`\`\`

## Usage

How to use this snippet in your code.

\`\`\`tsx
// Example usage
function App() {
  return <ExampleSnippet />
}
\`\`\`

## Explanation

Line-by-line explanation of how the snippet works.

## Variations

Common variations or adaptations of this snippet.

## Related Snippets

- [Link to related snippet](../related-snippet-slug)
- [Another related snippet](../another-related-snippet-slug)
\`\`\`

```mdx file="content/templates/video.mdx"
---
title: "Video Title"
slug: "video-slug"
description: "A brief description of the video"
author: "Author Name"
authorGithub: "author-github-username"
date: "YYYY-MM-DD"
lastUpdated: "YYYY-MM-DD"
language: "en"
difficulty: "beginner" # beginner, intermediate, advanced
tags: ["tag1", "tag2", "tag3"]
videoUrl: "https://www.youtube.com/watch?v=example"
duration: "10:30" # MM:SS format
prompts: [
  {
    intent: "summarize",
    output_format: "explanation",
    target_language: "javascript",
    ai_level: "beginner",
    prompt: "Can you summarize the key points from this video?"
  },
  {
    intent: "code",
    output_format: "code",
    target_language: "javascript",
    ai_level: "intermediate",
    prompt: "Can you provide the code examples shown in this video?"
  },
  {
    intent: "extend",
    output_format: "explanation",
    target_language: "javascript",
    ai_level: "advanced",
    prompt: "How can I extend the concepts shown in this video to [USE_CASE]?"
  }
]
---

# Video Title

## Video

<iframe 
  width="100%" 
  height="400" 
  src="https://www.youtube.com/embed/example" 
  title="Video Title" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen
></iframe>

## Overview

Brief overview of what the video covers.

## Key Timestamps

- **0:00** - Introduction
- **1:30** - First topic
- **4:45** - Second topic
- **8:20** - Conclusion

## Transcript

Full transcript of the video content.

## Code Examples

Code examples shown in the video.

\`\`\`tsx
// Example code from the video
function VideoExample() {
  return <div>Example from the video</div>
}
\`\`\`

## Additional Resources

- [Link to related resource](https://example.com)
- [Another related resource](https://example.com)

## Related Videos

- [Link to related video](../related-video-slug)
- [Another related video](../another-related-video-slug)
\`\`\`
