![repo-dark](https://user-images.githubusercontent.com/94052679/149610096-9e9bbdb7-2ac9-454c-88f8-d0f199062ce6.png)

# Quick Features

    Lightweight (5kb - 14kb+ depending on features used and tree-shaking)
    Headless (100% customizable, Bring-your-own-UI)
    Auto out of the box, fully controllable API
    Sorting (Multi and Stable)
    Filters
    Pivoting & Aggregation
    Row Selection
    Row Expansion
    Column Ordering
    Animatable
    Virtualizable
    Resizable
    Server-side/controlled data/state
    Extensible via hook-based plugin system

# Installation

You can install React Table with NPM, Yarn, or a good ol' <script> via unpkg.com.
NPM

 npm install react-table --save

or

 yarn add react-table

React Table is compatible with React v16.8+ and works with ReactDOM and React Native.

# Quick Start

At the heart of every React Table is the useTable hook and the table instance object that it returns. This instance object contains everything you'll need to build a table and interact with its state. This includes, but is not limited to:

    Columns
    Materialized Data
    Sorting
    Filtering
    Grouping
    Pagination
    Expanded State
    Any functionality provided by custom plugin hooks, too!

In React Table, you the developer are responsible for rendering the UI (markup and styles) of your table, but don't let that intimidate you! Table UIs are fun and React Table exists to make the process much easier to wire up your own table UI.

To show you how this works. Let's start with a very basic table example.

# Getting your data

When thinking about a table structure, you typically have rows which contain columns. While table configurations can get far more complex with nested columns, subrows, etc. for this basic quick start, we need to define some data that resembles this structure.

 const data = React.useMemo(
   () => [
     {
       col1: 'Hello',
       col2: 'World',
     },
     {
       col1: 'react-table',
       col2: 'rocks',
     },
     {
       col1: 'whatever',
       col2: 'you want',
     },
   ],
   []
 )

    It's important that we're using React.useMemo here to ensure that our data isn't recreated on every render. If we didn't use React.useMemo, the table would think it was receiving new data on every render and attempt to recalculate a lot of logic every single time. Not cool!

# Define Columns

Now that we have some data, let's create a set of column definitions to pass into the useTable hook.

 const columns = React.useMemo(
   () => [
     {
       Header: 'Column 1',
       accessor: 'col1', // accessor is the "key" in the data
     },
     {
       Header: 'Column 2',
       accessor: 'col2',
     },
   ],
   []
 )

    Again, we're using React.useMemo so React Table doesn't recalculate the universe on every single render. Only when the memoized value actually changes!

# Using the useTable hook

Now that you have some data and columns defined, we can pass those into the useTable hook to create a table instance.

 const tableInstance = useTable({ columns, data })
    
    useTable at the very least needs to be provided with an object containing the memoized columns and data.

# Building a basic table UI

Nice! We have our table instance and we're almost there! However, we still don't have any table markup or styles to show, right?

Let's build a basic table structure using just HTML for now:

 return (
   <table>
     <thead>
       <tr>
         <th></th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td></td>
       </tr>
     </tbody>
   </table>
 )
    
# Applying the table instance to markup

Now that we have our table structure, we can use the tableInstance to make it come to life!

 const tableInstance = useTable({ columns, data })
    
 const {
   getTableProps,
   getTableBodyProps,
   headerGroups,
   rows,
   prepareRow,
 } = tableInstance

 return (
   // apply the table props
   <table {...getTableProps()}>
     <thead>
       {// Loop over the header rows
       headerGroups.map(headerGroup => (
         // Apply the header row props
         <tr {...headerGroup.getHeaderGroupProps()}>
           {// Loop over the headers in each row
           headerGroup.headers.map(column => (
             // Apply the header cell props
             <th {...column.getHeaderProps()}>
               {// Render the header
               column.render('Header')}
             </th>
           ))}
         </tr>
       ))}
     </thead>
     {/* Apply the table body props */}
     <tbody {...getTableBodyProps()}>
       {// Loop over the table rows
       rows.map(row => {
         // Prepare the row for display
         prepareRow(row)
         return (
           // Apply the row props
           <tr {...row.getRowProps()}>
             {// Loop over the rows cells
             row.cells.map(cell => {
               // Apply the cell props
               return (
                 <td {...cell.getCellProps()}>
                   {// Render the cell contents
                   cell.render('Cell')}
                 </td>
               )
             })}
           </tr>
         )
       })}
     </tbody>
   </table>
 )

# Final Result

If we put all of this together, we should get a very basic (as well as temporarily ugly) table.

 import { useTable } from 'react-table'

 function App() {
   const data = React.useMemo(
     () => [
       {
         col1: 'Hello',
         col2: 'World',
       },
       {
         col1: 'react-table',
         col2: 'rocks',
       },
       {
         col1: 'whatever',
         col2: 'you want',
       },
     ],
     []
   )

   const columns = React.useMemo(
     () => [
       {
         Header: 'Column 1',
         accessor: 'col1', // accessor is the "key" in the data
       },
       {
         Header: 'Column 2',
         accessor: 'col2',
       },
     ],
     []
   )

   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
   } = useTable({ columns, data })
 
   return (
     <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'papayawhip',
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
   )
 }
    
Clearly this isn't ready to ship, but from a conceptual standpoint, you just learned the basics of using React Table!

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
