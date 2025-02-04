# Storytelling V2 - Fairfood Consumer Interface

Fairfood introduces Trace, a powerful traceability solution system. Trace is a user-friendly, blockchain-based platform that empowers agri-food businesses to establish transparency in their supply chain, allowing them to trace their products seamlessly from farm to fork.

Storytelling, a crucial component of Fairfood's Trace system, plays a pivotal role in tracking and tracing stocks from their origin to their final destination.

## Overview

StorytellingV2 serves as a vital component within Fairfood's Trace system, facilitating the seamless tracking and tracing of stocks from their point of origin to their ultimate destination.

## Requirements

To contribute to the development of StorytellingV2, ensure you have the following prerequisites installed on your machine:

- NodeJS (version 14.15 or higher)
- Latest version of Angular

## Installation

To set up the project on your local machine, follow these steps:

1. Clone the repository:
    ```bash
    git clone git@git.cied.in:fairfood/trace-v2/frontend/storytelling-v2.git
    ```

2. Navigate to the project directory:
    ```bash
    cd storytelling-v2
    ```

3. Install project dependencies:
    ```bash
    npm install
    ```

If you encounter any errors related to node-sass, please refer to this [link](https://www.npmjs.com/package/node-sass) and cross-check the node versions installed on your local machine.

## Setup Instructions

For detailed instructions on setting up the application locally, please refer to the [Setup Instructions](./SETUP_INSTRUCTIONS.md).

## Getting Started

To launch the application locally, run the following command:

```bash
ng serve or ng s
```

## Building for Production

To build the application for production, execute the following command:

```bash
ng build --c=[environment_name]
```

Environments can be found in src/environments folder

## Running Unit Tests

Run the following command to execute unit tests via Karma:

```bash
ng test
```

## Documentation

To generate and view documentation using Compodoc, use the following scripts:

- Build documentation:
    ```bash
    npm run compodoc:build
    ```

- Build and serve documentation:
    ```bash
    npm run compodoc:build-and-serve
    ```

- Serve existing documentation:
    ```bash
    npm run compodoc:serve
    ```

## Linting

This project is enabled with lint-staged. Before committing changes, ensure to lint your code using the following command:

```bash
npm run lint
```

## Contributing

Thank you for considering contributing to StorytellingV2! To get started, take a look at our [Contribution Guidelines](./CONTRIBUTING.md).

Your contributions play a crucial role in advancing Fairfood's mission to revolutionize traceability and transparency in the agri-food industry. Together, we can create a more sustainable and ethical food supply chain for all.