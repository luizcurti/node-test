# Use Node.js 22 Alpine for smaller size and better performance
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change file ownership
USER nextjs

# Expose port
EXPOSE 3000

# Command to start the application
CMD ["npm", "run", "dev"]