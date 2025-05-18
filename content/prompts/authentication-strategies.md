# Authentication Strategies Prompts

## Prompt 1: Choosing the Right Authentication Strategy

### Intent
Guidance

### Output Format
Explanation

### Target Language
JavaScript

### AI Level
Beginner

### Prompt
I'm building a Next.js application and I'm not sure which authentication strategy to use. My app will have [DESCRIBE YOUR APP FEATURES AND REQUIREMENTS]. Which authentication approach would you recommend and why?

### Example Input
I'm building a Next.js application and I'm not sure which authentication strategy to use. My app will have user accounts, a dashboard area, and will need to integrate with a payment system. It's a B2B SaaS application with around 500-1000 expected users. Which authentication approach would you recommend and why?

## Prompt 2: Debugging Authentication Issues

### Intent
Debug

### Output Format
Explanation with code

### Target Language
TypeScript

### AI Level
Intermediate

### Prompt
I'm having an issue with my Next.js authentication. [DESCRIBE THE PROBLEM]. Here's my current authentication code: [PASTE YOUR CODE]. What might be causing this issue and how can I fix it?

### Example Input
I'm having an issue with my Next.js authentication. Users are being logged out unexpectedly after about 30 minutes, even though I've set the session to last for 7 days. Here's my current authentication code: [PASTE YOUR CODE]. What might be causing this issue and how can I fix it?

## Prompt 3: Implementing Role-Based Access Control

### Intent
Implementation

### Output Format
Code

### Target Language
TypeScript

### AI Level
Advanced

### Prompt
I need to implement role-based access control in my Next.js application using [AUTHENTICATION PROVIDER]. I have the following user roles: [LIST ROLES]. How should I structure my authentication and authorization system to support these roles and restrict access to certain pages and features?

### Example Input
I need to implement role-based access control in my Next.js application using NextAuth.js. I have the following user roles: admin, editor, and viewer. How should I structure my authentication and authorization system to support these roles and restrict access to certain pages and features?
