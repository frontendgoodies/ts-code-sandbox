## **Local live js/md editor**

This is an interactive cell based coding environment that allows you to create **JS** see it and execute it and/or write **MD**  live in your local browser and save it in you current cli directory.

JS code cells are all joined together into one file, defining a variable in the first cell allows you to refer it in the ones below it.

Re-order cells using the buttons on the top right

Add new cells by hovering on the divider between the cells

### **How to run it?**
Run the app directly on your local machine by running `npx @frontendgoodies/code-sandbox serve`

### **Options/Params**
 - port: `--port=xxxx` || `--port xxxx`
 - filename: by just passing a name and optionally a .js extension(passing a filename that you have previously edited will open that file instead and populate cells with those values so this allows you to continue where you left off);
  Default filename value: `notebook.js`
```
Example:
npx @frontendgoodies/code-sandbox serve sample.js --port 5000
```

### **Internal helpers**
`show` function allows you to render any react component, string, number, objects
