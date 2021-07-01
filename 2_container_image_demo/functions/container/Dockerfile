FROM public.ecr.aws/lambda/nodejs:12
COPY containerFn.js package.json yarn.lock ${LAMBDA_TASK_ROOT}

# Update Package Library Definitions
RUN yum update -y

# Install ChromeDriver
RUN curl https://intoli.com/install-google-chrome.sh | bash

# Install Yarn
RUN npm install -g yarn

# Install Node Modules
RUN yarn install

CMD [ "containerFn.customHandler" ]