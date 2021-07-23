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
        res.send([]);
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
