import express from 'express';
import { DataService } from '../services/buffer.service';

export function createModbusRouter(dataService: DataService) {
  const router = express.Router();

  // Temperature
  router.get('/temperature', (req, res) => {
    const limit = parseInt(req.query.limit as string) || 8640;
    res.json(dataService.getRecentTemperature(limit));
  });

  // Compressor
  router.get('/compressor', (req, res) => {
    const limit = parseInt(req.query.limit as string) || 8640;
    res.json(dataService.getRecentCompressor(limit));
  });

  // Ventilator
  router.get('/ventilator', (req, res) => {
    const limit = parseInt(req.query.limit as string) || 8640;
    res.json(dataService.getRecentVentilator(limit));
  });

  // Defroster
  router.get('/defroster', (req, res) => {
    const limit = parseInt(req.query.limit as string) || 8640;
    res.json(dataService.getRecentDefroster(limit));
  });

  return router;
}
