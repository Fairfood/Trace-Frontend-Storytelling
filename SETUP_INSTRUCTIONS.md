# StorytellingV2 Setup Instructions

Welcome to StorytellingV2, Fairfood's consumer interface for tracing products through the supply chain! Follow these step-by-step instructions to get started.

## Prerequisites

Before you begin, make sure you have the following installed on your computer:

- **NodeJS:** [Download and Install NodeJS](https://nodejs.org/)
- **Web Browser:** We recommend using the latest version of Google Chrome, Mozilla Firefox, or Microsoft Edge.

## Installation Steps

### 1. Clone the Repository

1. Open your web browser and navigate to the StorytellingV2 repository on [GitLab](git@git.cied.in:fairfood/trace-v2/frontend/storytelling-v2.git).

2. Look for a "Clone" or "Download" button and click on it to copy the repository URL.

3. Open a terminal or command prompt on your computer.

4. Type the following command and press Enter to clone the repository:

   ```bash
   git clone git@git.cied.in:fairfood/trace-v2/frontend/storytelling-v2.git
   ```

### 2. Navigate to the Project Folder

1. Open a new terminal or command prompt.

2. Change into the project directory:

   ```bash
   cd storytelling-v2
   ```

### 3. Install Dependencies

1. In the same terminal or command prompt, type the following command and press Enter:

   ```bash
   npm install
   ```

   This command installs the necessary packages and dependencies for the application.

### 4. Start the Application

1. Type the following command and press Enter to start the application:

   ```bash
   ng serve or ng s
   ```

2. Open your web browser and go to [http://localhost:4200/](http://localhost:4200/). The StorytellingV2 application should be running locally.

3. For the storytelling application or SPA to work you need to have a theme and batch id.
    eg: "http://localhost:4200/#/Nutmeg?batch=yDl9K"
    This will load the storytelling interface.

### 5. Explore the Application

You can now explore the Fairfood StorytellingV2 application! Navigate through the features and experience the traceability of products from their source to the final destination.

## Troubleshooting

If you encounter any issues during the setup process, please refer to the [Troubleshooting](#) section in the README.md file or reach out to the Fairfood support team for assistance.

Thank you for using StorytellingV2! If you have any feedback or questions, feel free to contact us.
