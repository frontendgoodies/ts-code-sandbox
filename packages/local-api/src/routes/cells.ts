import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  //json parser
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    try {
      //Read the file
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });

      res.send(JSON.parse(result));
    } catch (error) {
      //If read throws error see if file doesn't exist
      if (error.code === 'ENOENT') {
        //Add code to create a file add default cells
        await fs.writeFile(fullPath, '[]', 'utf-8');
        const defaultContent = [
          {
            content:
              '## Hey welcome ! \n- Feel free to create a PR if you have a great feature you want to add to this project\n- In the example below is shown how you can output you app via the `root` id or `show` function\nMore info can be found in the [npm package](https://www.npmjs.com/package/@frontendgoodies/code-sandbox)',
            type: 'text',
            id: 'example-text-cell',
          },
          {
            content:
              "import React from 'react';\nimport ReactDOM from 'react-dom';\nconst { useState } = React;\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>Click me</button>\n    </div>\n  );\n};\n\nReactDOM.render(<Counter />, document.getElementById('root'));\nshow(<Counter />);",
            type: 'code',
            id: 'example-code-cell',
          },
        ];
        res.send(defaultContent);
      } else {
        throw error;
      }
    }

    //Parse a list of cells out of it
    //Send list of cells back to browser
  });

  router.post('/cells', async (req, res) => {
    //Take list of cells from req
    //Serialize them
    const { cells }: { cells: Cell[] } = req.body;

    //Write cells to file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({ status: 'OK' });
  });

  return router;
};
