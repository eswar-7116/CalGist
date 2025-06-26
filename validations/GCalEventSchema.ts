import { z } from "zod";

export const GCalEventSchema = z.object({
  summary: z.string().optional(),
  description: z.string().optional(),
  start: z.object({
    dateTime: z.string().optional(),
    date: z.string().optional(),
  }),
  end: z.object({
    dateTime: z.string().optional(),
    date: z.string().optional(),
  }),
  location: z.string().optional(),
  organizer: z
    .object({
      displayName: z.string().optional(),
      email: z.string().optional(),
    })
    .optional(),
  attendees: z
    .array(
      z.object({
        displayName: z.string().optional(),
        email: z.string().optional(),
      })
    )
    .optional(),
});

export type GCalEvent = z.infer<typeof GCalEventSchema>;
