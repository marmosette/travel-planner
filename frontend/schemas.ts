import { z } from "zod";

export const PlanRequestSchema = z.object({
  budget: z.number().positive(),
  country: z.string().min(2),
  startDate: z.string(),
  endDate: z.string(),
  
})
.refine(
    (data) => new Date(data.endDate) >= new Date(data.startDate),
    { message: "Дата окончания раньше даты начала", path: ["endDate"] }
  );

export const ItinerarySchema = z.object({
  cities: z.array(z.object({
    name: z.string(),
    days: z.number().int(),
  })),
  days: z.array(z.object({
    day: z.number().int(),
    city: z.string(),
    title: z.string(),
    activities: z.array(z.object({
      name: z.string(),
      type: z.enum(["sightseeing", "food", "transport", "activity"]),
      estimatedCost: z.number(),
    })),
  })),
  budgetBreakdown: z.object({
    accommodation: z.number(),
    food: z.number(),
    activities: z.number(),
    transport: z.number(),
  }),
});

export type PlanRequest = z.infer<typeof PlanRequestSchema>;
export type Itinerary = z.infer<typeof ItinerarySchema>;