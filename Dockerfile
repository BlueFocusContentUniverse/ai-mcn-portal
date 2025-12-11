# ============================================
# Base Stage: Use a Lightweight Node.js Image
# ============================================

# Use an official Node.js slim image (customizable via ARG)
FROM node:lts AS base

# Set the working directory inside the container
WORKDIR /app

# Copy only package-related files first to leverage Docker caching
COPY . .

# Set build-time environment variables
ENV NODE_ENV=production


# Install dependencies using npm ci (ensures a clean, reproducible install)
RUN npm ci && npm cache clean --force

RUN npm run build

# Build the application in standalone mode (outputs to `.next/standalone`)

# ============================================
# Stage 2: Create Production Image
# ============================================

# Use the same Node.js version for the final production container
FROM node:lts-slim AS runner

# Use a built-in non-root user for security best practices
USER node


# Set the port for the Next.js standalone server (default is 3000)
ENV PORT=80

# Disable Next.js telemetry during runtime
ENV NEXT_TELEMETRY_DISABLE=1

# Set the working directory inside the container
WORKDIR /app

# Copy only necessary files from the builder stage to keep the image minimal
COPY --from=base /app/.next/standalone ./      
COPY --from=base /app/.next/static ./.next/static
COPY --from=base /app/public ./public              

# Expose port 80 to allow HTTP traffic
EXPOSE 80

# Start the application using the standalone server
ENTRYPOINT ["node", "server.js"]