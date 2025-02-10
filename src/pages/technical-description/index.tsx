import React from "react";
import {parseTextToTree} from "@/shared";
import {NumberedList} from "@/entities";

const text = `
- Install nodejs v22.x. Because v22 was used when creating the project, that version at least has a proven compatibility with project libs and tools. The latest nodejs versions also come with npx, so no need to explicitly install npx;

- Because we will be using yarn with npx, install it globally ‘npm install --global yarn’. Yarn is much faster package manager compared to default npm;

- The homework front-end project was created with a command: ‘npx create-next-app@latest jurgis-crs-homework --use-yarn --typescript’. Where npm is only a package manager, the npx allows also executing npm tools without a need to explicitly install them, in this case it automatically retrieves and executes npm tool create-next-app, which is a nodejs cli tool for react next.js project generation and management;

- Since a plain react is just a js library, not a framework like angular, the next.js can be used to ‘frameworkize’ the react a bit. So we are using a next.js react app;

- Some extra dependencies were added, where I was using the following commands:
  - ‘yarn add styled-components’ and ‘yarn add --dev @types/styled-components babel-plugin-styled-components’ was used for the Styled Components in-js manual styling approach. I also have experience of using higher level styling technologies in react projects, like tailwind or theming a reusable components libraries like Mantine;
  - 'yarn add --dev next-svgr @types/next-svgr' was used to allow importing svg files as components;
  - 'yarn add axios' is used to add the more professional rest api client lib, so that we don't have to use the default built-in fetch lib;
  - 'yarn add @tanstack/react-query' was installed to complement the axios lib - for more controlled response caching by a query key;
  - 'yarn add dotenv-cli --dev' was installed to be able to use the /config/.env global constants throughout the code;
  - 'yarn add --dev selenium-webdriver mocha chai ts-node @types/mocha @types/chai start-server-and-test chromedriver @types/selenium-webdriver' for e2e testing;

- After your have cloned the front-end repository locally, in the projects root directory run ‘yarn install’ to install the dependencies and then run ‘yarn dev’ to run the project (front-end dev server). Then in the web browser open http://localhost:3000;

- Source files and their folder hierarchy is organized in a Feature Sliced Design architecture. That is why you will see the 1st level folders - pages, widgets, features, entities, shared;
  - For example the page components are located under /src/pages/, adhering to the FSD;
  - For controlling which source files are public, which are private, I am using the index.ts interface approach. For example the /src/features/Address/api/sendAddAddress.ts is not allowed to be used directly, but only though it's hook /src/features/Address/hooks/useAddAddress.ts. This is enforced by exposing only it's hook in the modules public interface src/features/Address/index.ts;
  - To control the hierarchy of which modules can use other modules, I am using the FSD architecture. In FSD there is a strict usage top to down hierarchy: pages -> widgets -> features -> entities -> shared;
  - All the source files are located in the appropriate FSD folders. For example the AddressPage component is under the /pages/, the Table component is under the /widgets/, util function are under /shared/, Panel is under /entities/, SearchTextInput is under /features;
  - Svg icons go under /shared/. Shared means that those are some small generic assets and also generic util functions. Also theme colors go there (see /src/shared/theme/colors.ts);
  - For example the SearchTextInput component goes under features directory, because it's a small interactable component;
  - The Table component goes under widgets directory, because it's a user interactable component which also groups other components. Basically in FSD a widget is group of other components;
  - Small read-only components are under /entities/;
  - If that small component has any user interaction, it goes under /features/;


- For page routing I am using the next.js provided convention-over-configuration approach. Instead of declaring the navigation routing structure in a routes config file, the next.js build process automatically derives the routes config according to how the directories and files are structured in the /src/pages/. For example, according to the next.js convention, the addresses page is located in /src/pages/addresses/index.tsx. This is next.js convention;

- The most root component (if you count only non-boilerplate components) is /src/entities/Layout/ui/Layout.tsx. This component contains the site header and the page content;

- The site header component, according to FSD architecture, is located at /src/widgets/Header/ui/Header.tsx. The styling part is separated out to a side-file styles.ts, next to the Header.tsx. I am using the same layout/style separation approach for all other components as well;

- For styling I am using Styled Components approach. In previous projects I have also used various approaches, like Component Module Styles approach, have also themed different css bootstraping libs and different reusable components libs, and have also used tailwind. However in this project for the consistency I will use only one approach - the Styled Components approach;
  - The styled components have SC postfix in their tagname;
  - Colors in the styles code are references to theme config. There are no hard-coded colors anywhere in the homework;
  - I am using rem units for sizes and for spaces, not px. Rem scales better when a user configures a non-default globally text size in his web-browser settings or in OS settings. I am not using hard-px anywhere throughout the entire homework, only converting px to rem;

- I am using semantic tags as much as possible (no div-soup). It's rare to find any divs in my homework;

- The addresses table has been implemented with the following features:
  - Columns are sortable by clicking on the column header. By-default the sorting is done by the id column in descending order, so that the most recently entered rows are always visible;
  - Each column is individually text-searchable with search case-insensitive order-insensitive tokens separated by space;
  - You can use any combination of sorting and ordering on multiple columns at the same time;
  - When search yields no results, user will see a message 'No search results' in the table body;
  - While the data is requested, but not yet received, there is a message 'Loading...' in the table body;
  - Columns have maximum width, so that, when a content in a data cell is larger than the max width, the text gets truncated with the '...' at the end;

- The addresses data requesting from the back-end is using the following approach (ordered from the lowest abstraction level to highest):
  - The entire infrastructure for addresses retrieval, storing and managing is located under the /src/features/Addresses/, adhering to FSD architecture;
  - Under that location the infrastructure is further organized into api, hooks, providers, store, types directories, adhering to FSD architecture;
  - The actual part, where the request is made, is in the /src/features/Addresses/api/fetchAddresses.ts, which is using the third-party axios rest client library, instead of the browsers built-in fetch api client. The back-end base url is taken from /config/.env;
  - If we go further up in the abstraction hierarchy, the fetchAddresses function is used in the /src/features/Address/providers/AddressProvider.tsx. The provider is using the reactquery library for automatic refetching and caching;
  - The provider is then providing a Store for the received data in the needed scope. The scope for the data store is starting from the /src/pages/_app.tsx, which is the parent component for the pages components;
  - The Context Store is located in /src/features/Address/store/AddressesContext.ts;
  - Then for the public interface of all that, I have a hook located in /src/features/Address/hooks/useAddresses.tsx;
  - That hook is then used in the /src/pages/addresses/index.tsx;

- The basic idea of how the addresses data is managed by the above mentioned mechanism is as follows:
  - Initially the addresses data is requested right away when a user opens the site. The addresses data is request right away, even if a user initially opens another page by a direct url;
  - Then, until a user starts editing anything in the table, the data is re-requested automatically each 5 seconds. This is to ensure that, if any other user has submitted a new version of the data, that is automatically reflected to all other users, without the need to manually refresh the site;
  - Editing existing data can be done by directly typing in tables data cells (except the id column and action buttons column);
  - When a user starts to edit anything in the table, the periodic re-requesting is stopped, to avoid collisions between db data and the draft data;
  - While a user has any unsaved changes in the table, the periodic re-requesting will not happen;
  - When user submits the changes, then the periodic re-requesting is resumed, and also the latest data is re-requested immediately as well, because some other user might have changed the data when our user was editing the table;
  - If there are no unsaved changes in the table, the "Save Changes" button is disabled, otherwise it is enabled;
  - While having some unsaved changes, when user tries to leave the page (to "Technical Description" page), there is a prompt modal provided so a user can confirm if he really intended to leave the page;
  - When user tries to remove any address by clicking on a remove button in its row, then a confirmation modal is presented. Only if the user confirms that he really intended to remove the address, then it is removed;
  - A user can also create new addresses by clicking on the 'plus' icon next to the table on the top-right side. A new row is then created as the first row in the table. That change is also submitted when user clicks the "Save changes" button, so the same submitting button is used both for edits and insertions;

- Modals:
  - The infrastructure for the modal is organized/structured according to FSD architecture, located under the /src/widgets/Modal/;
  - The core layout and styling files are located in /src/widgets/Modal/ui/, The special thing about the layout is that, because I am using the appropriate semantic tags, the web-browser automatically does some special things, so that I don't have to implement those:
    - Because I am using the <dialog> tag and then calling a browser built-in function showModal() on it's ref, the browser automatically provides a half transparent backdrop around the modal. Also, before I call browsers built-in showModal() on <dialog> ref, browser automatically performs modal hiding when its not needed, and only after I call that function, browser handles the showing of the modal. This demonstrates that not everything needs to be implemented, because some functionality is already provided by a web-browser if using the semantic tag combinations correctly;
    - Because inside the <dialog> tag the submit <button> inside a <form method="dialog"> tag, I don't have to explicitly implement a onClick handler to close the modal, because the browser identifies this combination of semantic tags and automatically performs modal closing on button click. You can check yourself that in the Modal component both buttons don't have inner onClick handlers :)
  - The modal component is using React Portal createPortal() function to move its instance in a DOM hierarchy to <body> tag. This is structurally more handy when later debugging such global things with inspect element. Also, because a modal is outside of any specific component or page layout flow, it is more logical that in DOM it is located as close to the root of the DOM tree as possible;
  - It is also using forwardRef and useImperativeHandle to have open() method exposed to the parent (its Provider);
  - The modal is available globally thanks to the Provider in /src/widgets/Modal/provider/;
  - And is easily accessible from any location thanks to its interface Hook in /src/widgets/Modal/hooks/;
  - The modal states are stored in the React Context store with /src/widgets/Modal/store/;

- The loading spinner:
  - The spinner related infrastructure source files are structured according to FSD architecture under /src/entities/Spinner/:
  - The Layout and Styling files are located in /src/entities/Spinner/ui/;
  - The spinner component is using React Portal createPortal() function to move its instance in a DOM hierarchy to <body> tag. This is structurally more handy when later debugging such global things with inspect element. Also, because a spinner is outside of any specific component or page layout flow, it is more logical that such a thing in DOM is located as close to the root of the DOM tree as possible;
  - The Context Store part is in /src/entities/Spinner/store/;
  - The global Provider for the spinner is in /src/entities/Spinner/provider/. The provider is instantiated in the /src/pages/_app.tsx, so that the spinner is instantiated globally;
  - The Hook for the spinner interface Context is in /src/entities/Spinner/hook/;
  - Because of all that infrastructure, the Spinner is easily available globally by just using the spinner hook;
  - I have globally configured the axios rest api client lib so that the spinner is activated and deactivated automatically/implicitly on any BE call. For that I am using the axios global interceptors, see: src/shared/config/axiosConfig.ts;
  - While implementing, initially there was a problem, where the the axios interceptors are living outside the reacts state management. That means that the interceptors cannot simply call the spinner hook functions. To bridge that gap, I had to use show/hide callback functions, see: /src/entities/Layout/ui/Layout.tsx;

- Error handling:
  - When there is an issue calling the back-end, I have globally configured the axios (see /src/shared/config/axiosConfig.ts) to show my universal Modal component;
  - Because the axios interceptors are outside the reacts state management, I cannot directly call the modals hook. To bridge that gap, I had to use showErrorModal callback function, see: /src/entities/Layout/ui/Layout.tsx;

- For back-end I am using the Ember Software's provided homework backend. Since it contained only GET all addresses endpoint, I added the remaining PUT, POST, DELETE endpoints. I have deployed my modified version of the Ember's homework backend to my raspberry pi linux nginx nodejs server on base url https://crs-homework-be.afla.lv. In front-end I am using the same BE url both in development mode and in production mode;

- I have built and deployed the front-end as well, and it is available on https://crs-homework.afla.lv. This way you can easily try it out, if you don't want to run it locally with a live development server;

- Tests:
  - For regression tests I am using Selenium e2e framework. Basically e2e tests are simulating user interaction - clicking thought front-end elements and checking what is then rendered. A single e2e test can be made to go though a full scenario from A to Z, along the way having a huge front-end coverage. The back-end can be either mocked or a real staging/test/qa back-end and db. If a real back-end is used, a single such e2e A-Z test can not just have a huge coverage in front-end, but also a huge coverage in back-end, because along the way, when user interaction is simulated, it also can check what data is being output on a screen received from the back-end;
  - Before running the e2e tests, first make sure that your chrome version is at least 133;
  - To run the e2e tests, in terminal in project root directory run command 'yarn test:e2e';
  - I have implemented a single e2e test /test/e2e/addresses-page-crud.spec.ts that goes through basic scenarios;
  - I have currently configured the test run in a headless virtual web-browser mode. This way the e2e tests are running faster;
  - In the front-end code you will notice that some elements have id attribute with value that starts with QA_ (for example QA_add_address_button). This is needed for the e2e tests to be able to straight find needed elements, without needing to write strange and long selectors;
  - My e2e test does the following:
    - Opens the site and checks if in the site header the site title is 'Jurgis CRS Homework';
    - Then creates a new Address, submits it to back-end (real BE, not mocked) and then checks if the Id is received and visible in the new table row;
    - Then edits the Address row, submits the change to BE and checks if the new changes are reflected even after the site refresh;
    - Then removes the Address row, and checks if the removal was applied even after the site refresh;
`;

const TechnicalDescriptionPage = () => {
  const listItems = parseTextToTree(text);
  return (
    <article>
      <NumberedList items={listItems}/>
    </article>
  );
};

export default TechnicalDescriptionPage;
