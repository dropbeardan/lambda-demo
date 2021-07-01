FROM public.ecr.aws/lambda/nodejs:14

COPY librariesFn.js package.json yarn.lock ./

RUN npm install -g yarn
RUN yarn install

# Command can be overwritten by providing a different command in the template directly.
CMD ["librariesFn.customHandler"]
