import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import TourModel from '../models/TourModel';
import start from '../database/start';

dotenv.config();

start().then(async () => {
  const tours = await JSON.parse(
    readFileSync(`${__dirname}/tours.json`, 'utf-8')
  );
  TourModel.insertMany(tours).then((data) => {
    console.log(`${data.length} tours added`);
  });
});
