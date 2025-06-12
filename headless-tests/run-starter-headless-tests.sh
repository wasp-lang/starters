#!/bin/bash

# Script to run E2E tests for a given Wasp template.

# Check if a template name is provided as the first argument
if [ -z "$1" ]; then
  echo "Error: Template name argument is missing."
  echo "Usage: $0 <template_name>"
  exit 1
fi

TEMPLATE_NAME="$1"
TEMP_PROJECT_NAME="temp-project-${TEMPLATE_NAME}"
EXIT_CODE=0

# Group the main sequence of operations whose collective exit status needs to be captured.
(
  echo "Starting E2E tests for ${TEMPLATE_NAME} template..." && \
  echo "Cleaning up any pre-existing temporary project directory: ${TEMP_PROJECT_NAME}" && \
  rm -rf "${TEMP_PROJECT_NAME}" && \
  echo "Generating ${TEMPLATE_NAME} project: ${TEMP_PROJECT_NAME}" && \
  wasp-cli new "${TEMP_PROJECT_NAME}" -t "${TEMPLATE_NAME}" && \
  echo "Running DEV tests for ${TEMPLATE_NAME} project..." && \
  E2E_APP_PATH="./${TEMP_PROJECT_NAME}" npm run playwright:test:dev && \
  if ( [ -f "./${TEMP_PROJECT_NAME}/schema.prisma" ] && grep -q "sqlite" "./${TEMP_PROJECT_NAME}/schema.prisma" ); then \
    echo "Skipping BUILD tests for ${TEMPLATE_NAME} project (sqlite detected in schema.prisma)." && \
    true ; \
  else \
    echo "Running BUILD tests for ${TEMPLATE_NAME} project..." && \
    E2E_APP_PATH="./${TEMP_PROJECT_NAME}" npm run playwright:test:build ; \
  fi
)
# Capture the exit code of the entire command group above.
EXIT_CODE=$?

# Cleanup operations that should run regardless of the previous block's success.
echo "Cleaning up ${TEMPLATE_NAME} project: ${TEMP_PROJECT_NAME}"
rm -rf "${TEMP_PROJECT_NAME}"

echo "Finished E2E tests for ${TEMPLATE_NAME} template with exit code ${EXIT_CODE}"
exit "${EXIT_CODE}"