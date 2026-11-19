import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { PlanRequestSchema } from '../schemas.js';

@Controller('plan')
export class PlanController {
  @Post()
  create(@Body() body: unknown) {
    const parsed = PlanRequestSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.issues);
    }

    
    const { startDate, endDate, budget, country } = parsed.data;

  // считаем количество дней
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  // +1, потому что "с 1 по 5 июня" — это 5 дней, а не 4

 
    return {
      cities: [{ name: "Париж", days }],
      days: Array.from({ length: days }, (_, i) => ({
        day: i + 1,
        city: "Париж",
        title: `День ${i + 1}`,
        activities: [{ name: "Прогулка", type: "sightseeing", estimatedCost: 0 }],
      })),
      budgetBreakdown: {
        accommodation: budget * 0.4,
        food: budget * 0.3,
        activities: budget * 0.2,
        transport: budget * 0.1,
      },
    };
  }
}